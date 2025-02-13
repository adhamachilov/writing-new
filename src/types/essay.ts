export interface Essay {
  id: string;
  content: string;
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

export interface User {
  id: string;
  email: string;
  name: string;
  premium: boolean;
  trialCount: number;
  essays: Essay[];
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
  subscription?: {
    plan: 'free' | 'premium';
    startDate: Date;
    endDate: Date;
    status: 'active' | 'expired' | 'cancelled';
  };
  stats: {
    totalEssays: number;
    averageScore: number;
    improvementRate: number;
    lastActive: Date;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'uzcard' | 'humo' | 'visa';
  currency: 'UZS' | 'USD';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'premium';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  price: number;
  currency: 'UZS' | 'USD';
  paymentMethod: PaymentMethod;
  autoRenew: boolean;
}