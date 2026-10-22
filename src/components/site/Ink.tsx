import { useEffect, useRef, type ReactNode } from "react";

/** Fades/slides children in when scrolled into view. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.dataset["shown"] = "true";
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** Clean straight divider that draws itself on scroll. */
export function InkStroke({ className = "" }: { className?: string }) {
  return (
    <Reveal className={className}>
      <svg viewBox="0 0 600 2" preserveAspectRatio="none" className="ink-stroke h-px w-full text-border" aria-hidden>
        <path
          d="M0 1 L 600 1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          pathLength={1}
        />
      </svg>
    </Reveal>
  );
}

/** Gold seal stamp mark. */
export function Seal({ char = "命", className = "" }: { char?: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`seal inline-grid h-9 w-9 place-items-center rounded-[4px] bg-accent font-serif text-lg leading-none text-accent-foreground ${className}`}
    >
      {char}
    </span>
  );
}
