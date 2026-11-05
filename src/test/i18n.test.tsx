import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  getInitialLanguage,
  applyLanguage,
  translations,
  STEM_TRANSLATIONS,
  getStemTranslation,
} from "@/lib/i18n";

describe("i18n system", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "en";
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.lang = "en";
  });

  it("defaults to en when no stored language exists", () => {
    expect(getInitialLanguage()).toBe("en");
  });

  it("reads stored preference when available", () => {
    localStorage.setItem("sd-lang", "zh");
    expect(getInitialLanguage()).toBe("zh");

    localStorage.setItem("sd-lang", "en");
    expect(getInitialLanguage()).toBe("en");
  });

  it("applies zh language and sets html lang attribute", () => {
    applyLanguage("zh");
    expect(document.documentElement.lang).toBe("zh-CN");
    expect(localStorage.getItem("sd-lang")).toBe("zh");
  });

  it("applies en language and sets html lang attribute", () => {
    applyLanguage("en");
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("sd-lang")).toBe("en");
  });

  it("provides complete translations for all 10 Heavenly Stems in STEM_TRANSLATIONS", () => {
    for (let i = 0; i < 10; i++) {
      const enStem = STEM_TRANSLATIONS.en[i];
      const zhStem = STEM_TRANSLATIONS.zh[i];

      expect(enStem).toBeDefined();
      expect(enStem.title).toBeTruthy();
      expect(enStem.archetype).toBeTruthy();
      expect(enStem.description).toBeTruthy();

      expect(zhStem).toBeDefined();
      expect(zhStem.title).toBeTruthy();
      expect(zhStem.archetype).toBeTruthy();
      expect(zhStem.description).toBeTruthy();
    }
  });

  it("getStemTranslation returns correct language overrides", () => {
    const zhTranslation = getStemTranslation(0, "zh");
    expect(zhTranslation.title).toBe("开拓领袖");
    expect(zhTranslation.archetype).toBe("参天栋梁");

    const enTranslation = getStemTranslation(0, "en");
    expect(enTranslation.title).toBe("The Pioneer");
    expect(enTranslation.archetype).toBe("The Visionary Oak");
  });

  it("both en and zh translations have corresponding top-level sections", () => {
    const keys = Object.keys(translations.en) as (keyof typeof translations.en)[];
    for (const key of keys) {
      expect(translations.zh[key]).toBeDefined();
    }
  });
});
