import { useState, useMemo, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, Loader2, CheckCircle2, X, Sparkles } from "lucide-react";
import { sendSuggestion } from "@/lib/suggestion.functions";
import { toast } from "sonner";

function rand() {
  return Math.floor(Math.random() * 9) + 1;
}

export function SuggestionDialog({ trigger }: { trigger: (open: () => void) => ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const send = useServerFn(sendSuggestion);

  const captcha = useMemo(() => ({ a: rand(), b: rand() }), [open, done]);

  const reset = () => {
    setName(""); setContact(""); setMessage(""); setAnswer(""); setErrors({}); setDone(false);
  };

  const close = () => { setOpen(false); setTimeout(reset, 250); };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Введите имя";
    if (message.trim().length < 5) errs.message = "Минимум 5 символов";
    const ans = Number(answer);
    if (!Number.isFinite(ans)) errs.captcha = "Решите пример";
    else if (ans !== captcha.a + captcha.b) errs.captcha = "Неверный ответ";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      const res = await send({
        data: {
          name: name.trim(),
          contact: contact.trim(),
          message: message.trim(),
          captchaA: captcha.a,
          captchaB: captcha.b,
          captchaAnswer: ans,
        },
      });
      if (res.ok) {
        setDone(true);
        toast.success("Заявка отправлена!");
      } else {
        toast.error(res.error ?? "Ошибка отправки");
        setErrors({ captcha: res.error ?? "" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Сетевая ошибка. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {trigger(() => setOpen(true))}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={() => !submitting && close()}
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl glass-strong">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.65 0.22 280), transparent 70%)" }}
            />
            <div
              className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.6 0.25 230), transparent 70%)" }}
            />

            <button
              onClick={close}
              disabled={submitting}
              className="absolute right-4 top-4 z-20 rounded-full p-2 text-muted-foreground transition hover:bg-white/10 hover:text-foreground disabled:opacity-50"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative z-10 p-7 sm:p-9">
              {done ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent animate-pulse-glow">
                    <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl">Передача завершена</h3>
                  <p className="max-w-xs text-sm text-muted-foreground">
                    Сигнал получен. Спасибо за вклад в миссию Liskeght Planet.
                  </p>
                  <button
                    onClick={close}
                    className="mt-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-primary-foreground transition hover:scale-105"
                  >
                    Закрыть
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80 inline-flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" /> // Transmission Channel
                    </div>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl">
                      Отправить <span className="gradient-text">сигнал</span>
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Заполните форму — заявка уйдёт напрямую в командный центр.
                    </p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-4">
                    <Field label="Имя" error={errors.name}>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={80}
                        placeholder="Как вас зовут?"
                        className="field"
                      />
                    </Field>

                    <Field label="Контакт (необязательно)">
                      <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        maxLength={120}
                        placeholder="Telegram, e-mail или телефон"
                        className="field"
                      />
                    </Field>

                    <Field label="Сообщение" error={errors.message}>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={2000}
                        rows={4}
                        placeholder="Идея, предложение, вопрос..."
                        className="field resize-none"
                      />
                    </Field>

                    <Field label="Проверка: сколько будет?" error={errors.captcha}>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm">
                          {captcha.a} <span className="text-primary">+</span> {captcha.b} ={" "}
                          <span className="text-muted-foreground">?</span>
                        </div>
                        <input
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value.replace(/[^0-9-]/g, ""))}
                          inputMode="numeric"
                          maxLength={3}
                          placeholder="="
                          className="field w-24 text-center font-mono"
                        />
                      </div>
                    </Field>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-primary-foreground transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 animate-pulse-glow"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Передача...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Отправить заявку
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
      {children}
      {error && <div className="mt-1 text-[11px] text-destructive">{error}</div>}
    </label>
  );
}
