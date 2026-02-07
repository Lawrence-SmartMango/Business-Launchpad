export const SYSTEM_INSTRUCTION = `You are a Lean Startup Specialist and Social Impact Strategist with a track record of launching "0-seed" (zero initial capital) businesses across Greater China (Tier 1 cities to sinking markets). You specialize in identifying "Hidden Frictions" in local communities and solving them using the Asset-Light AI Model.`;

export const BASE_PROMPT = `
**Objective:** Identify 5 startup opportunities that solve urgent community or people-centric problems in the China market (including HK, Tier 1 cities, or "Xiachen" sinking markets). These must be businesses that can be started by a solo founder or a 2-person team with **zero external funding**, achieving profitability within 3–6 months.

**Market Analysis Constraints (The "Why Now" - 2025 Context):**

1.  **Economic Reality: "Rational Consumption" & "Pingti" (平替):** 
    *   The market is experiencing a "consumption downgrade." Consumers are price-sensitive but quality-demanding. 
    *   *Constraint:* The idea must offer high value-for-money or replace a distinctive expensive service/product with a cheaper, "good enough" alternative.

2.  **Psychological Driver: "Emotional Value" (Qingxu Jiazhi - 情绪价值):**
    *   Due to "Involution" (Neijuan) and high societal pressure, consumers are paying for stress relief, companionship, metaphysics, novelty, or healing. 
    *   *Constraint:* Prioritize ideas that sell comfort, belonging, or anxiety reduction, not just functional utility.

3.  **Demographic Specifics: "Solo Economy" & "Active Silver":**
    *   **Solo Economy:** Target the growing single-person households (one-person meals, pets, solo travel, loneliness economy).
    *   **Silver Economy:** Focus on the tech-savvy elderly who have time and money but lack companionship or digital literacy.

4.  **Geo-political & Cultural Shift: "Domestic Reliance" & "Cultural Confidence":**
    *   **Supply Chain:** Focus on services that do not rely on imported software/goods that might be blocked. Use local platforms (WeChat/Douyin) exclusively.
    *   **Guochao (China Chic):** Consumers prefer brands that resonate with local culture over Western imports. 
    *   *Constraint:* The solution must feel natively Chinese, respecting local data privacy norms and cultural sentiments.

5.  **The "Red/Green" Strategy & AI Labor:**
    *   Leverage **Xiaohongshu (Little Red Book)** for organic traffic (focusing on aesthetics and community validation).
    *   Leverage **WeChat Private Domain** for high LTV retention.
    *   **Crucial:** The business *must* use AI tools (LLMs, Image Gen) to do the heavy lifting of content creation or service delivery, as the founder has 0 budget for staff.

**Constraints:**
- No hardware. No office rent. No manufacturing. 
- Must be "Service-as-a-Software" or "Community-as-a-Service."
- Must prioritize social impact/community well-being.
`;

export const RED_TEAM_PROMPT = `Act as a "Devil's Advocate" (Red Team) for the following business idea. Find 3 specific reasons why the Chinese market/consumers might reject the idea, and then provide 3 specific "Counter-Measures" to harden the business model.`;

export const EXECUTION_PLAN_PROMPT = `
You are a patient, expert Business Mentor creating a "Zero-to-One" Execution Guide.

**Target Audience:** A non-technical founder (e.g., a housewife or student) who has grit but NO coding skills and NO starting capital.
**Task:** Create a detailed, verified, step-by-step execution plan to turn the following idea into a revenue-generating business in 4 weeks.

**Strict Verification Rules (The "Reality Check"):**
1.  **No Coding:** Do not suggest "Build an App" or "Write Python". Suggest "Use WeChat Group", "Use Douyin", "Use Jianying", or "Use Notion".
2.  **No Cost:** Do not suggest paid ads. Focus on Organic Traffic (Xiaohongshu/Douyin) and Private Domain (WeChat).
3.  **Specifics:** Don't say "Market your product." Say "Post 3 notes on Xiaohongshu using these exact hashtags: #X #Y #Z."
4.  **Verification:** Before listing a step, verify internally: "Is this possible for a beginner with a smartphone?"

**Structure:**
- Break it down into 4 Phases (e.g., Setup, MVP Creation, First Traffic, First Sale).
- Each step must have a "Verification Tip" (How do I know I did it right?).
`;

