import type { ChartAspectKey, State } from '../types';

export type IntentChoiceKey =
  | 'career_wealth'
  | 'relationships'
  | 'crossroads'
  | 'self_understanding';

export interface IntentOption {
  key: IntentChoiceKey;
  label: string;
  aspectKey: ChartAspectKey;
  teaserNote: string;
}

export const INTENT_OPTIONS: IntentOption[] = [
  {
    key: 'career_wealth',
    label: 'I’d like to find out more about my career & wealth potential',
    aspectKey: 'career_wealth',
    teaserNote:
      'Your full chart maps how this Day Master directs your Wealth stars, Officer structure, and strategic timing for career growth.'
  },
  {
    key: 'relationships',
    label: 'I’d like to know more about my relationships',
    aspectKey: 'love_relationships',
    teaserNote:
      'Your full chart examines how this Day Master interacts with your Spouse Palace, emotional tendencies, and relational cycles.'
  },
  {
    key: 'crossroads',
    label: 'I’m at a crossroads in life and need guidance',
    aspectKey: 'da_yun_annual',
    teaserNote:
      'Your full chart aligns this Day Master with your active 10-Year Luck Pillar and annual transitions to clarify your next move.'
  },
  {
    key: 'self_understanding',
    label: 'I’d like to understand myself better',
    aspectKey: 'overview',
    teaserNote:
      'Your full chart unfolds how this Day Master shapes your innate temperament, elemental balance, and core strengths.'
  }
];

export interface OnboardingDraft {
  step: 1 | 2 | 3 | 4;
  intent: IntentChoiceKey | null;
  lifeContext?: string;
  name: string;
  gender: 'M' | 'F';
  birthDate: string;
  birthTime: string;
  birthTimeUnknown: boolean;
  city: string;
  longitude: number | '';
  timezoneString: string;
}

export interface PopularCity {
  name: string;
  label: string;
  longitude: number;
  timezone: string;
}

export const POPULAR_CITIES: PopularCity[] = [
  { name: 'Singapore', label: 'Singapore', longitude: 103.8198, timezone: 'Asia/Singapore' },
  { name: 'Beijing', label: 'Beijing, China', longitude: 116.4074, timezone: 'Asia/Shanghai' },
  { name: 'Hong Kong', label: 'Hong Kong', longitude: 114.1694, timezone: 'Asia/Hong_Kong' },
  { name: 'Taipei', label: 'Taipei, Taiwan', longitude: 121.5654, timezone: 'Asia/Taipei' },
  { name: 'Tokyo', label: 'Tokyo, Japan', longitude: 139.6917, timezone: 'Asia/Tokyo' },
  { name: 'Kuala Lumpur', label: 'Kuala Lumpur, Malaysia', longitude: 101.6869, timezone: 'Asia/Kuala_Lumpur' },
  { name: 'London', label: 'London, United Kingdom', longitude: -0.1276, timezone: 'Europe/London' },
  { name: 'New York', label: 'New York, United States', longitude: -74.006, timezone: 'America/New_York' },
  { name: 'San Francisco', label: 'San Francisco, United States', longitude: -122.4194, timezone: 'America/Los_Angeles' },
  { name: 'Sydney', label: 'Sydney, Australia', longitude: 151.2093, timezone: 'Australia/Sydney' }
];

export const DRAFT_STORAGE_KEY = 'sd_onboarding_draft_v1';
export const GATE_COMPLETED_KEY = 'sd_onboarding_gate_completed_v1';
export const AI_SETTINGS_STORAGE_KEY = 'sd_ai_settings';

export const DEFAULT_ONBOARDING_DRAFT: OnboardingDraft = {
  step: 1,
  intent: null,
  lifeContext: '',
  name: '',
  gender: 'M',
  birthDate: '',
  birthTime: '',
  birthTimeUnknown: false,
  city: '',
  longitude: '',
  timezoneString: ''
};

export interface OnboardingCompletionData extends Partial<State> {
  Name: string;
  Gender: 'M' | 'F';
  BirthDate: string;
  BirthTime: string;
  unknownBirthTime: boolean;
  City: string;
  Longitude: number | '';
  TimezoneString: string;
  TrueSolarTime: string;
  SolarOffsetMinutes?: number;
  OnboardingIntent?: IntentChoiceKey;
  lifeContext?: string;
  aspectKey?: ChartAspectKey;
}

const VALID_INTENTS = new Set<IntentChoiceKey>([
  'career_wealth',
  'relationships',
  'crossroads',
  'self_understanding'
]);

