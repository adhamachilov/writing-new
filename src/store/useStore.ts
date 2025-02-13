import { create } from 'zustand';
import type { Essay, User, Subscription } from '../types/essay';

interface AdminSettings {
  pricing: {
    monthlyPrice: number;
    yearlyPrice: number;
    yearlyDiscount: number;
  };
  referral: {
    requiredInvites: number;
    rewardDurationWeeks: number;
  };
  trial: {
    duration: number;
    essayLimit: number;
  };
  discountCodes: Array<{
    code: string;
    percentage: number;
    expiryDate: Date;
  }>;
}

interface ReferralReward {
  userId: string;
  startDate: Date;
  endDate: Date;
}

interface User {
  id: string;
  role: string;
  // ... other user properties
}

interface Store {
  isAuthenticated: boolean;
  user: User | null;
  currentEssay: Essay | null;
  isDarkMode: boolean;
  trialCount: number;
  isAdmin: boolean;
  timerSettings: {
    enabled: boolean;
    duration: number;
  };
  adminSettings: AdminSettings;
  essayTimer: {
    startTime: number | null;
    duration: number | null;
  };
  referralRewards: ReferralReward[];
  setUser: (user: User | null) => void;
  setCurrentEssay: (essay: Essay | null) => void;
  toggleDarkMode: () => void;
  decrementTrialCount: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  startEssayTimer: () => void;
  stopEssayTimer: () => number;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
  generateReferralLink: (userId: string) => string;
  applyDiscountCode: (code: string) => number | null;
  addReferral: (userId: string, referrerId: string) => void;
  checkReferralEligibility: (userId: string) => boolean;
  activateReferralReward: (userId: string) => void;
}

const defaultAdminSettings: AdminSettings = {
  pricing: {
    monthlyPrice: 1.99,
    yearlyPrice: 20,
    yearlyDiscount: 4, // $24 - $20 = $4 discount
  },
  referral: {
    requiredInvites: 10,
    rewardDurationWeeks: 2,
  },
  trial: {
    duration: 30, // days
    essayLimit: 3,
  },
  discountCodes: [],
};

export const useStore = create<Store>((set, get) => ({
  isAuthenticated: false,
  user: null,
  currentEssay: null,
  isDarkMode: false,
  trialCount: 3,
  isAdmin: false,
  timerSettings: {
    enabled: true,
    duration: 60,
  },
  adminSettings: defaultAdminSettings,
  essayTimer: {
    startTime: null,
    duration: null,
  },
  referralRewards: [],

  setUser: (user) => set({ user }),
  setCurrentEssay: (essay) => set({ currentEssay: essay }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  decrementTrialCount: () => set((state) => {
    const newCount = Math.max(0, state.trialCount - 1);
    if (newCount === 0 && !state.user?.premium) {
      // Trigger premium upgrade modal
      // Implementation will be added in UI components
    }
    return { trialCount: newCount };
  }),

  startEssayTimer: () => {
    const { timerSettings } = get();
    set({
      essayTimer: {
        startTime: Date.now(),
        duration: timerSettings.duration * 60 * 1000,
      },
    });
  },

  stopEssayTimer: () => {
    const { essayTimer } = get();
    const timeSpent = essayTimer.startTime ? (Date.now() - essayTimer.startTime) / 1000 : 0;
    set({ essayTimer: { startTime: null, duration: null } });
    return timeSpent;
  },

  updateAdminSettings: (settings) => {
    set((state) => ({
      adminSettings: {
        ...state.adminSettings,
        ...settings,
      },
    }));
  },

  generateReferralLink: (userId) => {
    return `https://ieltschecker.com/refer/${userId}`;
  },

  applyDiscountCode: (code) => {
    const { adminSettings } = get();
    const discountCode = adminSettings.discountCodes.find(
      (dc) => dc.code === code && dc.expiryDate > new Date()
    );
    return discountCode?.percentage || null;
  },

  login: async (email, password) => {
    // Admin login check
    if (email === 'admin' && password === 'Adma1004') {
      set({ 
        user: {
          id: 'admin',
          email: 'admin',
          name: 'Administrator',
          premium: true,
          trialCount: 0,
          essays: [],
          preferences: {
            theme: 'light',
            language: 'en',
            notifications: true
          },
          stats: {
            totalEssays: 0,
            averageScore: 0,
            improvementRate: 0,
            lastActive: new Date()
          }
        },
        isAdmin: true 
      });
      return true;
    }

    // Regular user login simulation
    if (email && password.length >= 6) {
      set({
        user: {
          id: 'user-' + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          premium: false,
          trialCount: 3,
          essays: [],
          preferences: {
            theme: 'light',
            language: 'en',
            notifications: true
          },
          stats: {
            totalEssays: 0,
            averageScore: 0,
            improvementRate: 0,
            lastActive: new Date()
          }
        },
        isAdmin: false
      });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ 
      user: null, 
      isAdmin: false,
      currentEssay: null,
      trialCount: 3
    });
  },

  addReferral: (userId, referrerId) => {
    const { users } = get();
    const referrer = users.find(u => u.id === referrerId);
    
    if (referrer) {
      const updatedReferrer = {
        ...referrer,
        referrals: [...(referrer.referrals || []), userId]
      };

      if (updatedReferrer.referrals.length >= get().adminSettings.referral.requiredInvites) {
        get().activateReferralReward(referrerId);
      }

      set(state => ({
        users: state.users.map(u => 
          u.id === referrerId ? updatedReferrer : u
        )
      }));
    }
  },

  checkReferralEligibility: (userId) => {
    const { referralRewards } = get();
    const now = new Date();
    return !referralRewards.some(reward => 
      reward.userId === userId && reward.endDate > now
    );
  },

  activateReferralReward: (userId) => {
    const { adminSettings } = get();
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + (adminSettings.referral.rewardDurationWeeks * 7));

    set(state => ({
      referralRewards: [
        ...state.referralRewards,
        { userId, startDate, endDate }
      ]
    }));
  }
}));