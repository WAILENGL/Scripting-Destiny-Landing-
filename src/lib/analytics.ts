declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-PH70NM11Q5";

/**
 * Dispatches a custom GA4 event safely if gtag is loaded.
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Tracks lead generation (waitlist signup) matching GA4 standard lead conversion.
 */
export function trackLead(source: "calculator" | "landing_footer", withSubstack: boolean) {
  trackEvent("generate_lead", {
    event_category: "lead",
    event_label: source,
    method: "waitlist",
    with_substack: withSubstack,
  });
}

/**
 * Tracks when a visitor calculates their BaZi Day Master.
 */
export function trackChartCalculation(dayMasterHanzi?: string, element?: string) {
  trackEvent("calculate_bazi", {
    event_category: "engagement",
    day_master: dayMasterHanzi,
    element: element,
  });
}
