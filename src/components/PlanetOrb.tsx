import type { Planet } from "@/data/planets";

export function PlanetOrb({ planet, size = 56, active = false }: { planet: Planet; size?: number; active?: boolean }) {
  return (
    <span
      className="relative inline-block rounded-full transition-transform duration-500"
      style={{
        width: size,
        height: size,
        background: planet.gradient,
        boxShadow: active
          ? `inset -8px -10px 20px rgba(0,0,0,.55), 0 0 30px oklch(0.75 0.2 250 / .7), 0 0 60px oklch(0.65 0.22 280 / .5)`
          : `inset -6px -8px 16px rgba(0,0,0,.5), 0 0 14px rgba(120,160,255,.25)`,
      }}
    >
      {planet.ring && (
        <span
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: size * 1.7,
            height: size * 0.4,
            borderColor: "oklch(0.85 0.1 80 / .55)",
            transform: "translate(-50%,-50%) rotate(-20deg)",
            boxShadow: "0 0 18px oklch(0.85 0.15 70 / .35)",
          }}
        />
      )}
    </span>
  );
}
