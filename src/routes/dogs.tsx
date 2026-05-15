import { createFileRoute } from "@tanstack/react-router";
import { Dna, Brain, Ear, HeartHandshake, PawPrint, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dogs")({
  head: () => ({
    meta: [
      { title: "Dogs Science — Liskeght Planet" },
      { name: "description", content: "Научно-популярные факты о собаках: происхождение, интеллект, органы чувств и поведение." },
    ],
  }),
  component: DogsPage,
});

const topics = [
  { icon: Dna, title: "Происхождение", text: "Собаки — одомашненные потомки волков, рядом с людьми уже более 15 000 лет." },
  { icon: Brain, title: "Интеллект", text: "Собаки понимают до 250 слов и жестов — на уровне 2-летнего ребёнка." },
  { icon: Ear, title: "Органы чувств", text: "Их нюх в 10 000–100 000 раз чувствительнее человеческого — настоящий биосенсор." },
  { icon: HeartHandshake, title: "Поведение", text: "Собаки умеют считывать эмоции человека по лицу, голосу и даже запаху." },
  { icon: PawPrint, title: "Породы", text: "Существует более 340 пород — от чихуахуа до английского мастифа." },
  { icon: Sparkles, title: "Интересный факт", text: "Отпечаток носа у собаки уникален, как отпечаток пальца у человека." },
];

const breeds = [
  { name: "Хаски", trait: "Северный спринтер", c: "from-sky-300/30 to-blue-500/20" },
  { name: "Бордер-колли", trait: "Самая умная порода", c: "from-amber-300/30 to-orange-500/20" },
  { name: "Лабрадор", trait: "Идеальный компаньон", c: "from-yellow-300/30 to-amber-600/20" },
  { name: "Доберман", trait: "Сторожевая элита", c: "from-rose-300/30 to-red-700/20" },
];

export default function DogsPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-300/80">// Sector 02 · Bio Lab</div>
        <h1 className="font-display text-4xl sm:text-5xl">
          Dogs <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-400 bg-clip-text text-transparent">Science</span>
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Тёплый научно-популярный модуль о наших лучших друзьях — без потери космического стиля.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, i) => (
          <article
            key={t.title}
            style={{ animationDelay: `${i * 80}ms` }}
            className="group glass relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 hover:border-amber-300/40 animate-fade-up"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition group-hover:opacity-60"
                 style={{ background: "radial-gradient(circle, oklch(0.75 0.18 60), transparent 70%)" }} />
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300/20 to-rose-500/10 text-amber-200">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl">Мини-карточки пород</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">// breed.index</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {breeds.map((b) => (
            <div key={b.name} className={`glass group relative overflow-hidden rounded-2xl p-5 transition hover:-translate-y-1`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${b.c} opacity-0 transition group-hover:opacity-100`} />
              <div className="relative">
                <PawPrint className="mb-3 h-5 w-5 text-amber-200" />
                <div className="font-display text-lg">{b.name}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{b.trait}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
