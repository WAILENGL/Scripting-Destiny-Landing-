/**
 * Client for the paid-reports funnel (server/orders, server/payments/stripe.ts).
 * The intakeId is the customer's access token: keep it in sessionStorage, never in a shareable URL.
 */

export type PaidTier = 'standard' | 'premium' | 'consult';

export interface ReportDetails {
  name: string;
  gender: 'M' | 'F';
  birthDate: string;
  birthTime?: string;
  unknownBirthTime?: boolean;
  longitude: number;
  timezone: string;
  city: string;
  lifeContext?: string;
  language?: 'en' | 'zh';
}

export interface Prices {
  currency: string;
  standard: number; // cents
  premium: number; // cents
  consult: number; // cents
}

export interface Discount {
  percent: number;
  code: string;
  expiresAt: string;
  redeemed: boolean;
}

export type OrderStatus = 'paid' | 'generating' | 'ready' | 'failed' | 'refunded';

export class OrderError extends Error {
  constructor(message: string, public status: number, public code?: string) {
    super(message);
  }
}

export const TIER_INFO: Record<PaidTier, { name: string; summary: string; sections: string[] }> = {
  standard: {
    name: 'Standard Reading',
    summary: 'An in-depth, AI-written reading of your core chart.',
    sections: ['Elemental dynamics & structure', 'Character & behaviour patterns', 'Your decades & the arc of fortune']
  },
  premium: {
    name: 'Full Reading',
    summary: 'Everything in Standard, plus timing and practical guidance.',
    sections: [
      'Everything in the Standard Reading',
      'Pillar by pillar: childhood, now & next',
      'The next three years',
      'Career, wealth, relationships & health',
      'Strategic directives'
    ]
  },
  consult: {
    name: '7-Day Email Consultation',
    summary: 'Everything in the Full Reading PDF, plus 7 business days of direct 1-on-1 email guidance on your chart.',
    sections: [
      'Full Reading PDF delivered immediately upon purchase',
      '7 business days of private 1-on-1 email Q&A on your chart with Scripting Destiny\'s Lead Analyst, Blake Leung (Mon–Fri; weekends excluded)',
      'Personally audited review & bespoke analysis by Blake Leung within 10 business days (often faster; up to 3–4 weeks in peak seasons)',
      'Your active 7-business-day consultation window begins ONLY after opening analysis is delivered',
      'Focused on your personal natal chart, timing & decisions'
    ]
  }
};

const INTAKE_KEY = 'sd_intake_id';

export function rememberIntake(intakeId: string) {
  try {
    sessionStorage.setItem(INTAKE_KEY, intakeId);
  } catch {
    /* storage unavailable: the id stays in component state */
  }
}

export function recallIntake(): string | null {
  try {
    return sessionStorage.getItem(INTAKE_KEY);
  } catch {
    return null;
  }
}

// A purchase in progress: survives a refresh or closing the modal, so the customer can always get back to their reading
const CHECKOUT_KEY = 'sd_checkout';
export interface PendingCheckout {
  intakeId: string;
  tier: PaidTier | null;
  /** Set once Stripe has sent the customer back with checkout=success */
  returned: boolean;
}
export function rememberCheckout(c: PendingCheckout) {
  try {
    sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(c));
  } catch {
    /* storage unavailable */
  }
}
export function recallCheckout(): PendingCheckout | null {
  try {
    const c = JSON.parse(sessionStorage.getItem(CHECKOUT_KEY) || 'null');
    if (c && typeof c.intakeId === 'string' && c.intakeId) {
      return {
        intakeId: c.intakeId,
        tier: c.tier === 'standard' || c.tier === 'premium' || c.tier === 'consult' ? c.tier : null,
        returned: c.returned === true
      };
    }
  } catch {
    /* malformed: ignore */
  }
  return null;
}
export function clearCheckout() {
  try {
    sessionStorage.removeItem(CHECKOUT_KEY);
  } catch {
    /* storage unavailable */
  }
}

