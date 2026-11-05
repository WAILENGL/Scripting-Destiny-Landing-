import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { applyTheme, getInitialTheme } from "@/hooks/useTheme";

describe("Theme system", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("defaults to dark theme when no storage preference exists", () => {
    expect(getInitialTheme()).toBe("dark");
  });

  it("reads stored preference when available", () => {
    localStorage.setItem("sd-theme", "light");
    expect(getInitialTheme()).toBe("light");

    localStorage.setItem("sd-theme", "dark");
    expect(getInitialTheme()).toBe("dark");
  });

  it("applies dark class and colorScheme to documentElement", () => {
    applyTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(localStorage.getItem("sd-theme")).toBe("dark");
  });

  it("applies light class and colorScheme to documentElement", () => {
    applyTheme("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(localStorage.getItem("sd-theme")).toBe("light");
  });

  it("switches back and forth correctly", () => {
    applyTheme("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    applyTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });
});
