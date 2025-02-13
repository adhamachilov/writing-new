export interface User {
  // ... existing user properties ...
  referrals?: {
    name: string;
    joinDate: string;
  }[];
}
