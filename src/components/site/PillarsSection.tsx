import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export function PillarsSection() {
  const { isZh, t } = useLanguage();
  const [selected, setSelected] = useState<{ type: "natal" | "luck"; key: string | number }>({
    type: "natal",
    key: "day",
  });

  const natalData = {
    en: {
      year: {
        badge: "NATAL PILLAR · 先天年柱 (SAMPLE)",
        title: "Year Pillar (年柱) — Roots & Ancestry",
        stage: "Life Stage: Ages 0–16 (Childhood & Heritage)",
        chars: "In this sample: 庚 (Metal) / 午 (Fire) · Your chart will have its own elements",
        points: [
          { bold: "What This Pillar Does", desc: "Represents your family roots, ancestral lineage, early childhood environment (ages 0–16), and the macro era into which you were born." },
          { bold: "How to Read It", desc: "The Year Pillar governs your outer social interface—the first impression, public vibe, and reputation you project to acquaintances and the wider world before they get to know you deeply." },
          { bold: "How It Relates to the Whole Chart", desc: "Sets your baseline social foundation. It shows the instinctive way you navigate large groups, broad networks, and community spaces." },
          { bold: "Different for Everyone", desc: "Everyone's Year Pillar is determined by their lunar-solar birth year. While this sample has Metal over Fire, your chart will feature its own unique elements." },
        ],
      },
      month: {
        badge: "NATAL PILLAR · 先天月柱 (SAMPLE)",
        title: "Month Pillar (月柱) — Career, Drive & Season of Birth",
        stage: "Life Stage: Ages 17–32 (Youth & Vocational Ascent)",
        chars: "In this sample: 壬 (Water) / 午 (Fire) · Sets the seasonal climate of the chart",
        points: [
          { bold: "What This Pillar Does", desc: "Represents your career drive, working style, ambition, and relationships with parents, teachers, and early professional mentors." },
          { bold: "Season of Birth (月令)", desc: "The Earthly Branch (bottom character) is the most powerful anchor in BaZi. It tells whether you were born in spring, summer, autumn, or winter, setting the internal thermal climate for your entire chart." },
          { bold: "How to Read It", desc: "Shows what environments enable your innate talents to flourish and how you naturally convert raw potential into practical achievements and livelihood." },
          { bold: "Different for Everyone", desc: "Your birth month introduces specific seasonal energy that either nourishes, balances, or challenges your core self." },
        ],
      },
      day: {
        badge: "NATAL PILLAR · 先天日柱 (CORE SAMPLE)",
        title: "Day Pillar (日柱) — Core Self (Day Master) & Inner Sanctuary",
        stage: "Life Stage: Ages 33–48 (Prime Adulthood & Maturity)",
        chars: "In this sample: 辛 (Xin Metal) / 亥 (Hai Water) · Note: Not everyone is Xin Metal!",
        points: [
          { bold: "Day Master (日主元神)", desc: "The top character is the central reference point of the entire chart—representing *you* (your core self, values, and natural way of thinking)." },
          { bold: "Everyone Is a Different Element", desc: "Not everyone is Xin Metal! There are 10 possible Day Masters across the 5 Elements (Wood, Fire, Earth, Metal, or Water). In this example, it happens to be 辛 (Xin Metal), but yours might be an expansive ocean (壬 Water), a towering tree (甲 Wood), warm sunlight (丙 Fire), or fertile soil (戊 Earth)." },
          { bold: "Spouse Palace (夫妻宫)", desc: "The bottom character represents your private inner world, emotional sanctuary, and relationship patterns with your life partner." },
          { bold: "How to Read It", desc: "All other 7 characters in your chart—and every 10-year luck cycle—are evaluated by how they support, soften, or challenge your personal Day Master." },
        ],
      },
      hour: {
        badge: "NATAL PILLAR · 先天时柱 (SAMPLE)",
        title: "Hour Pillar (时柱) — Inner Aspirations, Output & Legacy",
        stage: "Life Stage: Ages 49 and beyond (Second Half of Life)",
        chars: "In this sample: 甲 (Wood) / 午 (Fire) · Calculated from solar birth time",
        points: [
          { bold: "What This Pillar Does", desc: "Represents your private dreams, creative outputs, inventions, and relationships with children, apprentices, or team members." },
          { bold: "Second Half of Life", desc: "Governs how your life compounds after age 49—revealing what you build and leave behind." },
          { bold: "How to Read It", desc: "While the Year Pillar is your outer public front, the Hour Pillar is your deepest private core—what you care about when all social expectations drop away." },
          { bold: "Different for Everyone", desc: "Calculated from your exact solar birth hour, completing the Four Pillars that define your unique personal fingerprint." },
        ],
      },
    },
    zh: {
      year: {
        badge: "先天命柱 · 年柱 (示例)",
        title: "年柱 (Year Pillar) —— 根基、祖德与外延初见",
        stage: "对应人生阶段：0至16岁（幼年启蒙与根基阶段）",
        chars: "本例展示：庚金 / 午火 · 您的命盘将由您的出生年份决定",
        points: [
          { bold: "此柱代表的核心维度", desc: "代表家族根基、祖业渊源、幼年成长环境（0–16岁）以及出生时的大时代宏观背景。" },
          { bold: "在命盘推演中的作用", desc: "年柱主导您的“外延气场”——即陌生人、外界市场或初次见面者对您产生的第一印象与品牌声量。" },
          { bold: "与整盘的关联", desc: "年柱是整张命盘的底色与起点，揭示您在面对大型社交网络、行业大圈子时的本能姿态。" },
          { bold: "每个人各不相同", desc: "每个人的年柱由其阴阳历出生年份决定。本例虽为庚金与午火，您自己的命盘将拥有专属的天干地支组合。" },
        ],
      },
      month: {
        badge: "先天命柱 · 月柱 (示例)",
        title: "月柱 (Month Pillar) —— 事业、格局与月令气候",
        stage: "对应人生阶段：17至32岁（青年求索与职场攀登期）",
        chars: "本例展示：壬水 / 午火 · 月令决定全盘气候节律",
        points: [
          { bold: "此柱代表的核心维度", desc: "主导职业赛道、作战方式、事业心志，以及与父母长辈、早期导师及职场权威的互动。" },
          { bold: "月令提纲（地支）", desc: "月柱地支是八字中极具分量的核心坐标。它反映出您出生时的季节（春夏秋冬），直接决定全盘能量是偏温热、寒凉、燥烈还是润泽。" },
          { bold: "在命盘推演中的作用", desc: "揭示何种工作环境最能激发您的天赋，以及如何将先天潜能高效转化为真实的社会价值与成就。" },
          { bold: "每个人各不相同", desc: "您的出生月份决定了您的季节气候，指示您最适合的发展舞台。" },
        ],
      },
      day: {
        badge: "先天命柱 · 日柱核心 (示例)",
        title: "日柱 (Day Pillar) —— 核心元神 (日主) 与夫妻宫",
        stage: "对应人生阶段：33至48岁（人生黄金壮年期）",
        chars: "本例展示：辛金 / 亥水 · 注意：并非每个人的日主都是辛金！",
        points: [
          { bold: "日主元神（天干）", desc: "日柱上方天干是整张八字的终极坐标——代表“您自己”（最本真的性格底色、核心价值观与思维方式）。" },
          { bold: "重要：每个人代表不同五行", desc: "并不是每个人都是辛金！在八字系统中共有10种天干元神，涵盖木、火、土、金、水五大行。本例恰好是辛金（珠宝之金），而您的命盘可能是苍天栋梁（甲木）、汪洋江海（壬水）、普照暖阳（丙火）或厚重山川（戊土）。" },
          { bold: "夫妻宫（地支）", desc: "日柱下方地支代表您的私密心理圣殿、内在安全感，以及与终身伴侣或最亲密伙伴的互动模式。" },
          { bold: "在命盘推演中的作用", desc: "全盘其余七个字以及所有后天大运，皆以日主为圆心，推断它们对您的核心能量是滋养、雕琢还是消耗。" },
        ],
      },
      hour: {
        badge: "先天命柱 · 时柱 (示例)",
        title: "时柱 (Hour Pillar) —— 归宿、创造成果与抱负",
        stage: "对应人生阶段：49岁及以后（人生下半场与后代传承）",
        chars: "本例展示：甲木 / 午火 · 依据真太阳时出生时刻推算",
        points: [
          { bold: "此柱代表的核心维度", desc: "代表个人自主创办的产品、创造发明、深层抱负，以及与子女晚辈、核心团队或门生学徒的缘分。" },
          { bold: "人生下半场的写照", desc: "主导49岁以后的生命阶段，揭示岁月沉淀后的成果、晚年归宿与长期复利。" },
          { bold: "在命盘推演中的作用", desc: "年柱主外，时柱主内。时柱展现卸下一切外界社会身份后，您最渴望留给世界的持久成果。" },
          { bold: "每个人各不相同", desc: "依据您出生的精准真太阳时推算，补齐四柱八字的最终拼图。" },
        ],
      },
    },
  };

  const luckData = {
    en: [
      {
        badge: "10-YEAR LUCK PILLAR · 大运示例 (8–17)",
        title: "Ages 8–17 (Sample Decade 1) — Early Chapter",
        stage: "Life Chapter: Formative Years & Schooling",
        chars: "Sample Stem: 癸 (Water) · Sample Branch: 未 (Earth)",
        points: [
          { bold: "What Luck Cycles Represent", desc: "While your 4 natal pillars remain constant throughout life, you travel through different 10-year chapters that introduce changing environmental conditions." },
          { bold: "How to Read This Period", desc: "The interaction between this decade's elements and the birth chart reveals whether early schooling felt smooth and supported, or required early adaptability." },
          { bold: "Different for Everyone", desc: "In BaZi, the exact age you start your first luck cycle (such as 2, 5, or 8) is mathematically calculated from your birth date." },
        ],
      },
      {
        badge: "10-YEAR LUCK PILLAR · 大运示例 (18–27)",
        title: "Ages 18–27 (Sample Decade 2) — Entering the World",
        stage: "Life Chapter: Young Adulthood & Vocational Launch",
        chars: "Sample Stem: 甲 (Wood) · Sample Branch: 申 (Metal)",
        points: [
          { bold: "What Luck Cycles Represent", desc: "As you step into independence, new elemental influences test your adaptability and shape your career trajectory." },
          { bold: "How to Read This Period", desc: "Shows whether external circumstances push you toward bold exploration, structured training, or trial-and-error discovery." },
          { bold: "Different for Everyone", desc: "Your own chart will encounter its own sequence of elements, creating your personal rhythm of growth." },
        ],
      },
      {
        badge: "10-YEAR LUCK PILLAR · 大运示例 (28–37) ★ ACTIVE SAMPLE",
        title: "Ages 28–37 (Sample Decade 3) — Active Cycle Example",
        stage: "Life Chapter: Current Active Macro Weather (Example)",
        chars: "Sample Stem: 乙 (Wood) · Sample Branch: 酉 (Metal)",
        points: [
          { bold: "Reading the Active Cycle", desc: "In a reading, this is the current 'road condition' you are traveling on. It shows whether you have tailwinds that accelerate your goals, or uphill terrain that asks for patient strategy." },
          { bold: "Stem vs. Branch Timing", desc: "The top character (Heavenly Stem) influences the first 5 years and visible external events. The bottom character (Earthly Branch) influences the second 5 years and internal foundation." },
          { bold: "Remember: Sample Elements Only", desc: "In this sample, the active cycle features Wood over Metal. In your personal reading, your current 10-year cycle will have completely different elements based on your own birth moment." },
        ],
      },
      {
        badge: "10-YEAR LUCK PILLAR · 大运示例 (38–47)",
        title: "Ages 38–47 (Sample Decade 4) — Mid-Career & Mastery",
        stage: "Life Chapter: Maturity & Prime Responsibility",
        chars: "Sample Stem: 丙 (Fire) · Sample Branch: 戌 (Earth)",
        points: [
          { bold: "What This Chapter Represents", desc: "The mid-life decade where personal mastery deepens, professional identity solidifies, and family or community roles peak." },
          { bold: "How to Read This Period", desc: "Shows how shifting macro conditions impact your leadership bandwidth, financial priorities, and long-term security." },
          { bold: "Different for Everyone", desc: "The elements that arrive in your prime decades will interact uniquely with your personal Day Master." },
        ],
      },
      {
        badge: "10-YEAR LUCK PILLAR · 大运示例 (48–57)",
        title: "Ages 48–57 (Sample Decade 5) — Synthesis & Mentorship",
        stage: "Life Chapter: Transition to Mentorship & Wisdom",
        chars: "Sample Stem: 丁 (Fire) · Sample Branch: 亥 (Water)",
        points: [
          { bold: "What This Chapter Represents", desc: "A period often marked by sharing knowledge, guiding younger generations, and enjoying the compounded fruits of earlier hard work." },
          { bold: "How to Read This Period", desc: "Examines how life's pace transitions toward advisory roles, spiritual reflection, and health balance." },
          { bold: "Different for Everyone", desc: "Your personal luck chart will map out these later chapters according to your unique natal balance." },
        ],
      },
      {
        badge: "10-YEAR LUCK PILLAR · 大运示例 (58–67)",
        title: "Ages 58–67 (Sample Decade 6) — Stewardship & Legacy",
        stage: "Life Chapter: Long-term Stewardship & Serenity",
        chars: "Sample Stem: 戊 (Earth) · Sample Branch: 子 (Water)",
        points: [
          { bold: "What This Chapter Represents", desc: "Focuses on lasting peace of mind, family harmony, health preservation, and legacy stewardship." },
          { bold: "How to Read This Period", desc: "Shows how external conditions support retirement, philosophical contemplation, and family grounding." },
          { bold: "Different for Everyone", desc: "Every life has its own autumn and winter seasons, shaped by your own chart's elemental path." },
        ],
      },
    ],
    zh: [
      {
        badge: "后天大运柱 · 大运示例 (8–17岁)",
        title: "8–17岁（大运示例一）—— 启蒙与筑基",
        stage: "十年生命章节：青少年求学求知期",
        chars: "示例天干：癸水 · 示例地支：未土",
        points: [
          { bold: "大运在推演中的含义", desc: "先天四柱命盘终生不变，而十年大运则每十年切换一次，代表外部环境五行气运的更迭。" },
          { bold: "如何推演本阶段", desc: "观察这十年中的干支能量与原局八字产生何种生克共振，反映求学环境是否顺遂、早期家庭是否有搬迁或变动。" },
          { bold: "每个人各不相同", desc: "在八字中，每个人起大运的精准岁数（如2岁、5岁或8岁）各不相同，完全由出生时刻的天文历法推算。" },
        ],
      },
      {
        badge: "后天大运柱 · 大运示例 (18–27岁)",
        title: "18–27岁（大运示例二）—— 踏入社会与探索",
        stage: "十年生命章节：青年独立与职业起步",
        chars: "示例天干：甲木 · 示例地支：申金",
        points: [
          { bold: "大运在推演中的含义", desc: "步入独立生活后，新的五行能量进入您的生命场域，检验您的应变能力并塑造初步职业方向。" },
          { bold: "如何推演本阶段", desc: "揭示外部大势是推着您大胆开拓、接受系统培训，还是在反复试错中找寻定位。" },
          { bold: "每个人各不相同", desc: "您自己的大运将拥有独特的发展流转，形成专属于您的成长节律。" },
        ],
      },
      {
        badge: "后天大运柱 · 大运示例 (28–37岁) ★ 当前示例",
        title: "28–37岁（大运示例三）—— 当前行运示例",
        stage: "十年生命章节：当前外部宏观时空环境（示例）",
        chars: "示例天干：乙木 · 示例地支：酉金",
        points: [
          { bold: "如何推演当前大运", desc: "在命理咨询中，这是推演当前“外部路况”的关键。它指示您眼前是拥有顺风顺水的加速契机，还是需要沉潜耐心的爬坡阶段。" },
          { bold: "天干与地支的时效", desc: "天干（上方）主要主导前五年的外部机遇与显性事件；地支（下方）主要主导后五年的深层环境与扎根底气。" },
          { bold: "牢记：这仅是示例文盘", desc: "在此示例中，当前大运恰为木与金。在您个人的真实命盘中，当前十年大运将完全由您自己的生辰八字生成。" },
        ],
      },
      {
        badge: "后天大运柱 · 大运示例 (38–47岁)",
        title: "38–47岁（大运示例四）—— 盛年成熟与担当",
        stage: "十年生命章节：壮年担当与格局深化",
        chars: "示例天干：丙火 · 示例地支：戌土",
        points: [
          { bold: "本阶段的核心含义", desc: "人生的黄金成熟期，个人能力与见识趋于圆融，在家庭、事业与社会中的责任最为关键。" },
          { bold: "如何推演本阶段", desc: "大运环境的变化直接影响决策心力、财富积累方式与长远资产安全。" },
          { bold: "每个人各不相同", desc: "壮年时期到来的五行能量，将与您专属的日主产生独特的化学反应。" },
        ],
      },
      {
        badge: "后天大运柱 · 大运示例 (48–57岁)",
        title: "48–57岁（大运示例五）—— 智慧传承与融通",
        stage: "十年生命章节：向导师与智慧沉淀过渡",
        chars: "示例天干：丁火 · 示例地支：亥水",
        points: [
          { bold: "本阶段的核心含义", desc: "从一线拼杀逐步转向知识传授、培育后进，享受过往辛勤耕耘所带来的复利成果。" },
          { bold: "如何推演本阶段", desc: "评估生活节奏是否转向咨询指导、精神追求与身心平衡。" },
          { bold: "每个人各不相同", desc: "您的大运图谱将根据您的先天五行喜忌，规划出属于您的秋收画卷。" },
        ],
      },
      {
        badge: "后天大运柱 · 大运示例 (58–67岁)",
        title: "58–67岁（大运示例六）—— 守成掌舵与从容",
        stage: "十年生命章节：长久守护与从容圆满",
        chars: "示例天干：戊土 · 示例地支：子水",
        points: [
          { bold: "本阶段的核心含义", desc: "重心聚焦于长期内心宁静、家庭和睦、身心颐养与生命成果的守护。" },
          { bold: "如何推演本阶段", desc: "展现外部大势如何支持退休安享、哲学思考与深厚的情感连接。" },
          { bold: "每个人各不相同", desc: "每个人的人生都有自己的春夏秋冬，由您独一无二的命理轨迹决定。" },
        ],
      },
    ],
  };

  const activeNatal = isZh
    ? natalData.zh[selected.key as keyof typeof natalData.zh]
    : natalData.en[selected.key as keyof typeof natalData.en];

  const activeLuck = isZh
    ? luckData.zh[Number(selected.key)]
    : luckData.en[Number(selected.key)];

  return (
    <section id="bazi-anatomy" className="relative site-container py-16 sm:py-24 2xl:py-32 overflow-x-clip">
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 blur-[130px] rounded-full" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <p className="eyebrow 2xl:text-sm">
          {isZh ? "命理架构与时空轨迹 · 四柱八字与十年大运" : "The Anatomy of a BaZi Chart · 四柱八字与十年大运"}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1]">
          <span>{isZh ? "先天命局为车，洞悉本性蓝图。" : "The blueprint of your nature."}</span>
          <br />
          <em className="gold italic">
            {isZh ? "后天大运为路，把握行事节律。" : "The road beneath your feet."}
          </em>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          {isZh
            ? "四柱八字构成您的先天认知基准与生命阶段；下方紧邻的十年大运柱，则生动揭示您在不同十年中所穿越的外部环境与宏观时节。"
            : "The Four Pillars represent your cognitive baseline and life stages. Directly beneath, your 10-Year Luck Cycle pillars reveal the environmental terrain and macro seasons you travel through."}
        </p>
      </div>

      {/* Main Grid */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Unified Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Beginner Educational Banner: This is an Example Chart */}
          <div className="p-4 sm:p-5 rounded-2xl bg-card border border-accent/30 text-muted-foreground leading-relaxed flex items-start gap-3.5 shadow-md">
            <span className="text-accent text-xl shrink-0 mt-0.5">💡</span>
            <div className="space-y-1.5">
              <p className="font-semibold text-foreground text-sm sm:text-base">
                {isZh ? "关于本图表的说明（示例文盘）：" : "Understanding This Example Chart:"}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isZh ? (
                  <>
                    此处的四柱八字与十年大运仅用于<strong>展示命盘结构</strong>。每个人的八字均由其具体的出生年、月、日、时独立计算。在本例中，日主核心恰为<strong>辛金</strong>，但每个人的五行代表各不相同（木、火、土、金、水共10种天干元神）。点击下方任意柱位，了解其在命理推演中所代表的人生维度。
                  </>
                ) : (
                  <>
                    The chart shown below is an <strong>illustrative example</strong> to demonstrate how a BaZi chart works. Every person's chart is calculated from their own unique birth year, month, day, and time. In this example, the Day Master happens to be <strong>Xin Metal</strong>, but everyone is represented by different elements across Wood, Fire, Earth, Metal, or Water. Click any pillar below to see what it represents in a reading.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* 1. Natal Four Pillars Card */}
          <div className="rounded-2xl 2xl:rounded-3xl bg-card border border-border p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-foreground">
                  {isZh ? "示例命盘 · 先天四柱八字" : "Example Natal Chart · Four Pillars"}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-accent/15 text-accent border border-accent/30 font-medium">
                  {isZh ? "结构示例" : "Example"}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground font-mono">
                {isZh ? "先天认知基准" : "Cognitive Baseline"}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {/* Hour */}
              <button
                type="button"
                onClick={() => setSelected({ type: "natal", key: "hour" })}
                className={`flex flex-col items-center p-2 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                  selected.type === "natal" && selected.key === "hour"
                    ? "border-accent bg-accent/10 shadow-[0_0_12px_rgba(223,183,108,0.2)]"
                    : "border-border bg-background/50 hover:border-accent/40"
                }`}
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-2 font-mono font-medium">
                  {isZh ? "时柱 Hour" : "HOUR 时柱"}
                </span>
                <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl text-wood mb-2 shadow-sm font-medium">
                  甲
                </div>
                <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl text-fire shadow-sm font-medium">
                  午
                </div>
                <span className="mt-2 text-[10px] sm:text-xs text-muted-foreground text-center font-medium leading-tight flex flex-col items-center">
                  <span>{isZh ? "49岁后" : "Ages 49+"}</span>
                  <span>{isZh ? "归宿晚景" : "Legacy"}</span>
                </span>
              </button>

              {/* Day (★ Day Master) */}
              <button
                type="button"
                onClick={() => setSelected({ type: "natal", key: "day" })}
                className={`flex flex-col items-center p-2 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                  selected.type === "natal" && selected.key === "day"
                    ? "border-accent bg-accent/15 shadow-[0_0_16px_rgba(223,183,108,0.25)] ring-1 ring-accent"
                    : "border-border bg-background/50 hover:border-accent/40"
                }`}
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-accent mb-2 font-mono font-bold">
                  {isZh ? "日柱 Day ★" : "DAY 日柱 ★"}
                </span>
                <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-card border-2 border-accent flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl text-metal mb-2 shadow-sm font-medium relative">
                  辛
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent ring-2 ring-background" />
                </div>
                <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl text-water shadow-sm font-medium">
                  亥
                </div>
                <span className="mt-2 text-[10px] sm:text-xs text-accent text-center font-semibold leading-tight flex flex-col items-center">
                  <span>{isZh ? "33–48岁" : "Ages 33–48"}</span>
                  <span>{isZh ? "真我元神" : "Self"}</span>
                </span>
              </button>

              {/* Month */}
              <button
                type="button"
                onClick={() => setSelected({ type: "natal", key: "month" })}
                className={`flex flex-col items-center p-2 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                  selected.type === "natal" && selected.key === "month"
                    ? "border-accent bg-accent/10 shadow-[0_0_12px_rgba(223,183,108,0.2)]"
                    : "border-border bg-background/50 hover:border-accent/40"
                }`}
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-2 font-mono font-medium">
                  {isZh ? "月柱 Month" : "MONTH 月柱"}
                </span>
                <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl text-water mb-2 shadow-sm font-medium">
                  壬
                </div>
                <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl text-fire shadow-sm font-medium">
                  午
                </div>
                <span className="mt-2 text-[10px] sm:text-xs text-muted-foreground text-center font-medium leading-tight flex flex-col items-center">
                  <span>{isZh ? "17–32岁" : "Ages 17–32"}</span>
                  <span>{isZh ? "职场格局" : "Career"}</span>
                </span>
              </button>

              {/* Year (Roots) */}
              <button
                type="button"
                onClick={() => setSelected({ type: "natal", key: "year" })}
                className={`flex flex-col items-center p-2 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                  selected.type === "natal" && selected.key === "year"
                    ? "border-accent bg-accent/10 shadow-[0_0_12px_rgba(223,183,108,0.2)]"
                    : "border-border bg-background/50 hover:border-accent/40"
                }`}
              >
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground mb-2 font-mono font-medium">
                  {isZh ? "年柱 Year" : "YEAR 年柱"}
                </span>
                <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl text-metal mb-2 shadow-sm font-medium">
                  庚
                </div>
                <div className="w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-3xl sm:text-4xl md:text-5xl text-fire shadow-sm font-medium">
                  午
                </div>
                <span className="mt-2 text-[10px] sm:text-xs text-muted-foreground text-center font-medium leading-tight flex flex-col items-center">
                  <span>{isZh ? "0–16岁" : "Ages 0–16"}</span>
                  <span>{isZh ? "根基祖业" : "Roots"}</span>
                </span>
              </button>
            </div>
          </div>

          {/* 2. 10-Year Luck Cycles Pillars (Directly Beneath) */}
          <div className="rounded-2xl 2xl:rounded-3xl bg-card border border-border p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-water" />
                <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-foreground">
                  {isZh ? "示例十年大运 (10-Year Cycles)" : "Example 10-Year Luck Cycles"}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-water/15 text-water border border-water/30 font-medium">
                  {isZh ? "大运流转" : "Sample Path"}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground font-mono">
                {isZh ? "外部宏观时节" : "Environmental Terrain"}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {isZh
                ? "大运代表不同人生十年的外部环境。本例展示了一个人从8岁起运的流转示例。天干与地支各具独立五行能量："
                : "Luck cycles show shifting external weather across 10-year chapters. This example shows a sample progression starting at age 8. Heavenly Stems and Earthly Branches carry distinct elemental energies:"}
            </p>

            {/* 6 Decade Pillars in horizontal grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5 overflow-x-auto pb-1">
              {[
                { age: "8–17", s: "癸", sElem: "text-water", b: "未", bElem: "text-earth", tagEn: "Foundation", tagZh: "求知筑基" },
                { age: "18–27", s: "甲", sElem: "text-wood", b: "申", bElem: "text-metal", tagEn: "Ventures", tagZh: "创业开拓" },
                { age: "28–37 ★", s: "乙", sElem: "text-wood", b: "酉", bElem: "text-metal", tagEn: "Current", tagZh: "精准破局", isCurrent: true },
                { age: "38–47", s: "丙", sElem: "text-fire", b: "戌", bElem: "text-earth", tagEn: "Authority", tagZh: "威望鼎盛" },
                { age: "48–57", s: "丁", sElem: "text-fire", b: "亥", bElem: "text-water", tagEn: "Legacy", tagZh: "传承布道" },
                { age: "58–67", s: "戊", sElem: "text-earth", b: "子", bElem: "text-water", tagEn: "Stewardship", tagZh: "守成掌舵" },
              ].map((cycle, idx) => (
                <button
                  key={cycle.age}
                  type="button"
                  onClick={() => setSelected({ type: "luck", key: idx })}
                  className={`flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer ${
                    selected.type === "luck" && selected.key === idx
                      ? "border-accent bg-accent/15 shadow-[0_0_12px_rgba(223,183,108,0.25)] ring-1 ring-accent"
                      : cycle.isCurrent
                      ? "border-accent/70 bg-accent/10"
                      : "border-border bg-background/50 hover:border-accent/40"
                  }`}
                >
                  <span className={`text-[10px] sm:text-xs font-mono mb-1.5 font-semibold ${cycle.isCurrent ? "text-accent font-bold" : "text-muted-foreground"}`}>
                    {cycle.age}
                  </span>
                  <div className={`w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-2xl sm:text-3xl md:text-3xl ${cycle.sElem} mb-1.5 shadow-sm font-medium`}>
                    {cycle.s}
                  </div>
                  <div className={`w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl bg-card border border-border flex items-center justify-center font-serif text-2xl sm:text-3xl md:text-3xl ${cycle.bElem} shadow-sm font-medium`}>
                    {cycle.b}
                  </div>
                  <span className={`mt-2 text-[10px] sm:text-xs text-center truncate max-w-full font-medium ${cycle.isCurrent ? "text-accent font-bold" : "text-muted-foreground"}`}>
                    {isZh ? cycle.tagZh : cycle.tagEn}
                  </span>
                </button>
              ))}
            </div>

            {/* Element Legend */}
            <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-muted-foreground gap-2 border-t border-border/50">
              <span>{isZh ? "五行颜色图例：" : "Element Colors:"}</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-wood" />
                  Wood {isZh ? "木" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-fire" />
                  Fire {isZh ? "火" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-earth" />
                  Earth {isZh ? "土" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-metal" />
                  Metal {isZh ? "金" : ""}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-water" />
                  Water {isZh ? "水" : ""}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Component Inspector Card */}
        <div className="lg:col-span-5 bg-card border border-border rounded-2xl 2xl:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl lg:sticky lg:top-24 space-y-6 lg:space-y-7">
          {selected.type === "natal" && activeNatal && (
            <>
              <div className="border-b border-border/60 pb-5 space-y-1.5">
                <span className="inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-accent/15 text-accent border border-accent/30">
                  {activeNatal.badge}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[30px] font-light text-foreground mt-2 leading-snug">
                  {activeNatal.title}
                </h3>
                <p className="text-sm sm:text-base text-accent font-mono font-medium pt-0.5">{activeNatal.stage}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-mono pt-1">{activeNatal.chars}</p>
              </div>

              <div className="space-y-4 pt-1">
                <p className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-mono font-semibold">
                  {isZh ? "此柱对应的人生核心维度：" : "WHAT THIS PILLAR REPRESENTS:"}
                </p>
                <ul className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {activeNatal.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent font-bold shrink-0 mt-1 text-base">•</span>
                      <span>
                        <strong className="text-foreground font-medium text-sm sm:text-base">{pt.bold}:</strong>{" "}
                        {pt.desc}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 sm:p-5 rounded-xl bg-background/50 border border-border text-xs sm:text-sm text-foreground space-y-1.5 mt-6">
                  <p className="font-semibold text-accent font-mono text-xs sm:text-sm uppercase tracking-wider">
                    {isZh ? "命盘推演要诀：" : "BaZi Interpretation Principle:"}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {isZh
                      ? "八字不可孤立看单一一柱。日主是核心坐标，年、月、时三柱与后天大运均以此为参照，共同构成完整、立体的生命图景。"
                      : "A single pillar is never read in isolation. The Day Master is your central anchor, and all remaining pillars alongside your 10-year luck cycles are analyzed together to reveal your true elemental balance."}
                  </p>
                </div>
              </div>
            </>
          )}

          {selected.type === "luck" && activeLuck && (
            <>
              <div className="border-b border-border/60 pb-5 space-y-1.5">
                <span className="inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-water/20 text-water border border-water/40">
                  {activeLuck.badge}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-[30px] font-light text-foreground mt-2 leading-snug">
                  {activeLuck.title}
                </h3>
                <p className="text-sm sm:text-base text-accent font-mono font-medium pt-0.5">{activeLuck.stage}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-mono pt-1">{activeLuck.chars}</p>
              </div>

              <div className="space-y-4 pt-1">
                <p className="text-xs sm:text-sm uppercase tracking-wider text-accent font-mono font-semibold">
                  {isZh ? "大运在命盘推演中的含义：" : "WHAT THIS LUCK CYCLE REPRESENTS:"}
                </p>
                <ul className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {activeLuck.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent font-bold shrink-0 mt-1 text-base">•</span>
                      <span>
                        <strong className="text-foreground font-medium text-sm sm:text-base">{pt.bold}:</strong>{" "}
                        {pt.desc}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 sm:p-5 rounded-xl bg-background/50 border border-border text-xs sm:text-sm text-foreground space-y-1.5 mt-6">
                  <p className="font-semibold text-accent font-mono text-xs sm:text-sm uppercase tracking-wider">
                    {isZh ? "关于个人大运的重要说明：" : "Important Note on Personal Cycles:"}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {isZh
                      ? "每个人起运的岁数（例如2岁、6岁或8岁）与大运干支走向皆由出生时刻决定。当您生成自己的命盘时，系统将精准呈现属于您的专属十年流转与五行走向。"
                      : "The age you begin your luck cycles and the progression of elements are calculated individually from your exact birth time. Your personalized chart will show your unique timing."}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Takeaway */}
      <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl 2xl:rounded-3xl border border-accent/25 bg-card/60 text-center space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-accent font-mono font-medium">
          {isZh ? "顺天应时 · 传统命理智慧" : "Classical Timing Wisdom · 顺天应时"}
        </p>
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-foreground max-w-2xl mx-auto">
          {isZh
            ? "八字如车，大运如路。"
            : "Your natal chart is your vehicle. The luck cycles are the road."}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {isZh
            ? "有人如跑车适于爆发，有人如越野车擅长长途跋涉。命盘揭示您天生的配置；大运则显示您当前是在穿行浓雾，还是驰骋在晴空之下。别把一时的动荡低潮误判为个人失败，更别在晴空万里时错失飞跃的良机。"
            : "Some people are sports cars built for quick bursts. Others are rugged trucks built for long journeys. Your chart shows how you were built. Your luck cycles show whether you're navigating fog or cruising in clear weather. Don’t mistake a turbulent season for failure, and don’t miss the moments meant for your biggest leaps."}
        </p>
      </div>
    </section>
  );
}
