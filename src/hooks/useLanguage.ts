import { useEffect, useState, useCallback } from "react";
import {
  type Language,
  getInitialLanguage,
  applyLanguage,
  translations,
  getStemTranslation,
} from "@/lib/i18n";

export function useLanguage() {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    // Initial sync
    const initial = getInitialLanguage();
    setLangState(initial);
    document.documentElement.lang = initial === "zh" ? "zh-CN" : "en";

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<Language>;
      if (customEvent.detail && (customEvent.detail === "en" || customEvent.detail === "zh")) {
        setLangState(customEvent.detail);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "sd-lang" && (e.newValue === "en" || e.newValue === "zh")) {
        setLangState(e.newValue);
        document.documentElement.lang = e.newValue === "zh" ? "zh-CN" : "en";
      }
    };

    window.addEventListener("sd-lang-change", handleLangChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("sd-lang-change", handleLangChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setLang = useCallback((nextLang: Language) => {
    setLangState(nextLang);
    applyLanguage(nextLang);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "zh" : "en";
      applyLanguage(next);
      return next;
    });
  }, []);

  return {
    lang,
    setLang,
    toggleLang,
    isZh: lang === "zh",
    t: translations[lang],
    getStem: (index: number) => getStemTranslation(index, lang),
  };
}