export const TRANSLATIONS = {
  en: {
    appTitle: "Business Launchpad",
    subtitle: "Pan-China Edition",
    heroTitle: "Launch a Cash-Flow First Startup in China",
    heroDesc: "Identify hidden frictions, silver economy gaps, and asset-light opportunities across the Greater China region.",
    placeholder: "e.g. 'Shanghai Youth', 'Rural E-commerce', 'Silver Economy' (Optional)",
    generateBtn: "Generate Ideas",
    thinkingBtn: "Strategizing...",
    generatedTitle: "Generated Opportunities",
    painPoint: "Market Pain Point",
    solution: "The 0-Seed Solution",
    mvp: "Day 1 MVP",
    revenue: "Revenue Model",
    validation: "Why It Work Now",
    scalability: "Scalability",
    redTeamBtn: "Red Team Analysis",
    analyzingBtn: "Analyzing Risks...",
    redTeamTitle: "Devil's Advocate Analysis",
    critiqueFor: "Critique for",
    criticalRisks: "Critical Risks (Why it might fail)",
    counterMeasures: "Counter-Measures (How to fix it)",
    closeModal: "I Understand the Risks",
    assetLightTitle: "Asset-Light",
    assetLightDesc: "Models where AI is the employee and community is the office.",
    redGreenTitle: "Red/Green Strategy",
    redGreenDesc: "Organic traffic via Xiaohongshu, retention via WeChat Private Domains.",
    cashFlowTitle: "Cash-Flow First",
    cashFlowDesc: "Day 1 revenue via subscriptions or micro-transactions.",
    planBtn: "Step-by-Step Guide",
    planningBtn: "Drafting Plan...",
    planTitle: "Execution Masterclass",
    planFor: "Action Plan for",
    phase: "Phase",
    tool: "Tool",
    tip: "Validation Check",
    closePlan: "Close Guide",
    regionLabel: "Target Region",
    regionHK: "Hong Kong",
    regionGBA: "Greater Bay Area",
    regionChina: "Pan-China"
  },
  'zh-HK': {
    appTitle: "創業發射台",
    subtitle: "大中華區特別版",
    heroTitle: "在中國市場啟動現金流優先的初創企業",
    heroDesc: "發掘大中華區隱藏的痛點、銀髮經濟缺口和輕資產機會。無需風險投資。",
    placeholder: "例如：「上海青年」、「農村電商」、「銀髮經濟」（選填）",
    generateBtn: "生成創業點子",
    thinkingBtn: "策劃中...",
    generatedTitle: "生成的創業機會",
    painPoint: "市場痛點",
    solution: "零成本解決方案",
    mvp: "首日 MVP 策略",
    revenue: "營收模式",
    validation: "為何現在可行",
    scalability: "擴展性",
    redTeamBtn: "紅隊壓力測試",
    analyzingBtn: "風險分析中...",
    redTeamTitle: "魔鬼代言人分析",
    critiqueFor: "分析對象",
    criticalRisks: "關鍵風險 (為何會失敗)",
    counterMeasures: "應對措施 (如何解決)",
    closeModal: "我了解風險",
    assetLightTitle: "輕資產模式",
    assetLightDesc: "AI 是員工，社區是辦公室。",
    redGreenTitle: "紅/綠策略",
    redGreenDesc: "小紅書獲取自然流量，微信私域流量進行留存。",
    cashFlowTitle: "現金流優先",
    cashFlowDesc: "首日通過訂閱或微交易獲得收入。",
    planBtn: "一步步執行指南",
    planningBtn: "正在規劃...",
    planTitle: "執行大師班",
    planFor: "執行計劃：",
    phase: "階段",
    tool: "工具",
    tip: "驗證檢查",
    closePlan: "關閉指南",
    regionLabel: "目標市場",
    regionHK: "香港",
    regionGBA: "大灣區",
    regionChina: "全中國"
  },
  'zh-CN': {
    appTitle: "创业发射台",
    subtitle: "大中华区特别版",
    heroTitle: "在中国市场启动现金流优先的初创企业",
    heroDesc: "发掘大中华区隐藏的痛点、银发经济缺口和轻资产机会。无需风险投资。",
    placeholder: "例如：“上海青年”、“农村电商”、“银发经济”（选填）",
    generateBtn: "生成创业点子",
    thinkingBtn: "策划中...",
    generatedTitle: "生成的创业机会",
    painPoint: "市场痛点",
    solution: "零成本解决方案",
    mvp: "首日 MVP 策略",
    revenue: "营收模式",
    validation: "为何现在可行",
    scalability: "扩展性",
    redTeamBtn: "红队压力测试",
    analyzingBtn: "风险分析中...",
    redTeamTitle: "魔鬼代言人分析",
    critiqueFor: "分析对象",
    criticalRisks: "关键风险 (为何会失败)",
    counterMeasures: "应对措施 (如何解决)",
    closeModal: "我了解风险",
    assetLightTitle: "轻资产模式",
    assetLightDesc: "AI 是员工，社区是办公室。",
    redGreenTitle: "红/绿策略",
    redGreenDesc: "小红书获取自然流量，微信私域流量进行留存。",
    cashFlowTitle: "现金流优先",
    cashFlowDesc: "首日通过订阅或微交易获得收入。",
    planBtn: "一步步执行指南",
    planningBtn: "正在规划...",
    planTitle: "执行大师班",
    planFor: "执行计划：",
    phase: "阶段",
    tool: "工具",
    tip: "验证检查",
    closePlan: "关闭指南",
    regionLabel: "目标市场",
    regionHK: "香港",
    regionGBA: "大湾区",
    regionChina: "全中国"
  }
};