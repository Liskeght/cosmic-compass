import { createFileRoute } from "@tanstack/react-router";
import { Send, Rocket, Globe2, Cpu } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Liskeght Planet" },
      { name: "description", content: "О проекте Liskeght Planet — интерактивном космическом центре." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">// About mission</div>
        <h1 className="font-display text-4xl sm:text-5xl">О <span className="gradient-text">проекте</span></h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Liskeght Planet — это интерактивная панель, объединяющая науку и эстетику sci-fi-интерфейсов.
          Здесь можно изучать космос и узнавать факты о мире вокруг.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Rocket, title: "Mission", text: "Делать науку красивой и доступной." },
          { icon: Globe2, title: "Scope", text: "Планеты, природа, жизнь — всё в одном центре." },
          { icon: Cpu, title: "Tech", text: "Современный веб-стек, glassmorphism, плавные анимации." },
        ].map((c) => (
          <div key={c.title} className="glass rounded-2xl p-6">
            <c.icon className="mb-3 h-5 w-5 text-primary" />
            <div className="font-display text-lg">{c.title}</div>
            <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
          </div>
        ))}
      </section>

      <section className="glass-strong rounded-3xl p-8 sm:p-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl">Связаться с автором</h2>
            <p className="mt-2 text-sm text-muted-foreground">Author: Liskeght · Telegram для идей и предложений.</p>
          </div>
          <a href="https://t.me/liskeght" target="_blank" rel="noopener"
             className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm uppercase tracking-widest text-primary-foreground hover:scale-105 transition animate-pulse-glow">
            <Send className="h-4 w-4" /> Send Suggestion
          </a>
        </div>
      </section>
    </div>
  );
}
