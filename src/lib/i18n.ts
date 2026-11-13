export type Language = "en" | "zh";

const LANG_STORAGE_KEY = "sd-lang";

export interface StemTranslation {
  title: string;
  archetype: string;
  description: string;
}

export const STEM_TRANSLATIONS: Record<Language, Record<number, StemTranslation>> = {
  en: {
    0: {
      title: "The Pioneer",
      archetype: "The Visionary Oak",
      description:
        "Towering, direct, and principled. You build long-range monuments, set new paradigms, and lead by standing resolute in your values.",
    },
    1: {
      title: "The Diplomat",
      archetype: "The Resilient Vine",
      description:
        "Subtle, agile, and enduring. Like ivy scaling a fortress, you find indirect paths through complex obstacles and weave strategic alliances.",
    },
    2: {
      title: "The Luminary",
      archetype: "The Radiant Sun",
      description:
        "Warm, generous, and unmistakable. You naturally shine light across vast domains, bringing transparency, energy, and unshakeable optimism.",
    },
    3: {
      title: "The Illuminator",
      archetype: "The Guided Flame",
      description:
        "Focal, transformative, and intensely insightful. Like a laser or beacon in the night, you see micro-truths that others overlook.",
    },
    4: {
      title: "The Anchor",
      archetype: "The Sovereign Mountain",
      description:
        "Immovable, grounded, and trusted. You hold the collective weight, establish institutional trust, and provide unshakeable stability.",
    },
    5: {
      title: "The Cultivator",
      archetype: "The Fertile Soil",
      description:
        "Receptive, resourceful, and quietly transformative. You take raw ideas and human potential and cultivate them into thriving ecosystems.",
    },
    6: {
      title: "The Executor",
      archetype: "The Tempered Blade",
      description:
        "Sharp, relentless, and unyielding. You dismantle bloated systems, streamline operations, and forge order through disciplined execution.",
    },
    7: {
      title: "The Refiner",
      archetype: "The Polished Gem",
      description:
        "Exacting, brilliant, and attuned to nuance. You craft luxury, distill complexity into elegant simplicity, and command high perceived value.",
    },
    8: {
      title: "The Navigator",
      archetype: "The Boundless Ocean",
      description:
        "Expansive, dynamic, and unstoppable. You flow effortlessly around barriers, synthesize global trends, and operate on an international scale.",
    },
    9: {
      title: "The Strategist",
      archetype: "The Intuitive Cloud",
      description:
        "Deep, perceptive, and deeply strategic. You read implicit currents, anticipate second-order effects, and operate with quiet mastery.",
    },
  },
  zh: {
    0: {
      title: "开拓领袖",
      archetype: "参天栋梁",
      description:
        "顶天立地，高拔刚直，极具原则。善于开辟新赛道、确立高远蓝图，以坚如磐石的价值观凝聚众人信赖。",
    },
    1: {
      title: "谋略协调家",
      archetype: "柔韧藤萝",
      description:
        "灵动敏锐，坚韧不拔，深谙借力借势。如藤蔓攀越险阻，善于在错综复杂的环境中织就联盟、化险为夷。",
    },
    2: {
      title: "先驱照耀者",
      archetype: "普照艳阳",
      description:
        "热情大度，心怀博大，自带光芒。天然具备强烈的感染力与号召力，赋予宏观事业透彻的视野与蓬勃生机。",
    },
    3: {
      title: "洞见引路人",
      archetype: "烛照灵火",
      description:
        "专注深邃，洞若观火，敏锐细腻。犹如暗夜中的灯塔，善于察觉别人忽略的微小真相与本质规律。",
    },
    4: {
      title: "中流砥柱",
      archetype: "崇山峻岭",
      description:
        "稳如泰山，深受信赖，厚重从容。承载集体信任与基石，处变不惊，为身边的人提供持久恒定的安全感。",
    },
    5: {
      title: "生态孕育者",
      archetype: "沃土良田",
      description:
        "包容博纳，善于育人，润物无声。善于发掘每个人独特的潜能，将散乱的资源培育为充满活力的繁荣生态。",
    },
    6: {
      title: "果敢执行官",
      archetype: "淬火利剑",
      description:
        "刚毅果决，雷厉风行，不拖泥带水。善于打破繁冗陈规、梳理结构，以高度自律和强悍执行力铸就有序天地。",
    },
    7: {
      title: "琢玉美学家",
      archetype: "璀璨美玉",
      description:
        "精雕细琢，格调高雅，追求极致。对细节与审美有天生鉴赏力，善于化繁为简，创造出经得起推敲的高价值成果。",
    },
    8: {
      title: "大局领航员",
      archetype: "浩瀚江海",
      description:
        "气魄宏大，奔腾不息，势不可挡。善于顺势变通、驾驭宏观趋势，在广阔的大格局中自如运筹帷幄。",
    },
    9: {
      title: "沉潜智略家",
      archetype: "雨露甘霖",
      description:
        "灵性直觉，深谋远虑，大智若愚。善于体察隐性暗流、预判连锁反应，在润物无声中以智取胜。",
    },
  },
};

