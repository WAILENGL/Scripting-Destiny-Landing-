import { Solar } from 'lunar-typescript';
import { BaZiChart, ElementType, PillarData, LuckCycle, Stem, Branch } from '../types/bazi';
import { STEMS, BRANCHES } from './baziConstants';

const GAN_LIST = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const ZHI_LIST = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

function getStemByHanzi(hanzi: string): Stem {
  const index = GAN_LIST.indexOf(hanzi);
  if (index >= 0 && STEMS[index]!) {
    return STEMS[index]!;
  }
  return STEMS[0]!; // fallback Jia
}

function getBranchByHanzi(hanzi: string): Branch {
  const index = ZHI_LIST.indexOf(hanzi);
  if (index >= 0 && BRANCHES[index]!) {
    return BRANCHES[index]!;
  }
  return BRANCHES[0]!; // fallback Zi
}

// Ten God (Shi Shen) classification
export function getTenGodName(dmStem: Stem, targetStem: Stem): string {
  if (dmStem.hanzi === targetStem.hanzi) return 'Friend (Bi Jian)';
  
  const elementOrder: ElementType[] = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const dmIdx = elementOrder.indexOf(dmStem.element);
  const targetIdx = elementOrder.indexOf(targetStem.element);

  const diff = (targetIdx - dmIdx + 5) % 5;
  const samePolarity = dmStem.polarity === targetStem.polarity;

  switch (diff) {
    case 0:
      return samePolarity ? 'Companion (Bi Jian)' : 'Competitor (Jie Cai)';
    case 1:
      // DM produces Target: Output
      return samePolarity ? 'Creative Output (Shi Shen)' : 'Expressive Force (Shang Guan)';
    case 2:
      // DM controls Target: Wealth
      return samePolarity ? 'Indirect Wealth (Pian Cai)' : 'Direct Wealth (Zheng Cai)';
    case 3:
      // Target controls DM: Power / Authority
      return samePolarity ? 'Directing Power (Qi Sha)' : 'Disciplined Officer (Zheng Guan)';
    case 4:
      // Target produces DM: Resource / Learning
      return samePolarity ? 'Insight Resource (Pian Yin)' : 'Foundational Resource (Zheng Yin)';
    default:
      return 'Catalyst';
  }
}

export function calculateBaZi(birthDate: string, birthTime: string, gender: 'M' | 'F' = 'M'): BaZiChart {
  try {
    const [yearStr, monthStr, dayStr] = birthDate.split('-');
    const [hourStr, minStr] = (birthTime || '12:00').split(':');

    const yearNum = parseInt(yearStr ?? "", 10) || 1990;
    const monthNum = parseInt(monthStr ?? "", 10) || 1;
    const dayNum = parseInt(dayStr ?? "", 10) || 1;
    const hourNum = parseInt(hourStr ?? "", 10) || 12;
    const minNum = parseInt(minStr ?? "", 10) || 0;

    const solar = Solar.fromYmdHms(yearNum, monthNum, dayNum, hourNum, minNum, 0);
    const lunar = solar.getLunar();
    const eightChar = lunar.getEightChar();

    const yearGan = eightChar.getYearGan();
    const yearZhi = eightChar.getYearZhi();
    const monthGan = eightChar.getMonthGan();
    const monthZhi = eightChar.getMonthZhi();
    const dayGan = eightChar.getDayGan();
    const dayZhi = eightChar.getDayZhi();
    const timeGan = eightChar.getTimeGan();
    const timeZhi = eightChar.getTimeZhi();

    const dayMaster = getStemByHanzi(dayGan);

    const yearStem = getStemByHanzi(yearGan);
    const yearBranch = getBranchByHanzi(yearZhi);
    const monthStem = getStemByHanzi(monthGan);
    const monthBranch = getBranchByHanzi(monthZhi);
    const dayStem = dayMaster;
    const dayBranch = getBranchByHanzi(dayZhi);
    const hourStem = getStemByHanzi(timeGan);
    const hourBranch = getBranchByHanzi(timeZhi);

    const yearPillar: PillarData = {
      name: 'Year Pillar',
      label: 'Ancestral / Industry Foundation',
      stem: yearStem,
      branch: yearBranch,
      tenGod: getTenGodName(dayMaster, yearStem),
      significance: 'External market presence, societal resonance, and macro environment.',
    };

    const monthPillar: PillarData = {
      name: 'Month Pillar',
      label: 'Career / Execution Arena',
      stem: monthStem,
      branch: monthBranch,
      tenGod: getTenGodName(dayMaster, monthStem),
      significance: 'Vocational engine, executive capacity, and mid-career thrust.',
    };

    const dayPillar: PillarData = {
      name: 'Day Pillar',
      label: 'Core Self / Intrinsic Operating System',
      stem: dayStem,
      branch: dayBranch,
      tenGod: 'Day Master (Self)',
      significance: 'The Day Master represents your immutable core archetype and mental compiler.',
    };

    const hourPillar: PillarData = {
      name: 'Hour Pillar',
      label: 'Legacy / Intellectual Assets',
      stem: hourStem,
      branch: hourBranch,
      tenGod: getTenGodName(dayMaster, hourStem),
      significance: 'Late-stage compound outcomes, intellectual property, and long-range vision.',
    };

    // Calculate Element weights
    const elementCounts: Record<ElementType, number> = {
      Wood: 0,
      Fire: 0,
      Earth: 0,
      Metal: 0,
      Water: 0,
    };

    const allPillars = [yearPillar, monthPillar, dayPillar, hourPillar];
    allPillars.forEach((p) => {
      elementCounts[p.stem.element] += 1.5;
      elementCounts[p.branch.element] += 1.0;
      // Add weight for hidden stems
      p.branch.hiddenStemIndices.forEach((stemIdx) => {
        const hiddenStem = STEMS[stemIdx];
        if (hiddenStem) {
          elementCounts[hiddenStem.element] += 0.5;
        }
      });
    });

    const totalWeight = Object.values(elementCounts).reduce((a, b) => a + b, 0) || 1;
    const elementBalance = {
      Wood: Math.round((elementCounts.Wood / totalWeight) * 100),
      Fire: Math.round((elementCounts.Fire / totalWeight) * 100),
      Earth: Math.round((elementCounts.Earth / totalWeight) * 100),
      Metal: Math.round((elementCounts.Metal / totalWeight) * 100),
      Water: Math.round((elementCounts.Water / totalWeight) * 100),
    };

    // 10-Year Luck cycles (Da Yun)
    const luckCycles: LuckCycle[] = [];
    try {
      const yun = eightChar.getYun(gender === 'M' ? 1 : 0);
      const daYunList = yun.getDaYun();
      // Skip index 0 which is infancy before first cycle
      const cyclesToMap = daYunList.slice(1, 7);
      cyclesToMap.forEach((cycleItem) => {
        const gz = cycleItem.getGanZhi();
        if (gz && gz.length >= 2) {
          const s = getStemByHanzi(gz[0]!);
          const b = getBranchByHanzi(gz[1]!);
          luckCycles.push({
            startAge: cycleItem.getStartAge(),
            startYear: cycleItem.getStartYear(),
            stem: s,
            branch: b,
            phaseTheme: `${s.element} ${s.polarity} Phase: Focus on ${getTenGodName(dayMaster, s).split(' ')[0]} and compounding.`,
          });
        }
      });
    } catch {
      // Graceful fallback if DaYun calculation fails
    }

    const dominantElements = Object.entries(elementBalance)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([elem]) => elem);

    const strategicSummary = `${dayMaster.pinyin} (${dayMaster.hanzi}) ${dayMaster.title} operating with dominant ${dominantElements.join(' & ')} dynamics. Your highest leverage comes from structural alignment with ${dominantElements[0]} principles while actively balancing weaker elemental catalysts.`;

    return {
      birthDate,
      birthTime,
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      hour: hourPillar,
      dayMaster,
      elementBalance,
      luckCycles,
      strategicSummary,
    };
  } catch (err) {
    // Return resilient default if error occurs
    console.error('BaZi calculation error:', err);
    return getFallbackBaZi();
  }
}

