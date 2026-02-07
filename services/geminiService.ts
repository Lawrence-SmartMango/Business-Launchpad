import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StartupIdea, RedTeamAnalysis, ExecutionPlan, Language, Region } from "../types";
import { SYSTEM_INSTRUCTION, BASE_PROMPT, RED_TEAM_PROMPT, EXECUTION_PLAN_PROMPT } from "../constants";

// Initialize Gemini
// CRITICAL: process.env.API_KEY is handled by the environment, do not hardcode.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const startupIdeaSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A catchy name for the startup" },
    painPoint: { type: Type.STRING, description: "Deep analysis of the community pain point" },
    solution: { type: Type.STRING, description: "The zero-seed AI-driven solution" },
    mvp: { type: Type.STRING, description: "Day 1 Minimum Viable Product strategy" },
    revenue: { type: Type.STRING, description: "Revenue model and unit economics path to profitability" },
    validation: { type: Type.STRING, description: "Market validation evidence and cultural trends" },
    scalability: { type: Type.STRING, description: "Logic for scaling to 7-digits via automation" },
  },
  required: ["title", "painPoint", "solution", "mvp", "revenue", "validation", "scalability"],
};

const executionPlanSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    ideaTitle: { type: Type.STRING },
    overview: { type: Type.STRING, description: "A 2-sentence pep talk for the founder." },
    phases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          phaseName: { type: Type.STRING, description: "e.g., Week 1: Setup & Traffic" },
          goal: { type: Type.STRING, description: "The specific metric to hit in this phase" },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                stepTitle: { type: Type.STRING },
                instruction: { type: Type.STRING, description: "Detailed, idiot-proof instruction" },
                toolsNeeded: { type: Type.STRING, description: "Free tools only (WeChat, CapCut, etc.)" },
                verificationTip: { type: Type.STRING, description: "Checklist to confirm the step is done correctly" },
              },
              required: ["stepTitle", "instruction", "toolsNeeded", "verificationTip"],
            },
          },
        },
        required: ["phaseName", "goal", "steps"],
      },
    },
  },
  required: ["ideaTitle", "overview", "phases"],
};

const getLanguageInstruction = (lang: Language) => {
  switch (lang) {
    case 'zh-HK': return "Output MUST be in Traditional Chinese (Hong Kong style).";
    case 'zh-CN': return "Output MUST be in Simplified Chinese.";
    default: return "Output MUST be in English.";
  }
};

const getRegionInstruction = (region: Region) => {
  switch (region) {
    case 'hk':
      return `\n**CRITICAL REGION CONTEXT: HONG KONG**\n- Focus STRICTLY on Hong Kong market dynamics.\n- Constraints: Extremely high rent (land scarcity), small living spaces, high disposable income but high stress, aging population, domestic helper ecosystem.\n- Key Platforms: WhatsApp, Instagram, Facebook, Carousell, Signal.\n- Cultural: Cantonese dominant, efficiency is king, skepticism of scams.`;
    case 'gba':
      return `\n**CRITICAL REGION CONTEXT: GREATER BAY AREA (GBA)**\n- Focus on the connectivity between Hong Kong, Shenzhen, Guangzhou, and Macau.\n- Trends: "Northbound Travel" (HKers spending in Shenzhen), cross-border elderly care, youth mobility, and policy integration.\n- Key Platforms: WeChat (Weixin), Xiaohongshu, Alipay, Octopus Card integration.\n- Cultural: Cantonese roots with Mainland tech speed.`;
    case 'china':
    default:
      return `\n**CRITICAL REGION CONTEXT: PAN-CHINA**\n- Scope includes Tier 1 cities (Beijing/Shanghai) down to "Xiachen" (sinking markets/rural).\n- Focus on broad social trends: Involution, Pingti, Silver Economy, and Rural Revitalization.\n- Key Platforms: WeChat, Douyin, Xiaohongshu, Pinduoduo.`;
  }
};

export const generateIdeas = async (language: Language, region: Region, focusArea?: string): Promise<StartupIdea[]> => {
  // Upgraded to Pro for better complex reasoning on market trends
  const model = "gemini-3-pro-preview";

  let prompt = BASE_PROMPT;
  prompt += getRegionInstruction(region);
  prompt += `\n\n**Language Requirement:** ${getLanguageInstruction(language)}`;
  
  if (focusArea && focusArea.trim() !== "") {
    prompt += `\n\n**Special Focus:** Please specifically prioritize opportunities related to: "${focusArea}" within the constraints.`;
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: startupIdeaSchema,
        },
        // Enable thinking for Pro model to ensure deep analysis of constraints
        thinkingConfig: { thinkingBudget: 2048 } 
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as StartupIdea[];
    }
    return [];
  } catch (error) {
    console.error("Error generating ideas:", error);
    throw error;
  }
};

export const redTeamIdea = async (idea: StartupIdea, language: Language, region: Region): Promise<RedTeamAnalysis> => {
  // Upgraded to Pro for better critical analysis
  const model = "gemini-3-pro-preview";

  let prompt = `${RED_TEAM_PROMPT}\n\n**Business Idea:** ${idea.title}\n**Solution:** ${idea.solution}\n**Target:** ${idea.painPoint}`;
  prompt += getRegionInstruction(region);
  prompt += `\n\n**Language Requirement:** ${getLanguageInstruction(language)}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are a critical business analyst specializing in risk assessment for Chinese markets.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideaTitle: { type: Type.STRING },
            critiques: { type: Type.ARRAY, items: { type: Type.STRING } },
            counterMeasures: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["ideaTitle", "critiques", "counterMeasures"],
        },
        thinkingConfig: { thinkingBudget: 2048 }
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as RedTeamAnalysis;
    }
    throw new Error("No response generated");
  } catch (error) {
    console.error("Error red teaming idea:", error);
    throw error;
  }
};

export const generateExecutionPlan = async (idea: StartupIdea, language: Language, region: Region): Promise<ExecutionPlan> => {
  const model = "gemini-3-pro-preview";

  let prompt = `${EXECUTION_PLAN_PROMPT}\n\n**Business Idea:** ${idea.title}\n**Solution:** ${idea.solution}\n**MVP:** ${idea.mvp}`;
  prompt += getRegionInstruction(region);
  prompt += `\n\n**Language Requirement:** ${getLanguageInstruction(language)}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: "You are an expert mentor for non-technical founders.",
        responseMimeType: "application/json",
        responseSchema: executionPlanSchema,
        thinkingConfig: { thinkingBudget: 4096 } // Higher budget for detailed step verification
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ExecutionPlan;
    }
    throw new Error("No response generated");
  } catch (error) {
    console.error("Error generating execution plan:", error);
    throw error;
  }
};