// The one-time discount, kept per intake so it is still shown after a Stripe cancel or a page reload
const discountKey = (intakeId: string) => `sd_discount:${intakeId}`;
export function rememberDiscount(intakeId: string, d: Discount) {
  try {
    sessionStorage.setItem(discountKey(intakeId), JSON.stringify(d));
  } catch {
    /* storage unavailable */
  }
}
export function recallDiscount(intakeId: string): Discount | null {
  try {
    const d = JSON.parse(sessionStorage.getItem(discountKey(intakeId)) || 'null');
    if (d && typeof d.code === 'string' && typeof d.percent === 'number' && typeof d.expiresAt === 'string') return d;
  } catch {
    /* malformed: ignore */
  }
  return null;
}

async function readError(res: Response, fallback: string): Promise<OrderError> {
  let message = fallback;
  let code: string | undefined;
  try {
    const data = await res.json();
    if (data?.error) message = data.error;
    if (typeof data?.code === 'string') code = data.code;
  } catch {
    /* non-JSON body */
  }
  return new OrderError(message, res.status, code);
}

let pricesPromise: Promise<Prices | null> | null = null;
/** Prices come only from the server. On failure the UI shows no price rather than a wrong one, and the next call retries. */
export function getPrices(): Promise<Prices | null> {
  pricesPromise ??= fetch('https://app.scriptingdestiny.com/api/orders/prices')
    .then(async (r) => {
      const d = r.ok ? await r.json() : null;
      if (typeof d?.standard === 'number' && typeof d?.premium === 'number' && typeof d?.currency === 'string') {
        return {
          currency: d.currency,
          standard: d.standard,
          premium: d.premium,
          consult: typeof d?.consult === 'number' ? d.consult : 5999
        };
      }
      throw new Error('prices unavailable');
    })
    .catch(() => {
      pricesPromise = null;
      return null;
    });
  return pricesPromise;
}

export interface OrdersConfig {
  /** null: no captcha configured, render no widget */
  turnstileSiteKey: string | null;
  /** false until Stripe, its webhook secret and the public URL are all set: don't offer to buy */
  checkoutEnabled: boolean;
}
let configPromise: Promise<OrdersConfig> | null = null;
/** Public funnel config. */
export function getOrdersConfig(): Promise<OrdersConfig> {
  configPromise ??= fetch('https://app.scriptingdestiny.com/api/orders/config')
    .then(async (r) => {
      if (!r.ok) throw new Error('config unavailable');
      const d = await r.json();
      return {
        turnstileSiteKey: typeof d?.turnstileSiteKey === 'string' && d.turnstileSiteKey ? d.turnstileSiteKey : null,
        // Older servers don't send it: assume enabled (checkout then answers 503 "coming soon" if not)
        checkoutEnabled: d?.checkoutEnabled !== false
      };
    })
    .catch(() => {
      // Retry next time; meanwhile assume no captcha (the server rejects with captcha_failed if one is required)
      configPromise = null;
      return { turnstileSiteKey: null, checkoutEnabled: true };
    });
  return configPromise;
}

export function formatMoney(cents: number, currency: string): string {
  const code = (currency || 'USD').toUpperCase();
  try {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      currencyDisplay: 'symbol'
    }).format(cents / 100);
    return `${formatted} ${code}`;
  } catch {
    return `$${(cents / 100).toFixed(2)} ${code}`;
  }
}

/** Display only: the server applies the discount to the real charge. */
export function discountedCents(cents: number, percent: number): number {
  return Math.round((cents * (100 - percent)) / 100);
}

export async function requestFreeReport(
  details: ReportDetails,
  email: string,
  marketingConsent: boolean,
  turnstileToken?: string | null
): Promise<{ intakeId: string; downloadUrl: string; emailed: boolean }> {
  const res = await fetch('https://app.scriptingdestiny.com/api/orders/free', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...details,
      birthTime: details.unknownBirthTime ? undefined : details.birthTime,
      unknownBirthTime: Boolean(details.unknownBirthTime),
      email: email.trim(),
      marketingConsent,
      ...(turnstileToken ? { turnstileToken } : {})
    })
  });
  if (!res.ok) throw await readError(res, 'Your free report could not be created. Please try again.');
  const data = await res.json();
  rememberIntake(data.intakeId);
  return data;
}