function getFallbackBaZi(): BaZiChart {
  const dm = STEMS[0]!; // Jia Wood
  return {
    birthDate: '1990-01-01',
    birthTime: '12:00',
    year: {
      name: 'Year Pillar',
      label: 'Ancestral Foundation',
      stem: STEMS[5]!,
      branch: BRANCHES[5]!,
      tenGod: 'Direct Wealth (Zheng Cai)',
      significance: 'External reputation and baseline generational market presence.',
    },
    month: {
      name: 'Month Pillar',
      label: 'Career / Execution Arena',
      stem: STEMS[2]!,
      branch: BRANCHES[0]!,
      tenGod: 'Creative Output (Shi Shen)',
      significance: 'Vocational engine and mid-career execution.',
    },
    day: {
      name: 'Day Pillar',
      label: 'Core Self',
      stem: dm,
      branch: BRANCHES[2]!,
      tenGod: 'Day Master (Self)',
      significance: 'The core engine of your operating system.',
    },
    hour: {
      name: 'Hour Pillar',
      label: 'Legacy / Vision',
      stem: STEMS[0]!,
      branch: BRANCHES[6]!,
      tenGod: 'Companion (Bi Jian)',
      significance: 'Compound long-range investments and intellectual assets.',
    },
    dayMaster: dm,
    elementBalance: {
      Wood: 35,
      Fire: 25,
      Earth: 15,
      Metal: 10,
      Water: 15,
    },
    luckCycles: [
      { startAge: 9, startYear: 1999, stem: STEMS[1]!, branch: BRANCHES[11]!, phaseTheme: 'Formative Wood exploration' },
      { startAge: 19, startYear: 2009, stem: STEMS[0]!, branch: BRANCHES[10]!, phaseTheme: 'Pioneering structural foundation' },
      { startAge: 29, startYear: 2019, stem: STEMS[9]!, branch: BRANCHES[9]!, phaseTheme: 'Strategic expansion and resource compounding' },
      { startAge: 39, startYear: 2029, stem: STEMS[8]!, branch: BRANCHES[8]!, phaseTheme: 'Macro leadership and global momentum' },
    ],
    strategicSummary: 'Jia (甲) The Pioneer. Natural gravity to architect long-range systems and rally high-performing teams.',
  };
}
