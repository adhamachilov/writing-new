
export interface User {
  id: string;
  name: string;
  email: string;
  premium: boolean;
  isAdmin?: boolean;
  trialCount: number;
  essays: Array<{
    id: string;
    content: string;
    score: number;
    createdAt: Date;
  }>;
  referrals?: {
    name: string;
    joinDate: string;
  }[];
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
