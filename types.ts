export type Language = 'en' | 'zh-HK' | 'zh-CN';
export type Region = 'hk' | 'gba' | 'china';

export interface StartupIdea {
  title: string;
  painPoint: string;
  solution: string;
  mvp: string;
  revenue: string;
  validation: string;
  scalability: string;
}

export interface RedTeamAnalysis {
  ideaTitle: string;
  critiques: string[];
  counterMeasures: string[];
}

export interface ExecutionStep {
  stepTitle: string;
  instruction: string;
  toolsNeeded: string; // Specific free tools (e.g., "Use ChatGPT", "CapCut")
  verificationTip: string; // How to know you did it right
}

export interface ExecutionPhase {
  phaseName: string; // e.g., "Week 1: Setup"
  goal: string;
  steps: ExecutionStep[];
}

export interface ExecutionPlan {
  ideaTitle: string;
  overview: string;
  phases: ExecutionPhase[];
}

export interface GenerationRequest {
  focusArea: string;
}