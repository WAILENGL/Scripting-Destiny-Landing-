import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = true }: ThemeToggleProps) {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light cream mode" : "Switch to dark inkstone mode"}
      title={isDark ? "Switch to light cream mode" : "Switch to dark inkstone mode"}
      className={`group relative inline-flex h-9 items-center gap-2 rounded-full border border-border bg-card/75 px-2.5 sm:px-3 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 cursor-pointer ${className}`}
    >
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        {isDark ? (
          <Sun className="h-4 w-4 text-accent transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </span>
      {showLabel && (
        <span className="hidden sm:inline font-sans font-medium tracking-wide">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
