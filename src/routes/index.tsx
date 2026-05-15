import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Telescope, Send } from "lucide-react";
import { planets } from "@/data/planets";
import { PlanetOrb } from "@/components/PlanetOrb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Liskeght Planet — Interactive Space Panel" },
      { name: "description", content: "Изучай Солнечную систему через современный интерактивный интерфейс в стиле NASA." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="space-y-24">
      {/* HERO */}
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="animate-fade-up space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" /> Mission Control · v1.0
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[0.95] sm:text-7xl">
            <span className="gradient-text glow-text">Liskeght</span>
            <br />
            <span className="text-foreground/90">Planet</span>
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary/80">Interactive Space Panel</p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Современный научно-развлекательный центр, где можно исследовать планеты
            Солнечной системы, разбираться в космических фактах и открывать удивительный
            мир науки — в стиле NASA и futuristic-интерфейсов.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/planets"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:scale-105 animate-pulse-glow"
            >
              Explore Universe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/dogs"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm uppercase tracking-widest hover:bg-white/5 transition"
            >
              <Telescope className="h-4 w-4" /> Dogs Science
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4">
            {[
              { k: "Planets", v: "8" },
              { k: "Facts", v: "40+" },
              { k: "Sectors", v: "2" },
            ].map((s) => (
              <div key={s.k} className="glass rounded-xl px-4 py-3">
                <div className="font-display text-2xl font-semibold gradient-text">{s.v}</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PLANET PANEL */}
        <div className="relative">
          <div className="glass-strong rounded-3xl p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Solar System</div>
                <div className="font-display text-lg">Planet Index</div>
              </div>
              <span className="font-mono text-[10px] text-primary/80">// LIVE</span>
            </div>
            <ul className="space-y-2">
              {planets.map((p, i) => (
                <li key={p.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-fade-up">
                  <Link
                    to="/planets"
                    hash={p.id}
                    className="group flex items-center gap-4 rounded-xl border border-transparent px-3 py-2.5 transition hover:border-primary/30 hover:bg-white/5"
                  >
                    <PlanetOrb planet={p} size={40} />
                    <div className="flex-1">
                      <div className="font-display text-sm">{p.ru}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.name}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Decorative orbit ring */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-50 blur-2xl"
               style={{ background: "radial-gradient(circle at 70% 30%, oklch(0.6 0.25 280/.5), transparent 60%)" }} />
        </div>
      </section>

      {/* TELEGRAM */}
      <section className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">// Transmission</div>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Есть идея? <span className="gradient-text">Напиши в Telegram.</span></h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Поделись предложением, фидбеком или вопросом — и стань частью миссии Liskeght.</p>
          </div>
          <a
            href="https://t.me/liskeght"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-4 text-sm font-medium uppercase tracking-widest text-primary-foreground transition hover:scale-105 animate-pulse-glow"
          >
            <Send className="h-4 w-4" /> Send Suggestion
          </a>
        </div>
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
             style={{ background: "radial-gradient(circle, oklch(0.6 0.25 230), transparent 70%)" }} />
      </section>
    </div>
  );
}