export const translations = {
  en: {
    nav: {
      howItWorks: "How it works",
      elements: "Elements",
      faq: "FAQ",
      blog: "Blog",
      tryItFree: "Try it free",
    },
    hero: {
      eyebrow: "Modern BaZi · Chinese astrology, made practical",
      title1: "Know your",
      title2: "nature.",
      title3: "Time your moves.",
      description:
        "Enter your birth date and get your personal profile in seconds — your strengths, your element balance, and the life seasons that shape when to act.",
      ctaApp: "Get the full app",
      ctaChart: "or see your chart first",
      subtext: "The free chart needs no sign-up · Secular · 2,500 years of classical astronomy",
    },
    chart: {
      freeBadge: "Free · takes 10 seconds",
      heading: "Find your Day Master",
      birthDateLabel: "Birth date",
      birthDatePlaceholder: "DD-MM-YYYY",
      openCalendar: "Open calendar",
      birthTimeLabel: "Birth time",
      birthTimeOptional: "(optional)",
      revealBtn: "Reveal",
      youAre: "You are",
      archetypePrefix: "Your Day Master:",
      eightCharacters: "Your eight characters",
      hour: "Hour",
      day: "Day",
      month: "Month",
      year: "Year",
      fiveElementsBalance: "Five elements balance",
      wantFullTitle: "Want the full reading?",
      wantFullDesc:
        "Your 10-year cycles, best timing windows and team compatibility are coming in the full app.",
    },
    steps: {
      eyebrow: "How it works",
      heading: "A personal operating manual, written at birth.",
      items: [
        {
          n: "01",
          t: "Enter your birth date",
          d: "Your birth moment maps to four pillars of classical Chinese astronomy — calculated precisely, no guesswork.",
        },
        {
          n: "02",
          t: "Meet your Day Master",
          d: "One of ten archetypes that describes how you naturally think, lead and recharge — in plain English.",
        },
        {
          n: "03",
          t: "Time your decisions",
          d: "See which 10-year season you're in, so you know when to build, when to push and when to rest.",
        },
      ],
    },
    elements: {
      eyebrow: "The five elements",
      heading: "Every chart is a unique balance — shaped by what is present, and what is missing.",
      items: [
        { k: "Wood", zh: "木", d: "Growth, vision, starting things" },
        { k: "Fire", zh: "火", d: "Visibility, energy, influence" },
        { k: "Earth", zh: "土", d: "Stability, trust, holding space" },
        { k: "Metal", zh: "金", d: "Precision, standards, decisions" },
        { k: "Water", zh: "水", d: "Insight, strategy, adaptability" },
      ],
    },
    purpose: {
      eyebrow: "Why this exists",
      heading: "Built on three convictions.",
      items: [
        {
          k: "Cycles",
          q: "Life moves in seasons. BaZi maps them, so you can tell a winter from a harvest — and stop pushing against the one you're actually in.",
        },
        {
          k: "Understanding",
          q: "It gives language to what you already sense: how you think, lead and recharge — until knowing yourself stops being vague.",
        },
        {
          k: "Alignment",
          q: "Introspection with a map. Look closely enough at your own nature and the choices get quieter — less friction, more alignment.",
        },
      ],
    },
    faq: {
      eyebrow: "Questions",
      items: [
        {
          q: "What is BaZi?",
          a: "BaZi (“Eight Characters”) is a 1,200-year-old Chinese system that turns the moment of your birth into four pairs of characters — the Four Pillars. It describes your natural strengths and the timing cycles of your life.",
        },
        {
          q: "Is this fortune-telling?",
          a: "No. Scripting Destiny is secular and practical. Your chart is a starting point, not a verdict — it helps you make deliberate choices instead of running on default.",
        },
        {
          q: "Do I need to know Chinese or astrology?",
          a: "Not at all. Every concept is translated into everyday language that is easy for modern users to understand.",
        },
        {
          q: "Why does birth time matter?",
          a: "It sets your Hour Pillar — your long-range vision and legacy. If you don't know it, leave the default; your Day Master stays the same.",
        },
      ],
    },
    waitlist: {
      heading: "The full app is",
      headingItalic: "coming soon.",
      description:
        "10-year cycle tracking, yearly timing guides and team compatibility. Free for early members.",
      inputPlaceholder: "you@email.com",
      submitBtn: "Join the waitlist",
      submittingBtn: "Reserving...",
      substackOptin: "Also send me occasional articles on timing & life cycles",
      substackTag: "(Substack)",
      inboxConfirmTitle: "Check your inbox to confirm",
      inboxConfirmDescPre: "We just sent a confirmation link to",
      inboxConfirmDescPost: "Click the button inside to lock in your spot.",
      badgeEarlyAccess: "Waitlist Early Access",
      badgeSubstack: "Substack Articles",
      orTryChart: "Or try your free chart first →",
      errorEmail: "Please enter a valid email address.",
      errorGeneric: "Unable to join waitlist. Please check your connection and try again.",
      privacyConsentPre: "By joining, you agree to our",
      termsOfService: "Terms of Service",
      andWord: "and",
      privacyConsentLink: "Privacy Policy",
    },
    footer: {
      copyright: "Scripting Destiny",
      surveyLink: "Life Clarity & Timing Survey",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      tagline: "Know your nature. Time your moves.",
    },
    confirmed: {
      backHome: "Back to home",
      badge: "Waitlist Confirmed",
      headline: "You're officially on the list.",
      description:
        "Your email is verified. When the full app opens, you will be among the first to receive access — with full 10-year cycle tracking and timing guides free for early members.",
      reservedBadge: "Early Access Reserved",
      priorityBadge: "Free Forever for Early Members",
      inquiryTitle: "Want to shape what we build first?",
      inquiryDesc:
        "Take our 3-minute Life Clarity & Timing Inquiry to help prioritize features for your Day Master.",
      inquiryBtn: "Take our Life Clarity & Timing Inquiry",
      surveyFooter: "Life Clarity Survey",
    },
    survey: {
      communityBadge: "Community Inquiry",
      headline: "Life Clarity & Timing",
      description:
        "Share your perspective on personal crossroads and help shape what we build next.",
      saving: "Saving your contact preferences…",
      saved: "Your preferences have been saved. We'll be in touch!",
      error:
        "Couldn't save your contact details — please email us directly if you'd like to be reached.",
      backHome: "Back to home",
      langPrompt: "Survey Language",
      langEn: "English",
      langZh: "中文 (Mandarin)",
    },
  },

  zh: {
    nav: {
      howItWorks: "运作原理",
      elements: "五行要素",
      faq: "常见问题",
      blog: "深度博客",
      tryItFree: "免费排盘",
    },
    hero: {
      eyebrow: "现代八字 · 实用东方命理学",
      title1: "洞悉",
      title2: "天性。",
      title3: "顺势而为。",
      description:
        "输入出生日期，数秒内解析您的个人八字格局 —— 发现天生优势、五行强弱分布与人生大运起伏，找准最佳决策时机。",
      ctaApp: "获取完整应用",
      ctaChart: "或先查看个人命盘",
      subtext: "免费排盘无需注册 · 科学理性 · 传承两千五百年天文学精髓",
    },
    chart: {
      freeBadge: "免费体验 · 仅需10秒",
      heading: "查找您的日主元神",
      birthDateLabel: "出生日期",
      birthDatePlaceholder: "日-月-年 (例如 18-08-1992)",
      openCalendar: "打开日历",
      birthTimeLabel: "出生时间",
      birthTimeOptional: "（可选）",
      revealBtn: "立即排盘",
      youAre: "您的日主格局",
      archetypePrefix: "元神天性：",
      eightCharacters: "您的生辰八字",
      hour: "时柱",
      day: "日柱",
      month: "月柱",
      year: "年柱",
      fiveElementsBalance: "五行能量强弱分布",
      wantFullTitle: "想要获取更深度的排盘与运势解析？",
      wantFullDesc: "十年大运周期、流年流月运势指南与团队八字合盘，即将在完整应用中上线。",
    },
    steps: {
      eyebrow: "运作原理",
      heading: "与生俱来的个人人生操作手册。",
      items: [
        {
          n: "01",
          t: "输入出生日期",
          d: "精准映射中国古天文学的四柱天干地支 —— 科学严谨计算，绝非模糊推测。",
        },
        {
          n: "02",
          t: "遇见您的日主元神",
          d: "十种天干人格原型之一，用通俗易懂的语言清晰勾勒您的思维脉络、领导风格与精力恢复之源。",
        },
        {
          n: "03",
          t: "顺应时机决策",
          d: "明晰您当前所处的十年大运阶段，知道何时深耕积蓄、何时乘势发力、何时放慢沉淀。",
        },
      ],
    },
    elements: {
      eyebrow: "五行要素",
      heading: "每个命盘都是独特的五行格局 —— 因相生相克而生动，因过旺或缺失而显个性。",
      items: [
        { k: "木", zh: "木", d: "生发、远见、开创新局" },
        { k: "火", zh: "火", d: "热忱、活力、绽放影响力" },
        { k: "土", zh: "土", d: "沉稳、信誉、包容托底" },
        { k: "金", zh: "金", d: "严谨、准则、果敢决断" },
        { k: "水", zh: "水", d: "智慧、谋略、变通适应" },
      ],
    },
    purpose: {
      eyebrow: "创办初心",
      heading: "源于三大核心理念。",
      items: [
        {
          k: "顺应周期",
          q: "人生自有四时更迭。八字如罗盘，帮您分辨何时是播种冬藏、何时是金秋丰收，不再逆势徒劳消耗。",
        },
        {
          k: "深度自知",
          q: "用具象语言诠释您隐约感知的天性：如何思考、如何领导、如何充电，让自我认知不再模糊空洞。",
        },
        {
          k: "知行顺势",
          q: "带地图的深度自省。透彻看清自身本质，纷扰的抉择就会变得宁静坚定 —— 减少内耗，走向顺势而为。",
        },
      ],
    },
    faq: {
      eyebrow: "常见问题",
      items: [
        {
          q: "什么是八字？",
          a: "八字（四柱八字）源自千年以上中国天文学与干支纪历体系，根据您的出生年、月、日、时排成四对干支。它描摹了您的天然优势与生命大运的周期节律。",
        },
        {
          q: "这是迷信算命吗？",
          a: "不是。Scripting Destiny 秉持理性、世俗与现代视角。命盘是认知自我与人生周期的起点，而非宿命判决 —— 它赋能您清醒自主地选择，告别随波逐流。",
        },
        {
          q: "我需要懂古代文言或玄学术语吗？",
          a: "完全不需要。所有命理精髓已转化为现代人一目了然的生活与职业语言。",
        },
        {
          q: "为什么出生时间很重要？",
          a: "出生时间决定时柱 —— 象征您的长远愿景、晚运格局与深层潜意识。若不清楚具体时辰，保留默认值即可，核心日主特质保持一致。",
        },
      ],
    },
    waitlist: {
      heading: "完整应用",
      headingItalic: "即将发布。",
      description: "十年大运深度追踪、流年运势指引与团队契合度排盘。早期预约用户终身免费。",
      inputPlaceholder: "your@email.com",
      submitBtn: "加入候补名单",
      submittingBtn: "正在预约...",
      substackOptin: "同时向我发送关于人生时机与生命周期的精选专栏",
      substackTag: "（Substack）",
      inboxConfirmTitle: "请查收邮件以确认预约",
      inboxConfirmDescPre: "我们刚刚向您的邮箱发送了确认链接：",
      inboxConfirmDescPost: "请点击邮件中的链接以锁定您的早期名额。",
      badgeEarlyAccess: "候补早期席位",
      badgeSubstack: "专栏精选文章",
      orTryChart: "或先查看您的免费命盘 →",
      errorEmail: "请输入有效的邮箱地址。",
      errorGeneric: "无法加入候补名单，请检查网络连接后重试。",
      privacyConsentPre: "加入即表示您同意我们的",
      termsOfService: "服务条款",
      andWord: "与",
      privacyConsentLink: "隐私政策",
    },
    footer: {
      copyright: "Scripting Destiny",
      surveyLink: "生命清晰度与时机洞察调研",
      privacyPolicy: "隐私政策",
      termsOfService: "服务条款",
      tagline: "洞悉天性 · 顺势而为",
    },
    confirmed: {
      backHome: "返回首页",
      badge: "候补已确认",
      headline: "您已正式加入席位名单。",
      description:
        "您的邮箱已验证成功。当完整应用上线时，您将第一时间获享访问权限 —— 包含十年大运周期追踪与流年指引，早期用户完全免费。",
      reservedBadge: "已锁定早期名额",
      priorityBadge: "早期用户永久免费",
      inquiryTitle: "想参与定制我们优先开发的功能吗？",
      inquiryDesc:
        "花3分钟参与我们的生命清晰度与时机调研，帮助我们针对您的日主格局优先定制核心体验。",
      inquiryBtn: "参与生命清晰度调研",
      surveyFooter: "生命清晰度问卷",
    },
    survey: {
      communityBadge: "社区共创调研",
      headline: "生命清晰度与时机研判",
      description:
        "分享您在关键十字路口的真实视角，与我们共同打造新一代时机研判工具。",
      saving: "正在保存您的联系偏好…",
      saved: "您的偏好已保存，我们会在第一时间与您联络！",
      error: "保存联系信息失败，如需联络请直接发送邮件给我们。",
      backHome: "返回首页",
      langPrompt: "问卷语言",
      langEn: "English (英文)",
      langZh: "中文 (Mandarin)",
    },
  },
};

export function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "zh") return urlLang;
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "en" || saved === "zh") return saved;
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("zh")) return "zh";
  } catch {
    // Ignore storage read error
  }
  return "en";
}

export function applyLanguage(lang: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Ignore storage write error
  }
  window.dispatchEvent(new CustomEvent("sd-lang-change", { detail: lang }));
}

export function getStemTranslation(stemIndex: number, lang: Language): StemTranslation {
  return STEM_TRANSLATIONS[lang][stemIndex] || STEM_TRANSLATIONS.en[stemIndex];
}