export async function declineOffer(intakeId: string): Promise<Discount> {
  const res = await fetch(`https://app.scriptingdestiny.com/api/orders/${encodeURIComponent(intakeId)}/decline-offer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}'
  });
  if (!res.ok) throw await readError(res, 'The offer could not be loaded. Please try again.');
  return res.json();
}

export async function startCheckout(
  intakeId: string,
  tier: PaidTier,
  discountCode?: string,
  opts?: { returnTo?: 'app' | 'shop'; language?: 'en' | 'zh' }
): Promise<string> {
  let res: Response;
  try {
    res = await fetch(`https://app.scriptingdestiny.com/api/orders/${encodeURIComponent(intakeId)}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tier,
        ...(discountCode ? { discountCode } : {}),
        ...(opts?.returnTo ? { returnTo: opts.returnTo } : {}),
        ...(opts?.language ? { language: opts.language } : {})
      })
    });
  } catch (err: any) {
    throw new OrderError(
      'Unable to connect to the checkout server. Please make sure the local server is running, or check your internet connection.',
      0
    );
  }
  if (res.status === 503) throw new OrderError('Checkout is coming soon. Your free report is still yours to keep.', 503);
  if (res.status === 502) throw new OrderError('The payment page could not be opened just now. Please try again in a moment.', 502);
  if (!res.ok) throw await readError(res, 'The payment page could not be opened. Please try again.');
  const data = await res.json();
  if (!data?.url) throw new OrderError('The payment page could not be opened. Please try again.', 502);
  rememberCheckout({ intakeId, tier, returned: false });
  return data.url;
}

export async function startDirectCheckout(
  details: ReportDetails,
  email: string,
  marketingConsent: boolean,
  tier: PaidTier,
  opts?: { discountCode?: string; returnTo?: 'app' | 'shop' }
): Promise<{ url: string; intakeId: string }> {
  let res: Response;
  try {
    res = await fetch('https://app.scriptingdestiny.com/api/orders/direct-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...details,
        birthTime: details.unknownBirthTime ? undefined : details.birthTime,
        unknownBirthTime: Boolean(details.unknownBirthTime),
        email: email.trim(),
        marketingConsent,
        tier,
        ...(opts?.discountCode ? { discountCode: opts.discountCode } : {}),
        returnTo: opts?.returnTo ?? 'shop'
      })
    });
  } catch (err: any) {
    throw new OrderError(
      'Unable to connect to the checkout server. Please make sure the local server is running, or check your internet connection.',
      0
    );
  }
  if (res.status === 503) throw new OrderError('Checkout is coming soon. Please check back shortly.', 503);
  if (res.status === 502) throw new OrderError('The payment page could not be opened just now. Please try again in a moment.', 502);
  if (!res.ok) throw await readError(res, 'The payment page could not be opened. Please try again.');
  const data = await res.json();
  if (!data?.url || !data?.intakeId) throw new OrderError('The payment page could not be opened. Please try again.', 502);
  rememberIntake(data.intakeId);
  rememberCheckout({ intakeId: data.intakeId, tier, returned: false });
  return { url: data.url, intakeId: data.intakeId };
}

export interface OrderInfo {
  tier: PaidTier;
  status: OrderStatus;
  createdAt?: string;
  /** True once the paid reading was emailed */
  emailSent?: boolean;
}

export interface IntakeDetails {
  intakeId: string;
  email: string;
  input: ReportDetails;
  orders: OrderInfo[];
  ownedTiers: PaidTier[];
  discount: Discount | null;
}

