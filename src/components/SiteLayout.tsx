import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Starfield } from "./Starfield";
import { Send, Orbit } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/planets", label: "Planets" },
  { to: "/dogs", label: "Dogs Science" },
  { to: "/about", label: "About" },
];

export function SiteLayout() {
  const loc = useLocation();
  return (
    <div className="relative min-h-screen text-foreground">
      <Starfield />

      <header className="sticky top-0 z-40">
        <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between gap-4 rounded-2xl glass px-4 py-3 sm:px-6">
          <Link to="/" className="group flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent glow-ring">
              <Orbit className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="font-display text-sm font-semibold tracking-widest uppercase">
              Liskeght <span className="gradient-text">Planet</span>
            </span>
          </Link>
          <nav className="hidden gap-1 md:flex">
            {nav.map((n) => {
              const active = loc.pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-widest transition ${
                    active
                      ? "bg-primary/20 text-foreground glow-text"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <a
            href="https://t.me/liskeght"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-medium uppercase tracking-widest text-primary-foreground transition hover:scale-105 animate-pulse-glow"
          >
            <Send className="h-3.5 w-3.5" />
            Suggest
          </a>
        </div>
        <div className="mx-auto mt-2 max-w-7xl flex md:hidden gap-1 overflow-x-auto px-2 pb-1">
          {nav.map((n) => {
            const active = loc.pathname === n.to;
            return (
              <Link key={n.to} to={n.to}
                className={`whitespace-nowrap rounded-full px-3 py-1 text-[10px] uppercase tracking-widest ${
                  active ? "bg-primary/20 text-foreground" : "text-muted-foreground"
                }`}>{n.label}</Link>
            );
          })}
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <Outlet />
      </main>

      <footer className="relative z-10 mt-20">
        <div className="hairline mx-auto max-w-7xl" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
          <div className="font-mono uppercase tracking-widest">
            Author: <span className="text-foreground">Liskeght</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/planets" className="hover:text-foreground transition">Planets</Link>
            <Link to="/dogs" className="hover:text-foreground transition">Dogs</Link>
            <a href="https://t.me/liskeght" target="_blank" rel="noopener" className="hover:text-foreground transition">Telegram</a>
          </div>
          <div className="font-mono">© {new Date().getFullYear()} · Liskeght Planet</div>
        </div>
      </footer>
    </div>
  );
}
