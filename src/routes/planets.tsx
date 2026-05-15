import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { planets, type Planet } from "@/data/planets";
import { PlanetOrb } from "@/components/PlanetOrb";
import { Ruler, Thermometer, Sun, Sparkles } from "lucide-react";

export const Route = createFileRoute("/planets")({
  head: () => ({
    meta: [
      { title: "Planets — Liskeght Planet" },
      { name: "description", content: "Интерактивный гид по планетам Солнечной системы: размеры, температура, расстояние и факты." },
    ],
  }),
  component: PlanetsPage,
});

function PlanetsPage() {
  const [selected, setSelected] = useState<Planet>(planets[2]);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const found = planets.find((p) => p.id === hash);
    if (found) setSelected(found);
  }, []);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">// Sector 01</div>
        <h1 className="font-display text-4xl sm:text-5xl">Планеты <span className="gradient-text">Солнечной системы</span></h1>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Выбирай планету — и панель откроет научную карточку с ключевыми параметрами и интересным фактом.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Vertical/horizontal panel */}
        <aside className="glass rounded-2xl p-3">
          <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
            {planets.map((p) => {
              const active = selected.id === p.id;
              return (
                <li key={p.id} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => setSelected(p)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                      active ? "bg-gradient-to-r from-primary/20 to-accent/10 border border-primary/40" : "border border-transparent hover:bg-white/5"
                    }`}
                  >
                    <PlanetOrb planet={p} size={42} active={active} />
                    <div className="hidden lg:block">
                      <div className={`font-display text-sm ${active ? "text-foreground glow-text" : ""}`}>{p.ru}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{p.name}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Card */}
        <article key={selected.id} className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10 animate-fade-up">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
               style={{ background: selected.gradient }} />
          <div className="relative grid gap-8 sm:grid-cols-[auto_1fr] sm:items-center">
            <div className="flex justify-center">
              <div className="animate-float-slow">
                <PlanetOrb planet={selected} size={180} active />
              </div>
            </div>
            <div className="space-y-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">// {selected.name}</div>
              <h2 className="font-display text-4xl sm:text-5xl gradient-text">{selected.ru}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{selected.description}</p>
            </div>
          </div>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: Ruler, k: "Диаметр", v: selected.diameter },
              { icon: Thermometer, k: "Температура", v: selected.temperature },
              { icon: Sun, k: "От Солнца", v: selected.distance },
            ].map((s) => (
              <div key={s.k} className="glass rounded-xl p-4">
                <div className="mb-2 flex items-center gap-2 text-primary"><s.icon className="h-4 w-4" /></div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.k}</div>
                <div className="font-display text-lg">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="relative mt-4 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary/80">Fun fact</div>
              <div className="text-sm">{selected.fact}</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
