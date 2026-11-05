import { Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface LanguageToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function LanguageToggle({ className = "", showLabel = true }: LanguageToggleProps) {
  const { isZh, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={isZh ? "Switch to English" : "切换至简体中文 (Switch to Simplified Chinese)"}
      title={isZh ? "Switch to English" : "切换至简体中文 (Switch to Simplified Chinese)"}
      className={`group relative inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card/75 px-3 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 cursor-pointer ${className}`}
    >
      <Languages className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:scale-110" />
      {showLabel && (
        <span className="font-sans font-medium tracking-wide">{isZh ? "English" : "中文"}</span>
      )}
    </button>
  );
}
