import React from 'react';
import { useStore } from '../../store/useStore';
import { Diamond, Check, X } from 'lucide-react';
import PricingTable from './PricingTable';

export default function PremiumPage() {
  const { isDarkMode } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
          isDarkMode ? 'bg-amber-500/20' : 'bg-amber-100'
        }`}>
          <Diamond className={`w-10 h-10 ${
            isDarkMode ? 'text-amber-400' : 'text-amber-600'
          }`} />
        </div>
        <h1 className={`text-4xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Upgrade to Premium
        </h1>
        <p className={`text-xl max-w-2xl mx-auto ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Unlock advanced features and take your IELTS preparation to the next level
        </p>
      </div>

      {/* Pricing Table */}
      <PricingTable />

      {/* Features Grid */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="Advanced Grammar Check"
          description="Get detailed grammar analysis and suggestions for improvement"
        />
        <FeatureCard
          title="Vocabulary Enhancement"
          description="Receive context-aware vocabulary suggestions and synonyms"
        />
        <FeatureCard
          title="Unlimited Essays"
          description="Check as many essays as you want with no restrictions"
        />
        <FeatureCard
          title="Progress Tracking"
          description="Monitor your improvement with detailed analytics"
        />
        <FeatureCard
          title="Priority Support"
          description="Get faster responses from our support team"
        />
        <FeatureCard
          title="Essay History"
          description="Access your complete essay history and analysis"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  const { isDarkMode } = useStore();

  return (
    <div className={`p-6 rounded-xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-lg`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${
          isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
        }`}>
          <Check className={`w-5 h-5 ${
            isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
          }`} />
        </div>
        <h3 className={`text-lg font-semibold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
      </div>
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
}