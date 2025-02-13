
export interface Essay {
  id: string;
  content: string;
  timeSpent?: number;
  score: {
    taskAchievement: number;
    coherenceAndCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
    overall: number;
  };
  feedback: {
    taskAchievement: string[];
    coherenceAndCohesion: string[];
    lexicalResource: string[];
    grammaticalRange: string[];
    general: string[];
  };
  analysis: {
    grammarErrors: Array<{
      text: string;
      suggestion: string;
      explanation: string;
    }>;
    vocabularyRepetition: Array<{
      word: string;
      count: number;
      suggestions: string[];
    }>;
    styleImprovements: Array<{
      original: string;
      improved: string;
      context: string;
    }>;
  };
  improvedVersion: string;
  createdAt: Date;
  userId?: string;
}