/** Loads a returning customer's stored birth details via their unguessable intakeId token. */
export async function getIntakeDetails(intakeId: string): Promise<IntakeDetails | null> {
  const res = await fetch(`https://app.scriptingdestiny.com/api/orders/${encodeURIComponent(intakeId)}/details`);
  if (res.status === 404) return null;
  if (!res.ok) throw await readError(res, 'Could not load your saved chart details.');
  const data = await res.json();
  if (!data?.intakeId || !data?.input) return null;
  return {
    intakeId: data.intakeId,
    email: String(data.email || ''),
    input: data.input,
    orders: Array.isArray(data.orders) ? data.orders : [],
    ownedTiers: Array.isArray(data.ownedTiers)
      ? data.ownedTiers.filter((t: unknown): t is PaidTier => t === 'standard' || t === 'premium' || t === 'consult')
      : [],
    discount: data.discount && typeof data.discount.code === 'string' ? data.discount : null
  };
}

/**
 * Reads ?intake=<32-hex> from an email magic link (when not returning from Stripe checkout),
 * saves it to sessionStorage, and strips it from the URL so the token isn't left in history.
 */
export function consumeShopIntakeParam(): string | null {
  if (typeof window === 'undefined') return null;
  const url = new URL(window.location.href);
  if (url.searchParams.has('checkout')) return null;
  const intakeId = url.searchParams.get('intake');
  if (!intakeId || !/^[0-9a-f]{32}$/i.test(intakeId)) return null;
  rememberIntake(intakeId);
  url.searchParams.delete('intake');
  window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  return intakeId;
}

/** Orders on an intake plus the tiers already bought (not refunded), which can't be bought again. */
export async function getOrderSummary(intakeId: string): Promise<{ orders: OrderInfo[]; ownedTiers: PaidTier[] }> {
  const res = await fetch(`https://app.scriptingdestiny.com/api/orders/${encodeURIComponent(intakeId)}/status`);
  if (!res.ok) throw await readError(res, 'Could not check your order.');
  const data = await res.json();
  const orders: OrderInfo[] = Array.isArray(data?.orders) ? data.orders : [];
  const ownedTiers: PaidTier[] = Array.isArray(data?.ownedTiers)
    ? data.ownedTiers.filter((t: unknown): t is PaidTier => t === 'standard' || t === 'premium' || t === 'consult')
    : [];
  return { orders, ownedTiers };
}

export async function getOrderStatus(intakeId: string): Promise<OrderInfo[]> {
  return (await getOrderSummary(intakeId)).orders;
}

export const freePdfUrl = (intakeId: string) => `https://app.scriptingdestiny.com/api/orders/${encodeURIComponent(intakeId)}/free.pdf`;
export const paidPdfUrl = (intakeId: string, tier?: PaidTier) =>
  `https://app.scriptingdestiny.com/api/orders/${encodeURIComponent(intakeId)}/report.pdf${tier ? `?tier=${tier}` : ''}`;

/**
 * Reads ?checkout=success|cancelled&intake=<id> left by Stripe's redirect, keeps the id in sessionStorage,
 * and strips both params from the address bar so the token isn't left in history or shared links.
 */
export type CheckoutOutcome = 'success' | 'cancelled' | 'resume';

/**
 * What to show on load: Stripe's return (success/cancelled), or 'resume' when the customer left for Stripe and came
 * back some other way (Back button, reopened tab) so we don't know yet whether they paid.
 */
export function consumeCheckoutReturn(): { outcome: CheckoutOutcome; intakeId: string } | null {
  if (typeof window === 'undefined') return null;
  const url = new URL(window.location.href);
  const outcome = url.searchParams.get('checkout');
  const intakeId = url.searchParams.get('intake');
  if ((outcome !== 'success' && outcome !== 'cancelled') || !intakeId) {
    // No Stripe params: reopen a paid purchase the customer hasn't collected yet (page refreshed, modal closed)
    const pending = recallCheckout();
    if (!pending) return null;
    return { outcome: pending.returned ? 'success' : 'resume', intakeId: pending.intakeId };
  }
  rememberIntake(intakeId);
  if (outcome === 'success') {
    const prev = recallCheckout();
    rememberCheckout({ intakeId, tier: prev?.intakeId === intakeId ? prev.tier : null, returned: true });
  } else clearCheckout();
  url.searchParams.delete('checkout');
  url.searchParams.delete('intake');
  window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  return { outcome, intakeId };
}
