export interface Pillar {
  stem: number;
  branch: number;
}

export interface Stem {
  pinyin: string;
  hanzi: string;
  element: 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
  polarity: '+' | '-';
  className: string;
}

export const CORRECT_STEMS: Stem[] = [
  { pinyin: 'Jia', hanzi: '甲', element: 'Wood', polarity: '+', className: 'text-wood-yang' },
  { pinyin: 'Yi', hanzi: '乙', element: 'Wood', polarity: '-', className: 'text-wood-yin' },
  { pinyin: 'Bing', hanzi: '丙', element: 'Fire', polarity: '+', className: 'text-fire-yang' },
  { pinyin: 'Ding', hanzi: '丁', element: 'Fire', polarity: '-', className: 'text-fire-yin' },
  { pinyin: 'Wu', hanzi: '戊', element: 'Earth', polarity: '+', className: 'text-earth-yang' },
  { pinyin: 'Ji', hanzi: '己', element: 'Earth', polarity: '-', className: 'text-earth-yin' },
  { pinyin: 'Geng', hanzi: '庚', element: 'Metal', polarity: '+', className: 'text-metal-yang' },
  { pinyin: 'Xin', hanzi: '辛', element: 'Metal', polarity: '-', className: 'text-metal-yin' },
  { pinyin: 'Ren', hanzi: '壬', element: 'Water', polarity: '+', className: 'text-water-yang' },
  { pinyin: 'Gui', hanzi: '癸', element: 'Water', polarity: '-', className: 'text-water-yin' },
];

export const DAY_MASTER_SUMMARIES: string[] = [
  'Yang Wood is the tall tree: upright, principled and growth-minded. You lead by example and keep reaching upward, but can be stubborn when bent.',
  'Yin Wood is the vine and flower: adaptable, graceful and quietly persistent. You find a way around obstacles and thrive through connection.',
  'Yang Fire is the sun: warm, generous and impossible to ignore. You light up a room and inspire others, though you can burn out by giving too much.',
  'Yin Fire is the candle: perceptive, gentle and focused. You illuminate details others miss and bring warmth to the people closest to you.',
  'Yang Earth is the mountain: steady, reliable and protective. People lean on your stability, though change can feel slow to you.',
  'Yin Earth is the fertile field: nurturing, practical and patient. You help people and ideas grow, often working behind the scenes.',
  'Yang Metal is the raw blade: decisive, loyal and direct. You value justice and toughness, and you get sharper under pressure.',
  'Yin Metal is the jewel: refined, precise and discerning. You hold high standards and shine when your talents are polished.',
  'Yang Water is the ocean: bold, resourceful and always moving. You think big and adapt quickly, but need direction to avoid flooding.',
  'Yin Water is the rain and mist: intuitive, imaginative and subtle. You understand people deeply and work your influence quietly.',
];
