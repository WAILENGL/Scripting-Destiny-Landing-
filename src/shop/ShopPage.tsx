import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Download,
  Edit3,
  FileText,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  X
} from 'lucide-react';
import { CORRECT_STEMS, DAY_MASTER_SUMMARIES, type Pillar } from './constants';
import {
  computeSolarOffsetMinutes,
  formatLongitude,
  isUnder18,
  loadOnboardingDraft,
  POPULAR_CITIES,
  type PopularCity
} from './onboarding';
import {
  TIER_INFO,
  discountedCents,
  formatMoney,
  getIntakeDetails,
  getOrdersConfig,
  getPrices,
  paidPdfUrl,
  recallDiscount,
  startCheckout,
  startDirectCheckout,
  type Discount,
  type IntakeDetails,
  type PaidTier,
  type Prices
} from './orders';
import { trackEvent } from '@/lib/analytics';

interface GeocodingResult {
  id?: number;
  name: string;
  admin1?: string;
  country?: string;
  longitude: number;
  timezone?: string;
}

interface CalcPreview {
  signature: string;
  trueSolarTime: string;
  solarOffsetMinutes?: number;
  unknownBirthTime: boolean;
  dayPillar: Pillar;
}

export interface ShopPageProps {
  initialIntakeId?: string | null;
  /** URL for the onboarding survey + free report flow on the main app. */
  surveyUrl: string;
  /** Optional SPA callback when running on the same origin (/shop -> /?onboarding=1). */
  onStartSurvey?: () => void;
}

const FEATURED_CITY_NAMES = new Set([
  'Singapore',
  'Beijing',
  'Hong Kong',
  'Tokyo',
  'London',
  'New York'
]);
const FEATURED_CITIES = POPULAR_CITIES.filter((c) => FEATURED_CITY_NAMES.has(c.name));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ORIGINAL_PRICES_CENTS: Record<PaidTier, number> = {
  standard: 1999, // $19.99
  premium: 4999,  // $49.99
  consult: 19900  // $199.00
};

const TIER_META: Record<PaidTier, { badge?: string; delivery: string; idealFor: string; shortLabel: string }> = {
  standard: {
    shortLabel: 'Standard',
    delivery: 'Instant download · Emailed within minutes (typically 2–5 mins)',
    idealFor: 'Best for understanding your core wiring, elemental balance, and 10-year luck cycles.'
  },
  premium: {
    badge: 'Most Popular · 70% Off',
    shortLabel: 'Full',
    delivery: 'Instant download · Emailed within minutes (typically 2–5 mins)',
    idealFor: 'Best for career pivots, relationship clarity, and 3-year strategic timing.'
  },
  consult: {
    badge: '1-on-1 Advisory · Save $139',
    shortLabel: '7-Day Consult',
    delivery: 'Full PDF within minutes · Personally audited review & bespoke analysis by Blake Leung within 10 business days (7 Business Days back-and-forth; Mon–Fri, weekends excluded)',
    idealFor: 'Best for major life decisions and direct, unhurried back-and-forth across any timezone.'
  }
};

function isValidBirthDate(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return false;
  const year = Number(date.slice(0, 4));
  return year >= 1900 && year <= 2100;
}

function formatTime12h(timeStr: string): string {
  const [h, m] = timeStr.split(':');
  const hh = parseInt(h, 10);
  if (Number.isNaN(hh) || m === undefined) return timeStr;
  return `${hh % 12 || 12}:${m.padStart(2, '0')} ${hh >= 12 ? 'PM' : 'AM'}`;
}

function formatOffsetLabel(offsetMinutes: number | undefined): string {
  if (offsetMinutes === undefined || !Number.isFinite(offsetMinutes)) return '';
  if (offsetMinutes === 0) return '0 min solar offset (aligned with local clock)';
  const sign = offsetMinutes > 0 ? '+' : '-';
  return `${sign}${Math.abs(offsetMinutes)} min solar offset from clock time`;
}

