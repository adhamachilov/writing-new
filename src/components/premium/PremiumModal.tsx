import React from 'react';
import { useStore } from '../../store/useStore';
import { Diamond, Check, X, ArrowRight } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const { isDarkMode } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`w-full max-w-2xl p-8 rounded-2xl shadow-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${
              isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <Diamond className={`w-8 h-8 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-1 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Upgrade to Premium
              </h2>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Take your IELTS preparation to the next level
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-gray-100 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className={`w-6 h-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Premium Features
            </h3>
            <ul className="space-y-3">
              {[
                'Unlimited essay checks',
                'Advanced grammar analysis',
                'Vocabulary enhancement',
                'Detailed feedback',
                'Progress tracking',
                'Sample essays library'
              ].map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className={`w-5 h-5 ${
                    isDarkMode ? 'text-green-400' : 'text-green-500'
                  }`} />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50'
          }`}>
            <div className="text-center mb-6">
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Special Offer
              </h3>
              <div className="mb-2">
                <span className={`text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  $1.99
                </span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  /month
                </span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                or save $4 with yearly billing
              </p>
            </div>
            
            <button className="w-full py-3 px-4 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all flex items-center justify-center space-x-2">
              <span>Get Premium Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className={`text-center text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          30-day money-back guarantee • Cancel anytime • Secure payment
        </div>
      </div>
    </div>
  );
}