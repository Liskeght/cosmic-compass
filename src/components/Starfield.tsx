export function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-stars opacity-60" style={{ animation: "drift 200s linear infinite" }} />
      <div className="absolute inset-0 bg-stars opacity-30" style={{ animation: "drift 400s linear infinite", backgroundSize: "900px 600px" }} />
      {/* Nebula blobs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
           style={{ background: "radial-gradient(circle, oklch(0.55 0.25 280), transparent 70%)" }} />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl"
           style={{ background: "radial-gradient(circle, oklch(0.6 0.22 220), transparent 70%)" }} />
      <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
           style={{ background: "radial-gradient(circle, oklch(0.5 0.24 320), transparent 70%)" }} />
      {/* Twinkles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-full bg-white animate-twinkle"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}