function sanitizeDraft(raw: unknown): OnboardingDraft | null {
  if (!raw || typeof raw !== 'object') return null;
  const obj = raw as Record<string, unknown>;
  const stepNum = Number(obj.step);
  const step: 1 | 2 | 3 | 4 =
    stepNum === 1 || stepNum === 2 || stepNum === 3 || stepNum === 4 ? stepNum : 1;
  const intent =
    typeof obj.intent === 'string' && VALID_INTENTS.has(obj.intent as IntentChoiceKey)
      ? (obj.intent as IntentChoiceKey)
      : null;
  const gender: 'M' | 'F' = obj.gender === 'F' ? 'F' : 'M';
  const longitude =
    typeof obj.longitude === 'number' && Number.isFinite(obj.longitude) ? obj.longitude : '';

  return {
    step,
    intent,
    lifeContext: typeof obj.lifeContext === 'string' ? obj.lifeContext : '',
    name: typeof obj.name === 'string' ? obj.name : '',
    gender,
    birthDate: typeof obj.birthDate === 'string' ? obj.birthDate : '',
    birthTime: typeof obj.birthTime === 'string' ? obj.birthTime : '',
    birthTimeUnknown: Boolean(obj.birthTimeUnknown ?? obj.unknownBirthTime),
    city: typeof obj.city === 'string' ? obj.city : '',
    longitude,
    timezoneString: typeof obj.timezoneString === 'string' ? obj.timezoneString : ''
  };
}

export function loadOnboardingDraft(): OnboardingDraft {
  if (typeof window === 'undefined') return { ...DEFAULT_ONBOARDING_DRAFT };

  const sources: Array<Storage | undefined> = [
    (() => {
      try {
        return window.sessionStorage;
      } catch {
        return undefined;
      }
    })(),
    (() => {
      try {
        return window.localStorage;
      } catch {
        return undefined;
      }
    })()
  ];

  for (const storage of sources) {
    if (!storage) continue;
    try {
      const raw = storage.getItem(DRAFT_STORAGE_KEY);
      if (!raw) continue;
      const parsed = sanitizeDraft(JSON.parse(raw));
      if (parsed) return parsed;
    } catch {
      /* ignore malformed or blocked storage */
    }
  }

  return { ...DEFAULT_ONBOARDING_DRAFT };
}

export function saveOnboardingDraft(draft: OnboardingDraft): void {
  if (typeof window === 'undefined') return;
  const serialized = JSON.stringify(draft);
  try {
    window.sessionStorage.setItem(DRAFT_STORAGE_KEY, serialized);
  } catch {
    /* sessionStorage unavailable */
  }
  try {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, serialized);
  } catch {
    /* localStorage unavailable */
  }
}

export function clearOnboardingDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    /* sessionStorage unavailable */
  }
  try {
    window.localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    /* localStorage unavailable */
  }
}

export function hasCompletedGate(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.localStorage.getItem(GATE_COMPLETED_KEY) === 'true') return true;
  } catch {
    /* localStorage unavailable */
  }
  try {
    if (window.sessionStorage.getItem(GATE_COMPLETED_KEY) === 'true') return true;
  } catch {
    /* sessionStorage unavailable */
  }
  return false;
}

export function markGateCompleted(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(GATE_COMPLETED_KEY, 'true');
  } catch {
    /* localStorage unavailable */
  }
  try {
    window.sessionStorage.setItem(GATE_COMPLETED_KEY, 'true');
  } catch {
    /* sessionStorage unavailable */
  }
}

export function getIntentOption(intent: IntentChoiceKey | null): IntentOption | undefined {
  if (!intent) return undefined;
  return INTENT_OPTIONS.find((opt) => opt.key === intent);
}

/**
 * Computes signed True Solar Time offset in minutes relative to local wall-clock time.
 */
export function computeSolarOffsetMinutes(
  birthTime: string,
  trueSolarTime: string
): number | undefined {
  if (!birthTime || !trueSolarTime) return undefined;
  const [bh, bm] = birthTime.split(':').map(Number);
  const [th, tm, ts] = trueSolarTime.split(':').map(Number);
  if (
    !Number.isFinite(bh) ||
    !Number.isFinite(bm) ||
    !Number.isFinite(th) ||
    !Number.isFinite(tm)
  ) {
    return undefined;
  }
  const clockTotal = bh * 60 + bm;
  const solarTotal = th * 60 + tm + (Number.isFinite(ts) ? ts / 60 : 0);
  let diff = Math.round(solarTotal - clockTotal);
  if (diff > 720) diff -= 1440;
  if (diff < -720) diff += 1440;
  return diff;
}

export function formatLongitude(longitude: number | ''): string {
  if (longitude === '' || !Number.isFinite(longitude)) return '';
  const dir = longitude >= 0 ? 'E' : 'W';
  return `${Math.abs(longitude).toFixed(2)}°${dir}`;
}

/**
 * Checks if a given birthDate (YYYY-MM-DD) indicates the subject is under 18 years old.
 * An optional referenceDate can be provided for deterministic testing.
 */
export function isUnder18(date: string, referenceDate: Date = new Date()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return false;
  const parts = date.split('-');
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) return false;
  let age = referenceDate.getFullYear() - y;
  const monthDiff = referenceDate.getMonth() + 1 - m;
  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < d)) {
    age--;
  }
  return age < 18;
}