export function ShopPage({ initialIntakeId, surveyUrl, onStartSurvey }: ShopPageProps) {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [checkoutEnabled, setCheckoutEnabled] = useState(true);

  // Returning customer state (from email magic link ?intake=<id> or current session)
  const [loadingIntake, setLoadingIntake] = useState(Boolean(initialIntakeId));
  const [savedIntake, setSavedIntake] = useState<IntakeDetails | null>(null);
  const [editingDetails, setEditingDetails] = useState(false);
  const [discount, setDiscount] = useState<Discount | null>(() =>
    initialIntakeId ? recallDiscount(initialIntakeId) : null
  );

  // Pre-fill from local survey draft if the visitor already entered details in the onboarding flow
  const [initialDraft] = useState(() => loadOnboardingDraft());

  // Selected tier + form state
  const [selectedTier, setSelectedTier] = useState<PaidTier | null>(null);
  const [name, setName] = useState(() => initialDraft.name || '');
  const [gender, setGender] = useState<'M' | 'F'>(() => initialDraft.gender || 'M');
  const [birthDate, setBirthDate] = useState(() => initialDraft.birthDate || '');
  const [birthTime, setBirthTime] = useState(() => (initialDraft.birthTimeUnknown ? '' : initialDraft.birthTime || ''));
  const [unknownBirthTime, setUnknownBirthTime] = useState(() => Boolean(initialDraft.birthTimeUnknown));
  const [city, setCity] = useState(() => initialDraft.city || '');
  const [longitude, setLongitude] = useState<number | ''>(() => initialDraft.longitude);
  const [timezone, setTimezone] = useState(() => initialDraft.timezoneString || '');
  const [email, setEmail] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [lifeContext, setLifeContext] = useState('');
  const [reportLanguage, setReportLanguage] = useState<'en' | 'zh'>('en');

  // City search state
  const [cityQuery, setCityQuery] = useState(() => initialDraft.city || '');
  const [cityResults, setCityResults] = useState<GeocodingResult[]>([]);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [searchingCities, setSearchingCities] = useState(false);
  const [geocodedEmpty, setGeocodedEmpty] = useState(false);
  const cityContainerRef = useRef<HTMLDivElement>(null);

  // Live True Solar Time + Day Master preview
  const [preview, setPreview] = useState<CalcPreview | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // Checkout submission state
  const [busyTier, setBusyTier] = useState<PaidTier | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<'terms' | 'privacy' | 'refund' | 'disclaimer' | null>(null);
  const formSectionRef = useRef<HTMLElement>(null);

  // Load prices, config, and (if present) saved intake
  useEffect(() => {
    let alive = true;
    getPrices().then((p) => alive && setPrices(p));
    getOrdersConfig().then((c) => alive && setCheckoutEnabled(c.checkoutEnabled));

    if (initialIntakeId) {
      setLoadingIntake(true);
      getIntakeDetails(initialIntakeId)
        .then((details) => {
          if (!alive) return;
          if (details) {
            setSavedIntake(details);
            setName(details.input.name === 'Guest' ? '' : details.input.name || '');
            setGender(details.input.gender === 'F' ? 'F' : 'M');
            setBirthDate(details.input.birthDate || '');
            setUnknownBirthTime(Boolean(details.input.unknownBirthTime));
            setBirthTime(details.input.unknownBirthTime ? '' : details.input.birthTime || '');
            setCity(details.input.city || '');
            setCityQuery(details.input.city || '');
            setLongitude(
              typeof details.input.longitude === 'number' && Number.isFinite(details.input.longitude)
                ? details.input.longitude
                : ''
            );
            setTimezone(details.input.timezone || '');
            setEmail(details.email || '');
            setLifeContext(details.input.lifeContext || '');
            if (details.discount) setDiscount(details.discount);
            if (details.ownedTiers.includes('premium') && !details.ownedTiers.includes('consult')) {
              setSelectedTier('consult');
            } else if (details.ownedTiers.includes('standard') && !details.ownedTiers.includes('premium')) {
              setSelectedTier('premium');
            } else {
              setSelectedTier('premium');
            }
          }
        })
        .catch(() => {
          /* unknown or unavailable: fall back gracefully to fresh form */
        })
        .finally(() => alive && setLoadingIntake(false));
    }

    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) setBusyTier(null);
    };
    window.addEventListener('pageshow', onShow);
    return () => {
      alive = false;
      window.removeEventListener('pageshow', onShow);
    };
  }, [initialIntakeId]);

  // Close city dropdown on outside click
  useEffect(() => {
    const onPointerDown = (e: MouseEvent) => {
      if (cityContainerRef.current && !cityContainerRef.current.contains(e.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  // Debounced Open-Meteo city lookup
  useEffect(() => {
    const trimmed = cityQuery.trim();
    if (!trimmed || trimmed === city) {
      setCityResults([]);
      setGeocodedEmpty(false);
      setSearchingCities(false);
      return;
    }
    const controller = new AbortController();
    setSearchingCities(true);
    setGeocodedEmpty(false);
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=5&format=json`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (!controller.signal.aborted) {
          const next = Array.isArray(data?.results) ? data.results : [];
          setCityResults(next);
          setGeocodedEmpty(next.length === 0);
          setCityDropdownOpen(true);
        }
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          setCityResults([]);
          setGeocodedEmpty(false);
        }
      } finally {
        if (!controller.signal.aborted) setSearchingCities(false);
      }
    }, 350);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [cityQuery, city]);

  const offlineCityMatches = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) return POPULAR_CITIES.slice(0, 6);
    return POPULAR_CITIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.label.toLowerCase().includes(q)
    );
  }, [cityQuery]);

  // Live True Solar Time + Day Master calculation
  const effectiveBirthTime = unknownBirthTime ? '12:00' : birthTime;
  const canCalculate = Boolean(
    isValidBirthDate(birthDate) &&
      city &&
      longitude !== '' &&
      timezone &&
      (unknownBirthTime || /^([01]\d|2[0-3]):[0-5]\d$/.test(birthTime))
  );
  const calcSignature = [
    gender,
    birthDate,
    effectiveBirthTime,
    unknownBirthTime ? '1' : '0',
    longitude,
    timezone
  ].join('|');

  useEffect(() => {
    if (!canCalculate) {
      setPreview(null);
      return;
    }
    if (preview && preview.signature === calcSignature) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setPreviewLoading(true);
      try {
        const res = await fetch('https://app.scriptingdestiny.com/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            Name: name || 'Guest',
            Gender: gender,
            BirthDate: birthDate,
            BirthTime: effectiveBirthTime,
            unknownBirthTime,
            City: city,
            Longitude: longitude,
            TimezoneString: timezone
          })
        });
        const payload = await res.json().catch(() => ({}));
        if (!res.ok || !payload?.state || controller.signal.aborted) return;
        const st = payload.state;
        const isUnknown = Boolean(st.unknownBirthTime ?? unknownBirthTime);
        const offset = isUnknown
          ? undefined
          : typeof st.SolarOffsetMinutes === 'number'
            ? st.SolarOffsetMinutes
            : computeSolarOffsetMinutes(effectiveBirthTime, st.TrueSolarTime);
        setPreview({
          signature: calcSignature,
          trueSolarTime: isUnknown ? '' : st.TrueSolarTime || '',
          solarOffsetMinutes: offset,
          unknownBirthTime: isUnknown,
          dayPillar: st.Day
        });
      } catch {
        /* non-blocking preview */
      } finally {
        if (!controller.signal.aborted) setPreviewLoading(false);
      }
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [
    canCalculate,
    calcSignature,
    preview,
    name,
    gender,
    birthDate,
    effectiveBirthTime,
    unknownBirthTime,
    city,
    longitude,
    timezone
  ]);

  const activeDiscount =
    discount && !discount.redeemed && new Date(discount.expiresAt) > new Date() ? discount : null;
  const ownedTiers = savedIntake?.ownedTiers ?? [];
  const ownsConsult = ownedTiers.includes('consult');
  const ownsPremium = ownedTiers.includes('premium');
  const ownsStandard = ownedTiers.includes('standard');
  const usingSavedIntake = Boolean(savedIntake) && !editingDetails;

  const dayMasterInfo = useMemo(() => {
    if (!preview?.dayPillar) return null;
    const stem = CORRECT_STEMS[preview.dayPillar.stem];
    if (!stem) return null;
    return {
      stem,
      summary: DAY_MASTER_SUMMARIES[stem.hanzi] || null
    };
  }, [preview]);

  const selectPopularCity = (c: PopularCity) => {
    setCity(c.name);
    setCityQuery(c.name);
    setLongitude(c.longitude);
    setTimezone(c.timezone);
    setCityDropdownOpen(false);
    setError(null);
  };

  const selectGeocodedCity = (r: GeocodingResult) => {
    const label = `${r.name}${r.admin1 ? `, ${r.admin1}` : ''}${r.country ? `, ${r.country}` : ''}`;
    setCity(label);
    setCityQuery(label);
    setLongitude(r.longitude);
    setTimezone(r.timezone || 'UTC');
    setCityDropdownOpen(false);
    setError(null);
  };

  const upgradeCreditCents = usingSavedIntake ? Math.max(0, savedIntake?.upgradeCreditCents || 0) : 0;

  const netTierPricing = (tier: PaidTier) => {
    if (!prices) return null;
    const baseCents = activeDiscount ? discountedCents(prices[tier], activeDiscount.percent) : prices[tier];
    const alreadyOwned =
      usingSavedIntake &&
      (ownsConsult || (tier !== 'consult' && ownsPremium) || (tier === 'standard' && ownsStandard));
    const credit = !alreadyOwned && upgradeCreditCents > 0 ? Math.min(upgradeCreditCents, Math.max(0, baseCents - 50)) : 0;
    return { baseCents, credit, netCents: Math.max(0, baseCents - credit) };
  };

  const priceDisplay = (tier: PaidTier | null) => {
    if (!tier || !prices) return null;
    const p = netTierPricing(tier);
    return p ? formatMoney(p.netCents, prices.currency) : null;
  };

  /** Direct 1-click Stripe checkout for a returning visitor using their unedited saved intake. */
  const handleQuickBuySaved = async (tier: PaidTier) => {
    if (!savedIntake) return;
    const under18 = isUnder18(savedIntake.input.birthDate || '');
    if (!ageConfirmed) {
      setError(
        under18
          ? 'Please confirm that you are at least 18 years of age and the parent or legal guardian of the recipient to proceed.'
          : 'Please confirm that you are at least 18 years of age and agree to the terms to proceed.'
      );
      return;
    }
    setBusyTier(tier);
    setError(null);
    trackEvent('checkout_started', { tier, source: 'shop_saved_intake', has_discount: Boolean(activeDiscount) });
    try {
      const url = await startCheckout(savedIntake.intakeId, tier, activeDiscount?.code, { returnTo: 'shop', language: reportLanguage });
      window.location.assign(url);
    } catch (err: any) {
      setError(err?.message || 'The payment page could not be opened. Please try again.');
      setBusyTier(null);
    }
  };

  /** Click on a tier card: select tier and scroll down to birth details or confirmation. */
  const handleTierAction = (tier: PaidTier) => {
    setSelectedTier(tier);
    setError(null);
    window.setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  /** Form submission for new shop buyers or returning buyers who edited their birth details / focus. */
  const handleFormCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedTier) {
      setError('Please select a reading tier above to proceed.');
      return;
    }

    if (!isValidBirthDate(birthDate)) {
      setError('Please enter a valid birth date (year between 1900 and 2100).');
      return;
    }
    if (!city || longitude === '' || !timezone) {
      setError('Please choose your city of birth from the list so we can calculate True Solar Time.');
      return;
    }
    if (!unknownBirthTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(birthTime)) {
      setError('Please enter your birth time, or tick "I don\'t know my exact birth time".');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('Please enter a valid email address so we can deliver your PDF report.');
      return;
    }
    if (!ageConfirmed) {
      setError(
        isUnder18(birthDate)
          ? 'Please confirm that you are at least 18 years of age and the parent or legal guardian of the recipient to proceed.'
          : 'Please confirm that you are at least 18 years of age and agree to the terms to proceed.'
      );
      return;
    }

    setBusyTier(selectedTier);
    trackEvent('checkout_started', {
      tier: selectedTier,
      source: savedIntake ? 'shop_edited_intake' : 'shop_direct',
      has_discount: Boolean(activeDiscount)
    });

    try {
      const { url } = await startDirectCheckout(
        {
          name: name.trim() || 'Guest',
          gender,
          birthDate,
          birthTime: unknownBirthTime ? undefined : birthTime,
          unknownBirthTime,
          longitude: Number(longitude),
          timezone,
          city,
          language: reportLanguage,
          ...(lifeContext.trim() ? { lifeContext: lifeContext.trim() } : {})
        },
        email,
        marketingConsent,
        selectedTier,
        {
          // Pass the one-time discount only if the email matches the saved intake that earned it
          discountCode:
            activeDiscount && savedIntake && email.trim().toLowerCase() === savedIntake.email.toLowerCase()
              ? activeDiscount.code
              : undefined,
          returnTo: 'shop'
        }
      );
      window.location.assign(url);
    } catch (err: any) {
      setError(err?.message || 'The payment page could not be opened. Please try again.');
      setBusyTier(null);
    }
  };

  const handleSurveyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onStartSurvey) {
      e.preventDefault();
      onStartSurvey();
    }
  };

  const showForm = !usingSavedIntake;

  return (
    <main className="w-full max-w-[1160px] mx-auto px-1 sm:px-2 pb-10 space-y-8 sm:space-y-10">
      {/* Editorial Hero */}
      <section className="text-center space-y-4 pt-2 sm:pt-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/50 bg-red-950/40 text-xs font-bold uppercase tracking-[0.16em] text-red-200 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" aria-hidden="true" />
          <span>Black Friday Weekend Launch · 70% Off All Readings (USD)</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-light text-text-main tracking-tight normal-case border-0 pb-0 mt-0 max-w-none leading-[1.12]">
          Commission Your Destiny Blueprint
        </h1>
        <p className="text-sm sm:text-base text-text-dim max-w-2xl mx-auto leading-relaxed">
          Every report is computed to True Solar Time and written specifically for your Four Pillars—delivered as a
          keepsake PDF straight to your inbox within minutes.
        </p>

        {/* 70% Never This Low Again Callout Box */}
        <div className="max-w-xl mx-auto p-3.5 rounded-sm border border-red-500/60 bg-gradient-to-r from-red-950/50 via-bg-panel to-red-950/50 text-center space-y-1 shadow-xl">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-red-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" aria-hidden="true" />
            <span>Black Friday Weekend Special · Strictly Limited</span>
          </div>
          <p className="text-xs sm:text-sm text-text-main font-medium leading-relaxed">
            All readings are <strong>70% off for our Black Friday Launch Weekend</strong>. <strong className="text-brand-gold underline decoration-brand-gold/60">Full readings and consultations will never be priced this low again.</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-1 text-xs text-text-dim">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-gold" aria-hidden="true" />
            True Solar Time precision
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-brand-gold" aria-hidden="true" />
            Instant download &amp; email copy
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" aria-hidden="true" />
            Secure Stripe checkout (Billed in USD)
          </span>
        </div>
      </section>

      {/* Returning Customer Banner (from email magic link ?intake=... or active session) */}
      {loadingIntake && (
        <div className="flex items-center justify-center gap-2 p-4 rounded-sm border border-border-main bg-bg-panel/70 text-sm text-text-dim">
          <Loader2 className="w-4 h-4 animate-spin text-brand-gold" aria-hidden="true" />
          Loading your saved chart details…
        </div>
      )}

      {!loadingIntake && savedIntake && (
        <section
          aria-label="Saved chart details"
          className="p-4 sm:p-5 rounded-sm border border-brand-gold/45 bg-bg-panel/90 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                Your chart is ready for upgrade
              </div>
              <p className="text-sm sm:text-base text-text-main font-medium">
                {savedIntake.input.name && savedIntake.input.name !== 'Guest' ? `${savedIntake.input.name} · ` : ''}
                {savedIntake.input.birthDate} ·{' '}
                {savedIntake.input.unknownBirthTime
                  ? 'Birth time unknown (3 Pillars)'
                  : savedIntake.input.birthTime}{' '}
                · {savedIntake.input.city}
              </p>
              <p className="text-xs text-text-dim">
                Report will be sent to <span className="text-text-ash">{savedIntake.email}</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {dayMasterInfo && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border-main bg-bg-dark/70">
                  <span className="font-hanzi text-xl text-brand-gold leading-none">{dayMasterInfo.stem.hanzi}</span>
                  <div className="text-left leading-tight">
                    <div className="text-[11px] font-semibold text-text-main">{dayMasterInfo.stem.pinyin}</div>
                    <div className="text-[10px] text-text-dim">
                      {dayMasterInfo.stem.polarity === '+' ? 'Yang' : 'Yin'} {dayMasterInfo.stem.element}
                    </div>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setEditingDetails((prev) => !prev);
                  setError(null);
                  if (!editingDetails) {
                    window.setTimeout(() => {
                      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }
                }}
                className="min-h-[44px] px-3.5 rounded-sm border border-border-main bg-bg-dark hover:border-brand-gold/60 text-xs font-semibold text-text-main inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-brand-gold" aria-hidden="true" />
                {editingDetails ? 'Use saved details' : 'Edit birth details'}
              </button>
            </div>
          </div>

          {activeDiscount && (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-brand-gold/50 bg-brand-gold/10 text-xs sm:text-sm text-text-main">
              <Tag className="w-4 h-4 text-brand-gold shrink-0" aria-hidden="true" />
              <span>
                One-time offer active: <strong className="font-mono">{activeDiscount.code}</strong> ·{' '}
                {activeDiscount.percent}% off applied automatically (valid until{' '}
                {new Date(activeDiscount.expiresAt).toLocaleDateString()}).
              </span>
            </div>
          )}

          {ownsConsult && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border-main/60">
              <p className="text-sm text-text-ash">
                Your <strong className="text-text-main">7-Day Email Consultation</strong> is booked. Check your inbox
                for your welcome guide—reply whenever you&apos;re ready to begin.
              </p>
              <a
                href={paidPdfUrl(savedIntake.intakeId, 'consult')}
                className="min-h-[44px] px-4 rounded-sm bg-brand-gold text-bg-dark font-semibold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 hover:brightness-105 shrink-0"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Included Full PDF
              </a>
            </div>
          )}

          {ownsPremium && !ownsConsult && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border-main/60">
              <p className="text-sm text-text-ash">
                You already own the <strong className="text-text-main">Full Reading</strong>. Download it any time, or
                book a <strong className="text-text-main">7-Day Email Consultation</strong> below for direct 1-on-1 Q&amp;A.
              </p>
              <a
                href={paidPdfUrl(savedIntake.intakeId, 'premium')}
                className="min-h-[44px] px-4 rounded-sm border border-border-main bg-bg-dark text-text-main hover:border-brand-gold font-semibold text-xs inline-flex items-center justify-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Full Reading (PDF)
              </a>
            </div>
          )}

          {ownsStandard && !ownsPremium && !ownsConsult && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border-main/60">
              <p className="text-sm text-text-ash">
                You already own the <strong className="text-text-main">Standard Reading</strong>. You can download it
                any time or upgrade below.
              </p>
              <a
                href={paidPdfUrl(savedIntake.intakeId, 'standard')}
                className="min-h-[44px] px-4 rounded-sm border border-border-main bg-bg-dark text-text-main hover:border-brand-gold text-xs font-semibold inline-flex items-center justify-center gap-2 shrink-0"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Standard (PDF)
              </a>
            </div>
          )}
        </section>
      )}

      {/* Paid Reading Cards (Hero Focus: 3-tier Good / Better / Best anchoring) */}
      <section aria-label="Choose your reading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs text-text-dim">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-main">Step 1: Choose Your Reading Tier</span>
            <span className="px-2 py-0.5 rounded-xs bg-red-950/70 border border-red-500/40 text-[10px] font-bold text-red-300 uppercase tracking-wider">
              70% Off Weekend Launch
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border-main bg-bg-panel/70 text-[11px] text-text-ash self-start sm:self-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            All prices in USD (Billed internationally via Stripe)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {(['standard', 'premium', 'consult'] as PaidTier[]).map((tier) => {
            const info = TIER_INFO[tier];
            const meta = TIER_META[tier];
            const featured = tier === 'premium';
            const isConsult = tier === 'consult';
            const isSelected = selectedTier === tier && showForm;
            const alreadyOwned =
              usingSavedIntake &&
              (ownsConsult || (tier !== 'consult' && ownsPremium) || (tier === 'standard' && ownsStandard));
            const isBusy = busyTier === tier;

            return (
              <div
                key={tier}
                className={`relative flex flex-col gap-5 p-6 rounded-sm border transition-all ${
                  featured
                    ? 'border-brand-gold/80 bg-gradient-to-b from-brand-gold/[0.09] via-bg-panel to-bg-panel shadow-lg'
                    : isConsult
                      ? 'border-brand-gold/35 bg-gradient-to-b from-bg-elevated/80 via-bg-panel to-bg-panel'
                      : 'border-border-main bg-bg-panel/90'
                } ${isSelected ? 'ring-1 ring-brand-gold' : ''}`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-2xl sm:text-[26px] font-normal text-text-main border-0 pb-0 mt-0 normal-case max-w-none tracking-tight leading-tight">
                      {info.name}
                    </h2>
                    {meta.badge && (
                      <span
                        className={`px-2.5 py-0.5 rounded-xs border text-[10px] font-bold uppercase tracking-[0.14em] shrink-0 mt-1 ${
                          featured
                            ? 'border-brand-gold/60 bg-brand-gold/15 text-brand-gold'
                            : 'border-border-main bg-bg-dark/80 text-text-ash'
                        }`}
                      >
                        {meta.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-dim leading-relaxed">{info.summary}</p>
                </div>

                {/* Price */}
                <div className="min-h-[48px] flex flex-wrap items-baseline gap-x-2.5 gap-y-1 border-y border-border-main/60 py-3">
                  {prices ? (() => {
                    const p = netTierPricing(tier)!;
                    if (p.credit > 0) {
                      return (
                        <>
                          <span className="font-display text-3xl sm:text-4xl text-brand-gold font-normal">
                            {formatMoney(p.netCents, prices.currency)}
                          </span>
                          <s className="text-base text-text-dim font-normal line-through">
                            {formatMoney(p.baseCents, prices.currency)}
                          </s>
                          <span className="px-1.5 py-0.5 rounded-xs bg-emerald-950/70 border border-emerald-500/40 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                            Upgrade Credit −{formatMoney(p.credit, prices.currency)}
                          </span>
                        </>
                      );
                    }
                    if (activeDiscount) {
                      return (
                        <>
                          <span className="font-display text-3xl sm:text-4xl text-brand-gold font-normal">
                            {formatMoney(p.netCents, prices.currency)}
                          </span>
                          <s className="text-sm text-text-dim">{formatMoney(prices[tier], prices.currency)}</s>
                          <span className="text-xs font-semibold text-brand-gold">
                            {activeDiscount.percent}% off
                          </span>
                        </>
                      );
                    }
                    return (
                      <>
                        <span className="font-display text-3xl sm:text-4xl text-brand-gold font-normal">
                          {formatMoney(prices[tier], prices.currency)}
                        </span>
                        {ORIGINAL_PRICES_CENTS[tier] > prices[tier] && (
                          <s className="text-base text-text-dim font-normal line-through">
                            {formatMoney(ORIGINAL_PRICES_CENTS[tier], prices.currency)}
                          </s>
                        )}
                        <span className="px-1.5 py-0.5 rounded-xs bg-red-950/60 border border-red-500/40 text-[10px] font-bold text-red-300 uppercase tracking-wider">
                          Black Friday
                        </span>
                      </>
                    );
                  })() : (
                    <span className="text-sm text-text-dim">Loading price…</span>
                  )}
                </div>

                {/* Deliverables */}
                <ul className="space-y-2.5 text-sm text-text-ash flex-1">
                  {info.sections.map((section) => (
                    <li key={section} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{section}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-text-dim leading-relaxed">{meta.idealFor}</p>

                {/* CTA */}
                <div className="space-y-2 pt-1">
                  {alreadyOwned ? (
                    <a
                      href={paidPdfUrl(savedIntake!.intakeId, tier)}
                      className="w-full min-h-[48px] px-4 rounded-sm border border-wood-yang/50 bg-wood-yang/10 text-text-main font-semibold text-sm flex items-center justify-center gap-2 hover:border-brand-gold transition-colors"
                    >
                      <Download className="w-4 h-4 text-wood-yang" aria-hidden="true" />
                      Already owned · Download PDF
                    </a>
                  ) : !checkoutEnabled ? (
                    <div className="w-full min-h-[48px] px-4 rounded-sm border border-border-main bg-bg-dark/60 text-text-dim text-sm flex items-center justify-center">
                      Checkout coming soon
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleTierAction(tier)}
                      disabled={busyTier !== null}
                      aria-busy={isBusy}
                      className={`w-full min-h-[50px] px-5 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                        featured
                          ? 'bg-brand-gold text-bg-dark hover:brightness-105 active:scale-[0.99]'
                          : 'border border-border-main bg-bg-dark text-text-main hover:border-brand-gold active:scale-[0.99]'
                      }`}
                    >
                      {isBusy ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          Opening secure checkout…
                        </>
                      ) : usingSavedIntake ? (
                        <>
                          <span>Get the {info.name}</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </>
                      ) : isSelected ? (
                        <>
                          <Check className="w-4 h-4" aria-hidden="true" />
                          <span>Selected · Enter birth details below</span>
                        </>
                      ) : (
                        <>
                          <span>Choose {info.name}</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  )}
                  <p className="text-[11px] text-center text-text-dim">
                    {meta.delivery} ·{' '}
                    <button
                      type="button"
                      onClick={() => setActivePolicyModal('refund')}
                      className="underline hover:text-brand-gold cursor-pointer"
                    >
                      Refund Policy
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {usingSavedIntake && error && (
          <p role="alert" className="text-sm text-fire-yang text-center">
            {error}
          </p>
        )}
      </section>

      {/* Birth Details / Confirmation Area (shown ONLY after an option is selected) */}
      {!selectedTier ? (
        <div className="p-8 rounded-sm border border-dashed border-border-main/80 bg-bg-panel/40 text-center space-y-2">
          <p className="text-base font-medium text-text-main">
            ↑ Select a reading tier above to proceed
          </p>
          <p className="text-xs text-text-dim max-w-md mx-auto">
            {savedIntake
              ? 'Choose a tier above to confirm your saved chart details and proceed directly to checkout.'
              : 'Birth details fields will appear as soon as you select an option above.'}
          </p>
        </div>
      ) : (
        <section
          ref={formSectionRef}
          aria-label="Confirm or enter birth details and proceed to checkout"
          className="rounded-sm border border-border-main bg-bg-panel/95 p-5 sm:p-8 shadow-xl space-y-6 scroll-mt-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-main/70">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                {usingSavedIntake ? 'Step 2 · Confirm Chart Details' : savedIntake ? 'Step 2 · Edit Chart Details' : 'Step 2 · Enter Birth Details'}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-normal text-text-main border-0 pb-0 mt-0 normal-case max-w-none tracking-tight">
                {usingSavedIntake ? `Confirm details for ${TIER_INFO[selectedTier].name}` : savedIntake ? `Update details for ${TIER_INFO[selectedTier].name}` : `Enter birth details for ${TIER_INFO[selectedTier].name}`}
              </h2>
              <p className="text-sm text-text-dim">
                {usingSavedIntake
                  ? 'Your birth details are loaded from your saved intake. Confirm below to proceed directly, or edit if needed.'
                  : 'Used strictly to compute your Four Pillars and True Solar Time. Delivered as a PDF to your email.'}
              </p>
            </div>

            {/* Tier switcher pill inside form */}
            <div
              role="group"
              aria-label="Selected report tier"
              className="inline-flex flex-wrap items-center gap-1 bg-bg-dark p-1 rounded-sm border border-border-main self-start sm:self-center shrink-0"
            >
              {(['standard', 'premium', 'consult'] as PaidTier[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className={`min-h-[40px] px-3 rounded-xs text-xs font-semibold transition-colors cursor-pointer ${
                    selectedTier === tier
                      ? 'bg-brand-gold text-bg-dark'
                      : 'text-text-dim hover:text-text-main'
                  }`}
                >
                  {TIER_META[tier].shortLabel}
                  {priceDisplay(tier) ? ` · ${priceDisplay(tier)}` : ''}
                </button>
              ))}
            </div>
          </div>

          {usingSavedIntake ? (
            /* Confirmed details view for returning users with an intake link */
            <div className="space-y-5">
              <div className="p-4 sm:p-5 rounded-xs border border-brand-gold/40 bg-bg-dark/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-main/50 pb-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-gold">Confirmed Chart Profile</span>
                    <div className="text-base font-medium text-text-main mt-0.5">
                      {savedIntake.input.name && savedIntake.input.name !== 'Guest' ? savedIntake.input.name : 'Chart Recipient'} ·{' '}
                      {savedIntake.input.gender === 'F' ? 'Female (女)' : 'Male (男)'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingDetails(true);
                      setError(null);
                    }}
                    className="min-h-[38px] px-3.5 rounded-xs border border-border-main hover:border-brand-gold bg-bg-panel text-xs text-brand-gold font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Edit birth details</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 rounded-xs bg-bg-panel/70 border border-border-main/50 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-text-dim">Birth Date</span>
                    <div className="text-text-main font-medium">{savedIntake.input.birthDate}</div>
                  </div>
                  <div className="p-3 rounded-xs bg-bg-panel/70 border border-border-main/50 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-text-dim">Birth Time</span>
                    <div className="text-text-main font-medium">
                      {savedIntake.input.unknownBirthTime ? 'Unknown (Three Pillars)' : savedIntake.input.birthTime}
                    </div>
                  </div>
                  <div className="p-3 rounded-xs bg-bg-panel/70 border border-border-main/50 space-y-0.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-text-dim">Birthplace &amp; Solar Time</span>
                    <div className="text-text-main font-medium">{savedIntake.input.city}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xs bg-bg-panel/70 border border-border-main/50 text-sm space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-dim">Delivery Email Address</span>
                  <div className="text-text-main font-medium">{savedIntake.email}</div>
                </div>
              </div>

              {/* Report Output Language Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-text-dim font-medium">
                  Report Language / 报告语言
                </label>
                <div className="grid grid-cols-2 gap-2.5 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setReportLanguage('en')}
                    className={`min-h-[42px] px-3 rounded-xs border text-xs font-semibold transition-colors cursor-pointer ${
                      reportLanguage === 'en'
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold'
                        : 'border-border-main bg-bg-dark text-text-dim hover:text-text-main'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportLanguage('zh')}
                    className={`min-h-[42px] px-3 rounded-xs border text-xs font-semibold transition-colors cursor-pointer ${
                      reportLanguage === 'zh'
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold'
                        : 'border-border-main bg-bg-dark text-text-dim hover:text-text-main'
                    }`}
                  >
                    中文 (Mandarin)
                  </button>
                </div>
              </div>

              {/* Optional Focus Notes for consultation or reading */}
              <div className="space-y-1.5">
                <label htmlFor="confirm-focus" className="block text-xs font-medium text-text-ash">
                  {selectedTier === 'consult'
                    ? 'Initial questions or context for your consultation'
                    : "Anything specific you'd like your reading to address?"}{' '}
                  <span className="text-text-dim">(Optional)</span>
                </label>
                <textarea
                  id="confirm-focus"
                  rows={selectedTier === 'consult' ? 3 : 2}
                  maxLength={1200}
                  placeholder={
                    selectedTier === 'consult'
                      ? 'Share your current career, relationship, or major crossroads questions. Your 24-page Full Reading PDF arrives within minutes, followed by Lead Analyst Blake Leung’s personally audited & bespoke opening analysis within 10 business days (often faster).'
                      : 'e.g. Considering a career transition next year, launching a business, or navigating a relationship crossroads…'
                  }
                  value={lifeContext}
                  onChange={(e) => setLifeContext(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-bg-dark border border-border-main text-text-main rounded-xs resize-y"
                />
                {selectedTier === 'consult' && (
                  <p className="text-[11px] text-text-dim leading-relaxed">
                    ⏱️ <strong className="text-text-ash">Turnaround &amp; Schedule Notice:</strong> You receive your 24-page Full Reading PDF immediately upon purchase. To ensure classical depth, Lead Analyst Blake Leung&apos;s personally audited review &amp; bespoke analysis is delivered within 10 business days (often faster; up to 3–4 weeks during peak volume). Your consultation runs across <strong>7 business days (Monday–Friday)</strong>—please note responses are not sent on weekends. Your 7-business-day clock starts only after delivery of your opening email.
                  </p>
                )}
              </div>

              {/* Minor notice if under 18 */}
              {isUnder18(savedIntake.input.birthDate || '') && (
                <div className="flex items-start gap-2.5 p-3 rounded-xs border border-amber-500/40 bg-amber-500/10 text-xs text-amber-200 leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>Notice:</strong> This chart is for someone under 18. You confirm you are their parent or legal guardian ordering this chart.
                  </span>
                </div>
              )}

              {/* Mandatory 18+ Checkbox */}
              <label className="flex items-start gap-2.5 min-h-[40px] text-xs sm:text-sm text-text-ash cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={ageConfirmed}
                  onChange={(e) => {
                    setAgeConfirmed(e.target.checked);
                    if (error) setError(null);
                  }}
                  className="w-4 h-4 mt-0.5 accent-brand-gold shrink-0 cursor-pointer"
                  required
                />
                <span className="leading-snug">
                  {isUnder18(savedIntake.input.birthDate || '') ? (
                    <>
                      I confirm that <strong className="text-text-main">I am at least 18 years of age</strong>, the parent or legal guardian of the chart recipient, and agree to the{' '}
                    </>
                  ) : (
                    <>
                      I confirm that <strong className="text-text-main">I am at least 18 years of age</strong> and agree to the{' '}
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setActivePolicyModal('terms')}
                    className="text-brand-gold underline hover:brightness-110 cursor-pointer"
                  >
                    Terms of Service
                  </button>
                  ,{' '}
                  <button
                    type="button"
                    onClick={() => setActivePolicyModal('privacy')}
                    className="text-brand-gold underline hover:brightness-110 cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  , and{' '}
                  <button
                    type="button"
                    onClick={() => setActivePolicyModal('refund')}
                    className="text-brand-gold underline hover:brightness-110 cursor-pointer"
                  >
                    Refund Policy
                  </button>
                  .
                </span>
              </label>

              {error && (
                <p role="alert" className="text-sm text-fire-yang">
                  {error}
                </p>
              )}

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-text-dim">
                  <Lock className="w-3.5 h-3.5 text-brand-gold shrink-0" aria-hidden="true" />
                  <span>Encrypted payment processed in USD via Stripe. No account required.</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (lifeContext.trim()) {
                      void handleFormCheckout({ preventDefault: () => {} } as any);
                    } else {
                      void handleQuickBuySaved(selectedTier);
                    }
                  }}
                  disabled={busyTier !== null}
                  aria-busy={busyTier !== null}
                  className="min-h-[52px] px-7 rounded-sm bg-brand-gold text-bg-dark font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                >
                  {busyTier !== null ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      Opening secure checkout…
                    </>
                  ) : (
                    <>
                      <span>
                        Confirm &amp; Continue to Checkout · {TIER_INFO[selectedTier].name}
                        {priceDisplay(selectedTier) ? ` (${priceDisplay(selectedTier)})` : ''}
                      </span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>

              {/* Chargeback & Legal Consent Strip */}
              <div className="pt-1.5 text-[11px] text-text-dim text-center sm:text-right leading-relaxed">
                All transactions are processed in US Dollars (USD). By continuing to checkout, you agree to our{' '}
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('terms')}
                  className="text-text-ash underline hover:text-brand-gold cursor-pointer"
                >
                  Terms of Service
                </button>
                ,{' '}
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('privacy')}
                  className="text-text-ash underline hover:text-brand-gold cursor-pointer"
                >
                  Privacy Policy
                </button>
                , and{' '}
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('refund')}
                  className="text-text-ash underline hover:text-brand-gold cursor-pointer"
                >
                  Refund Policy
                </button>
                .
              </div>
            </div>
          ) : (
            /* Editable birth details form (for new users or when editing saved details) */
            <form onSubmit={handleFormCheckout} noValidate className="space-y-5">
              {savedIntake && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xs bg-brand-gold/10 border border-brand-gold/30 text-xs text-text-main">
                  <span>Editing saved chart details. When finished, continue to checkout below.</span>
                  <button
                    type="button"
                    onClick={() => setEditingDetails(false)}
                    className="text-brand-gold hover:underline font-semibold cursor-pointer shrink-0 self-start sm:self-auto"
                  >
                    Cancel &amp; return to confirmed details
                  </button>
                </div>
              )}
            {/* Row 1: Birth Date + Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="shop-birth-date" className="block text-xs font-medium text-text-ash">
                  Birth Date
                </label>
                <input
                  id="shop-birth-date"
                  type="date"
                  min="1900-01-01"
                  max="2100-12-31"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                    if (error) setError(null);
                  }}
                  required
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-base sm:text-sm bg-bg-dark border border-border-main text-text-main rounded-xs"
                />
                {isUnder18(birthDate) && (
                  <div className="mt-2.5 flex items-start gap-2.5 p-3 rounded-xs border border-amber-500/40 bg-amber-500/10 text-xs text-amber-200 leading-relaxed">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>
                      <strong>Notice:</strong> This chart is for someone under 18. You confirm you are their parent or legal guardian ordering this chart.
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <span className="block text-xs font-medium text-text-ash">Assigned Gender at Birth</span>
                <div className="grid grid-cols-2 gap-2">
                  {([
                    { value: 'M', label: 'Male (男)' },
                    { value: 'F', label: 'Female (女)' }
                  ] as const).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setGender(opt.value)}
                      aria-pressed={gender === opt.value}
                      className={`min-h-[48px] px-3 rounded-xs border text-sm font-medium transition-colors cursor-pointer ${
                        gender === opt.value
                          ? 'border-brand-gold bg-brand-gold/10 text-text-main'
                          : 'border-border-main bg-bg-dark text-text-dim hover:text-text-main'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-text-dim">
                  Sets forward or reverse 10-Year Luck Cycle (大运) direction in classical BaZi.
                </p>
              </div>
            </div>

            {/* Row 2: City of Birth (with autocomplete + quick chips) */}
            <div ref={cityContainerRef} className="space-y-2 relative">
              <label htmlFor="shop-city" className="block text-xs font-medium text-text-ash">
                City of Birth
              </label>
              <div className="relative">
                <Search
                  className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="shop-city"
                  type="text"
                  autoComplete="off"
                  placeholder="Search any city (e.g. Singapore, London, New York)"
                  value={cityQuery}
                  onFocus={() => setCityDropdownOpen(true)}
                  onChange={(e) => {
                    const next = e.target.value;
                    setCityQuery(next);
                    if (next.trim() !== city) {
                      setCity('');
                      setLongitude('');
                      setTimezone('');
                    }
                    setCityDropdownOpen(true);
                    if (error) setError(null);
                  }}
                  className="w-full min-h-[48px] pl-10 pr-10 py-2.5 text-base sm:text-sm bg-bg-dark border border-border-main text-text-main rounded-xs"
                />
                {searchingCities && (
                  <Loader2
                    className="w-4 h-4 animate-spin text-brand-gold absolute right-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                )}
              </div>

              {city && longitude !== '' && timezone && (
                <p className="inline-flex items-center gap-1.5 text-xs text-brand-gold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    {formatLongitude(longitude)} · {timezone}
                  </span>
                </p>
              )}

              {cityDropdownOpen && (cityResults.length > 0 || offlineCityMatches.length > 0 || geocodedEmpty) && (
                <ul
                  role="listbox"
                  aria-label="City suggestions"
                  className="absolute z-30 left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-sm border border-border-main bg-bg-panel shadow-2xl divide-y divide-border-main/40"
                >
                  {cityResults.length > 0
                    ? cityResults.map((res, idx) => {
                        const label = `${res.name}${res.admin1 ? `, ${res.admin1}` : ''}${res.country ? `, ${res.country}` : ''}`;
                        return (
                          <li key={`${res.id ?? res.name}-${idx}`}>
                            <button
                              type="button"
                              onClick={() => selectGeocodedCity(res)}
                              className="w-full text-left px-3.5 py-2.5 min-h-[44px] hover:bg-bg-elevated flex items-center justify-between gap-2 text-sm text-text-main cursor-pointer"
                            >
                              <span>{label}</span>
                              <span className="text-xs text-text-dim font-mono shrink-0">
                                {formatLongitude(res.longitude)}
                              </span>
                            </button>
                          </li>
                        );
                      })
                    : offlineCityMatches.map((c) => (
                        <li key={c.name}>
                          <button
                            type="button"
                            onClick={() => selectPopularCity(c)}
                            className="w-full text-left px-3.5 py-2.5 min-h-[44px] hover:bg-bg-elevated flex items-center justify-between gap-2 text-sm text-text-main cursor-pointer"
                          >
                            <span>{c.label}</span>
                            <span className="text-xs text-text-dim font-mono shrink-0">
                              {formatLongitude(c.longitude)}
                            </span>
                          </button>
                        </li>
                      ))}
                  {geocodedEmpty && cityResults.length === 0 && (
                    <li className="px-3.5 py-2.5 text-xs text-text-dim">
                      No exact match found—try a nearby major city.
                    </li>
                  )}
                </ul>
              )}

              {/* Popular city chips */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {FEATURED_CITIES.map((c) => {
                  const active = city === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => selectPopularCity(c)}
                      className={`min-h-[36px] px-3 rounded-xs border text-xs transition-colors cursor-pointer ${
                        active
                          ? 'border-brand-gold bg-brand-gold/10 text-text-main font-semibold'
                          : 'border-border-main bg-bg-dark/60 text-text-dim hover:text-text-main'
                      }`}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Row 3: Birth Time + Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="shop-birth-time" className="block text-xs font-medium text-text-ash">
                  Birth Time
                </label>
                <input
                  id="shop-birth-time"
                  type="time"
                  value={unknownBirthTime ? '' : birthTime}
                  disabled={unknownBirthTime}
                  onChange={(e) => {
                    setBirthTime(e.target.value);
                    if (error) setError(null);
                  }}
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-base sm:text-sm bg-bg-dark border border-border-main text-text-main rounded-xs disabled:opacity-50"
                />
                {!unknownBirthTime && birthTime && (
                  <p className="text-xs text-text-dim">
                    <strong className="text-text-ash">{birthTime}</strong> = {formatTime12h(birthTime)} — double-check
                    AM/PM before ordering.
                  </p>
                )}
                <label className="flex items-center gap-2.5 min-h-[40px] text-sm text-text-ash cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={unknownBirthTime}
                    onChange={(e) => {
                      setUnknownBirthTime(e.target.checked);
                      if (error) setError(null);
                    }}
                    className="w-4 h-4 accent-brand-gold shrink-0"
                  />
                  <span>I don&apos;t know my exact birth time</span>
                </label>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="shop-name" className="block text-xs font-medium text-text-ash">
                  Name on Report <span className="text-text-dim">(Optional)</span>
                </label>
                <input
                  id="shop-name"
                  type="text"
                  maxLength={60}
                  placeholder="How we should address your reading"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full min-h-[48px] px-3.5 py-2.5 text-base sm:text-sm bg-bg-dark border border-border-main text-text-main rounded-xs"
                />
              </div>
            </div>

            {/* Live True Solar Time & Day Master Accuracy Preview */}
            {(previewLoading || preview) && (
              <div className="p-4 rounded-sm border border-brand-gold/30 bg-bg-dark/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {preview?.unknownBirthTime
                      ? 'Three-Pillar Chart Ready (Year · Month · Day)'
                      : 'True Solar Time Correction'}
                  </div>
                  {previewLoading && !preview ? (
                    <p className="text-xs text-text-dim flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                      Calculating True Solar Time…
                    </p>
                  ) : preview && !preview.unknownBirthTime ? (
                    <p className="text-xs sm:text-sm text-text-main">
                      True Solar Time: <strong className="font-mono">{preview.trueSolarTime.slice(0, 5)}</strong>{' '}
                      <span className="text-text-dim">({formatOffsetLabel(preview.solarOffsetMinutes)})</span>
                    </p>
                  ) : (
                    <p className="text-xs text-text-dim">
                      Your reading will analyze your known Three Pillars and 10-Year Luck Cycles cleanly without
                      guessing an Hour Pillar.
                    </p>
                  )}
                </div>

                {dayMasterInfo && (
                  <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-sm border border-border-main bg-bg-panel shrink-0 self-start sm:self-center">
                    <span className="font-hanzi text-2xl text-brand-gold leading-none">
                      {dayMasterInfo.stem.hanzi}
                    </span>
                    <div className="leading-tight">
                      <div className="text-[10px] uppercase tracking-wider text-text-dim">Day Master</div>
                      <div className="text-xs font-semibold text-text-main">
                        {dayMasterInfo.stem.pinyin} · {dayMasterInfo.stem.polarity === '+' ? 'Yang' : 'Yin'}{' '}
                        {dayMasterInfo.stem.element}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Row 4: Delivery Email + Optional Focus Note */}
            <div className="grid grid-cols-1 gap-4 pt-2 border-t border-border-main/60">
              <div className="space-y-1.5">
                <label htmlFor="shop-email" className="block text-xs font-medium text-text-ash">
                  Delivery Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="w-4 h-4 text-text-dim absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="shop-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    className="w-full min-h-[48px] pl-10 pr-3.5 py-2.5 text-base sm:text-sm bg-bg-dark border border-border-main text-text-main rounded-xs"
                  />
                </div>
                <p className="text-xs text-text-dim">
                  {selectedTier === 'consult'
                    ? 'We send your Full Reading PDF here, followed by a separate welcome email to start your 7-day private Q&A.'
                    : 'We send your completed PDF report and permanent download link here.'}
                </p>
              </div>

              {/* Report Output Language Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-text-ash">
                  Report Language / 报告语言
                </label>
                <div className="grid grid-cols-2 gap-2.5 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setReportLanguage('en')}
                    className={`min-h-[42px] px-3 rounded-xs border text-xs font-semibold transition-colors cursor-pointer ${
                      reportLanguage === 'en'
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold'
                        : 'border-border-main bg-bg-dark text-text-dim hover:text-text-main'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportLanguage('zh')}
                    className={`min-h-[42px] px-3 rounded-xs border text-xs font-semibold transition-colors cursor-pointer ${
                      reportLanguage === 'zh'
                        ? 'border-brand-gold bg-brand-gold/15 text-brand-gold'
                        : 'border-border-main bg-bg-dark text-text-dim hover:text-text-main'
                    }`}
                  >
                    中文 (Mandarin)
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="shop-focus" className="block text-xs font-medium text-text-ash">
                  {selectedTier === 'consult'
                    ? 'Initial questions or context for your consultation'
                    : "Anything specific you'd like your reading to address?"}{' '}
                  <span className="text-text-dim">(Optional)</span>
                </label>
                <textarea
                  id="shop-focus"
                  rows={selectedTier === 'consult' ? 3 : 2}
                  maxLength={1200}
                  placeholder={
                    selectedTier === 'consult'
                      ? 'Share your current career, relationship, or major crossroads questions. Your 24-page Full Reading PDF arrives within minutes, followed by Lead Analyst Blake Leung’s personally audited & bespoke opening analysis within 10 business days (often faster; up to 3–4 weeks during peak periods). Your 7-day private email Q&A clock begins only once you receive it.'
                      : 'e.g. Considering a career transition next year, launching a business, or navigating a relationship crossroads…'
                  }
                  value={lifeContext}
                  onChange={(e) => setLifeContext(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-base sm:text-sm bg-bg-dark border border-border-main text-text-main rounded-xs resize-y"
                />
                {selectedTier === 'consult' && (
                  <p className="text-[11px] text-text-dim leading-relaxed">
                    ⏱️ <strong className="text-text-ash">Turnaround &amp; Schedule Notice:</strong> You receive your 24-page Full Reading PDF immediately upon purchase. To ensure unhurried mathematical and
                    classical depth, Lead Analyst Blake Leung&apos;s personally audited review &amp; bespoke analysis is delivered within 10 business days (often faster; up to 3–4 weeks during peak volume).
                    Your consultation runs across <strong>7 business days (Monday–Friday)</strong>—please note responses are not sent on weekends. Your 7-business-day clock starts only after delivery of your opening email.
                  </p>
                )}
              </div>

              {/* Mandatory 18+ Age Attestation & Legal Policy Agreement */}
              <label className="flex items-start gap-2.5 min-h-[40px] text-xs sm:text-sm text-text-ash cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={ageConfirmed}
                  onChange={(e) => {
                    setAgeConfirmed(e.target.checked);
                    if (error) setError(null);
                  }}
                  className="w-4 h-4 mt-0.5 accent-brand-gold shrink-0 cursor-pointer"
                  required
                />
                <span className="leading-snug">
                  {isUnder18(birthDate) ? (
                    <>
                      I confirm that <strong className="text-text-main">I am at least 18 years of age</strong>, the parent or legal guardian of the chart recipient, and agree to the{' '}
                    </>
                  ) : (
                    <>
                      I confirm that <strong className="text-text-main">I am at least 18 years of age</strong> and agree to the{' '}
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setActivePolicyModal('terms')}
                    className="text-brand-gold underline hover:brightness-110 cursor-pointer"
                  >
                    Terms of Service
                  </button>
                  ,{' '}
                  <button
                    type="button"
                    onClick={() => setActivePolicyModal('privacy')}
                    className="text-brand-gold underline hover:brightness-110 cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  , and{' '}
                  <button
                    type="button"
                    onClick={() => setActivePolicyModal('refund')}
                    className="text-brand-gold underline hover:brightness-110 cursor-pointer"
                  >
                    Refund Policy
                  </button>
                  .
                </span>
              </label>

              <label className="flex items-start gap-2.5 min-h-[40px] text-xs sm:text-sm text-text-ash cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-brand-gold shrink-0 cursor-pointer"
                />
                <span>Also send me occasional classical BaZi timing notes and offers (optional)</span>
              </label>
            </div>

            {error && (
              <p role="alert" className="text-sm text-fire-yang">
                {error}
              </p>
            )}

            {/* Submit CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-text-dim">
                <Lock className="w-3.5 h-3.5 text-brand-gold shrink-0" aria-hidden="true" />
                <span>Encrypted payment processed in USD via Stripe. No account required.</span>
              </div>

              {checkoutEnabled ? (
                <button
                  type="submit"
                  disabled={busyTier !== null}
                  aria-busy={busyTier !== null}
                  className="min-h-[52px] px-7 rounded-sm bg-brand-gold text-bg-dark font-semibold text-sm flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
                >
                  {busyTier !== null ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      Opening secure checkout…
                    </>
                  ) : (
                    <>
                      <span>
                        Continue to Checkout · {TIER_INFO[selectedTier].name}
                        {priceDisplay(selectedTier) ? ` (${priceDisplay(selectedTier)})` : ''}
                      </span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              ) : (
                <div className="min-h-[48px] px-5 rounded-sm border border-border-main text-sm text-text-dim flex items-center justify-center">
                  Checkout coming soon
                </div>
              )}
            </div>

            {/* Chargeback & Legal Consent Strip */}
            <div className="pt-1.5 text-[11px] text-text-dim text-center sm:text-right leading-relaxed">
              All transactions are processed in US Dollars (USD). By continuing to checkout, you agree to our{' '}
              <button
                type="button"
                onClick={() => setActivePolicyModal('terms')}
                className="text-text-ash underline hover:text-brand-gold cursor-pointer"
              >
                Terms of Service
              </button>
              ,{' '}
              <button
                type="button"
                onClick={() => setActivePolicyModal('privacy')}
                className="text-text-ash underline hover:text-brand-gold cursor-pointer"
              >
                Privacy Policy
              </button>
              , and{' '}
              <button
                type="button"
                onClick={() => setActivePolicyModal('refund')}
                className="text-text-ash underline hover:text-brand-gold cursor-pointer font-medium"
              >
                Refund Policy
              </button>
              . Automated digital reports are delivered immediately upon payment confirmation and are non-refundable once generated.
            </div>
          </form>
          )}
        </section>
      )}

      {/* Secondary CTA for Hesitant / Cold Visitors (Option 3: Survey -> Free Report) */}
      <section
        aria-label="Free report option"
        className="p-5 sm:p-6 rounded-sm border border-border-main bg-bg-panel/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-gold">
            Want to test our accuracy first?
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-normal text-text-main border-0 pb-0 mt-0 normal-case max-w-none tracking-tight">
            Start with a Free BaZi Blueprint
          </h2>
          <p className="text-sm text-text-dim max-w-xl leading-relaxed">
            Take our 60-second chart survey to receive a complimentary starter PDF report and explore your interactive
            Four Pillars—no credit card needed.
          </p>
        </div>
        <a
          href={surveyUrl}
          onClick={handleSurveyClick}
          className="min-h-[48px] px-5 rounded-sm border border-brand-gold/50 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors shrink-0"
        >
          <span>Take the Survey &amp; Get Free Report</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </section>

      {/* Compact Reassurance / FAQ Strip */}
      <section aria-label="Frequently asked questions" className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-sm border border-border-main/70 bg-bg-panel/40 space-y-1.5">
          <h3 className="text-sm font-semibold text-text-main font-sans">How fast will I receive my PDF?</h3>
          <p className="text-xs text-text-dim leading-relaxed">
            Your report begins generating the moment Stripe confirms payment—typically ready on screen and emailed to your inbox within minutes (typically 2–5 minutes). If your report does not appear in your primary inbox, please check your Promotions, Spam, or Junk folder before contacting support.
          </p>
        </div>
        <div className="p-4 rounded-sm border border-border-main/70 bg-bg-panel/40 space-y-1.5">
          <h3 className="text-sm font-semibold text-text-main font-sans">What if I don&apos;t know my birth time?</h3>
          <p className="text-xs text-text-dim leading-relaxed">
            Tick &ldquo;I don&apos;t know my exact birth time.&rdquo; We compute an accurate Three-Pillar reading (Year,
            Month, Day + 10-Year Luck Cycles) without inventing an Hour Pillar.
          </p>
        </div>
        <div className="p-4 rounded-sm border border-border-main/70 bg-bg-panel/40 space-y-1.5">
          <h3 className="text-sm font-semibold text-text-main font-sans">Why does birth city matter?</h3>
          <p className="text-xs text-text-dim leading-relaxed">
            Classical BaZi aligns with solar noon rather than political time zones. Your city&apos;s exact longitude
            adjusts clock time to True Solar Time for pillar accuracy.
          </p>
        </div>
      </section>

      {/* Legal & Policy Footer */}
      <footer className="mt-8 pt-6 pb-4 border-t border-border-main/70 text-xs text-text-dim space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-text-ash font-medium">
            &copy; {new Date().getFullYear()} Scripting Destiny. All rights reserved.
          </div>
          <nav aria-label="Legal policies" className="flex flex-wrap items-center gap-4 text-text-ash">
            <button
              type="button"
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-brand-gold underline underline-offset-4 cursor-pointer transition-colors"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-brand-gold underline underline-offset-4 cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActivePolicyModal('refund')}
              className="hover:text-brand-gold underline underline-offset-4 cursor-pointer transition-colors"
            >
              Refund Policy
            </button>
            <button
              type="button"
              onClick={() => setActivePolicyModal('disclaimer')}
              className="hover:text-brand-gold underline underline-offset-4 cursor-pointer transition-colors"
            >
              Legal &amp; Metaphysical Disclaimers
            </button>
            <a
              href="mailto:support@scriptingdestiny.com"
              className="hover:text-brand-gold underline underline-offset-4 transition-colors"
            >
              Contact Support
            </a>
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-text-dim">
          <p className="max-w-xl text-text-dim/80 leading-relaxed">
            Disclaimer: Classical BaZi (Four Pillars of Destiny) analysis is provided strictly for personal insight,
            self-reflection, and cultural educational purposes (classified legally as entertainment). It does not substitute
            for licensed medical, psychiatric, legal, or financial advice. Must be 18+ to purchase.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <span>Direct Pages:</span>
            <a href="https://scriptingdestiny.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold underline">Terms</a>
            <span>·</span>
            <a href="https://scriptingdestiny.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold underline">Privacy</a>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {activePolicyModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="policy-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActivePolicyModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] bg-bg-panel border border-border-main rounded-sm shadow-2xl flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-main">
              <h2 id="policy-modal-title" className="font-display text-xl text-text-main font-normal tracking-tight">
                {activePolicyModal === 'terms' && 'Terms of Service & Consultation Agreement'}
                {activePolicyModal === 'privacy' && 'Privacy & Data Protection Policy'}
                {activePolicyModal === 'refund' && 'Refund & Cancellation Policy'}
                {activePolicyModal === 'disclaimer' && 'Legal & Metaphysical Disclaimers'}
              </h2>
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="p-1 rounded-xs text-text-dim hover:text-text-main hover:bg-bg-dark transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto px-6 py-5 space-y-4 text-sm text-text-dim leading-relaxed">
              {activePolicyModal === 'terms' && (
                <>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">1. Scope of Products</h3>
                    <p>
                      Scripting Destiny provides automated digital BaZi analysis reports (Standard and Full Reading PDFs)
                      and bespoke one-on-one advisory services (7-Day Email Consultation). All purchases grant a personal,
                      non-exclusive, non-transferable license for single-individual use.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">2. Delivery Expectations &amp; Timelines</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Standard &amp; Full Reports:</strong> Generated automatically upon successful payment and
                        delivered via on-screen instant download link and email within minutes (typically 2–5 minutes).
                      </li>
                      <li>
                        <strong>1-on-1 Consultation Turnaround:</strong> Includes immediate delivery of the 24-page Full Reading PDF within minutes, followed by
                        a personally audited review &amp; bespoke analysis by Scripting Destiny&apos;s Lead Analyst, Blake Leung. Because each client&apos;s chart calculations, elemental balances, and timing cycles are personally audited and analyzed with classical mathematical
                        rigor, opening consultation responses are delivered within <strong>10 business days</strong> (often faster; extending up to{' '}
                        <strong>3–4 weeks during peak seasonal volume</strong>).
                      </li>
                      <li>
                        <strong>7-Day Advisory Window (7 Business Days):</strong> The consultation runs across <strong>7 business days (Monday to Friday, excluding weekends)</strong>. Responses are sent on business days, and correspondence is not conducted on the weekends. Your 7-business-day private email dialogue clock begins only once you receive Blake&apos;s opening analysis email.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">3. Client Responsibilities &amp; Accuracy</h3>
                    <p>
                      Calculations depend directly on the birth data (date, time, and birthplace) submitted at checkout. If you
                      discover a typographical error in your birth details within 48 hours of purchase, contact{' '}
                      <a href="mailto:support@scriptingdestiny.com" className="text-brand-gold underline">
                        support@scriptingdestiny.com
                      </a>{' '}
                      and we will re-render your corrected chart at no additional charge.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">4. Age Requirement &amp; Minor Orders</h3>
                    <p>
                      You must be at least 18 years of age to purchase any report or consultation from Scripting Destiny. If ordering for a minor, you confirm you are their parent or legal guardian authorized to purchase on their behalf.
                    </p>
                  </div>
                  <div className="pt-2 text-xs text-text-dim">
                    View full online terms:{' '}
                    <a href="https://scriptingdestiny.com/terms" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">
                      scriptingdestiny.com/terms
                    </a>
                  </div>
                </>
              )}

              {activePolicyModal === 'privacy' && (
                <>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">1. Birth Information &amp; Solar Coordinates</h3>
                    <p>
                      Scripting Destiny collects your birth date, birth time, birthplace city, and astronomical coordinates (longitude/latitude via Open-Meteo) strictly for computing True Solar Time and your classical Four Pillars chart.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">2. How Your Data Is Protected &amp; Zero Public AI Training</h3>
                    <p className="mb-2">
                      We apply strict administrative, contractual, and technical safeguards (including TLS 1.3 encryption in transit and AES-256 encryption at rest) to protect your birth details and intake notes:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                      <li>
                        <strong>Zero Data Brokering:</strong> We never sell, rent, lease, or trade your birth details, email address, or voluntary life context notes to third-party data brokers, advertisers, or marketing exchanges.
                      </li>
                      <li>
                        <strong>Zero Public AI Model Training:</strong> Synthesis requests sent to our underlying enterprise AI models to compose personalized PDF readings run exclusively under enterprise API agreements with strict zero-data-retention (ZDR) policies. Your personal chart data and intake life context notes are never retained by third-party AI vendors and never used to train public or third-party AI models.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">3. Payment &amp; Email Delivery Processors</h3>
                    <p>
                      Financial details are handled exclusively by Stripe; Scripting Destiny never sees or stores card numbers. Transactional report emails and links are delivered via Brevo.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">4. Data Deletion &amp; Right to Erasure</h3>
                    <p>
                      You may request the permanent deletion of your intake records and all stored reports at any time by contacting{' '}
                      <a href="mailto:support@scriptingdestiny.com" className="text-brand-gold underline">
                        support@scriptingdestiny.com
                      </a>
                      .
                    </p>
                  </div>
                  <div className="pt-2 text-xs text-text-dim">
                    View full online privacy policy:{' '}
                    <a href="https://scriptingdestiny.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">
                      scriptingdestiny.com/privacy
                    </a>
                  </div>
                </>
              )}

              {activePolicyModal === 'refund' && (
                <>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">1. Automated Digital Reports</h3>
                    <p>
                      Because our Standard and Full Reading reports are customized digital files that are generated and
                      delivered immediately upon order confirmation, all sales of automated PDF reports are final and
                      non-refundable once generated.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">2. 1-on-1 Consultations</h3>
                    <p>
                      Consultations may be cancelled within <strong>48 hours of purchase</strong>, provided that Lead Analyst Blake Leung has not yet commenced your personally audited review and bespoke consultation preparation.
                    </p>
                    <p className="mt-1.5">
                      Because your customized 24-page Full Reading PDF report is generated and emailed immediately upon purchase, if you cancel after your report has been sent, we will refund the amount paid <strong>minus the standard cost of the Full Reading ($49.99 USD)</strong> and any unrecoverable third-party Stripe payment processing fees. You retain permanent ownership of your delivered 24-page Full Reading report.
                    </p>
                    <p className="mt-1.5">
                      Once preparation of your personally audited review &amp; bespoke analysis has begun or the initial opening consultation email has been dispatched, consultation fees are strictly non-refundable due to the dedicated practitioner time committed.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">3. Technical Delivery Guarantee</h3>
                    <p>
                      If a technical glitch prevents access to your PDF report, or if our platform fails to compute your True
                      Solar Time properly, please notify us immediately at{' '}
                      <a href="mailto:support@scriptingdestiny.com" className="text-brand-gold underline">
                        support@scriptingdestiny.com
                      </a>
                      . We will resolve the technical issue and re-deliver your report immediately, or issue a 100% refund if the
                      file cannot be delivered.
                    </p>
                  </div>
                </>
              )}

              {activePolicyModal === 'disclaimer' && (
                <>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">1. Metaphysical Nature of BaZi</h3>
                    <p>
                      BaZi (Four Pillars of Destiny) is a traditional Chinese metaphysical and philosophical system that models
                      energetic tendencies based on the solar calendar. Readings are interpretive syntheses designed for cultural
                      insight, contemplation, and personal self-reflection. Under applicable law, all readings are classified as
                      entertainment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">2. No Licensed Professional Advice</h3>
                    <p>
                      Nothing contained within our reports, website, or consultation correspondence constitutes or replaces
                      licensed medical diagnosis, psychiatric care, legal counsel, or financial/investment advice. Never disregard
                      or delay seeking professional medical, legal, or financial counsel based on insights found in your reading.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-main text-sm mb-1">3. Agency &amp; Limitation of Liability</h3>
                    <p>
                      You retain full personal agency, free will, and autonomy over all life choices and actions. Scripting Destiny,
                      its authors, and its practitioners accept no liability or responsibility for any damages, losses, or life
                      outcomes resulting from actions taken or omitted based on the contents of your reading.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end px-6 py-3 border-t border-border-main bg-bg-dark/40">
              <button
                type="button"
                onClick={() => setActivePolicyModal(null)}
                className="px-4 py-2 rounded-xs bg-bg-dark border border-border-main text-xs font-semibold text-text-main hover:border-brand-gold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
