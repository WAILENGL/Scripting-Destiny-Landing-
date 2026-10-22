export type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
export type PolarityType = '+' | '-';

export interface Stem {
  index: number;
  pinyin: string;
  hanzi: string;
  element: ElementType;
  polarity: PolarityType;
  title: string;
  archetype: string;
  keywords: string[];
  description: string;
  strategicAdvice: string;
  elementColor: string;
  bgBadge: string;
}

export interface Branch {
  index: number;
  pinyin: string;
  hanzi: string;
  animal: string;
  element: ElementType;
  hiddenStemIndices: number[];
}

export interface PillarData {
  name: string;
  label: string;
  stem: Stem;
  branch: Branch;
  tenGod: string;
  significance: string;
}

export interface LuckCycle {
  startAge: number;
  startYear: number;
  stem: Stem;
  branch: Branch;
  phaseTheme: string;
}

export interface BaZiChart {
  birthDate: string;
  birthTime: string;
  year: PillarData;
  month: PillarData;
  day: PillarData;
  hour: PillarData;
  dayMaster: Stem;
  elementBalance: {
    Wood: number;
    Fire: number;
    Earth: number;
    Metal: number;
    Water: number;
  };
  luckCycles: LuckCycle[];
  strategicSummary: string;
}

export interface PresetPersona {
  id: string;
  name: string;
  role: string;
  birthDate: string;
  birthTime: string;
  tagline: string;
}
