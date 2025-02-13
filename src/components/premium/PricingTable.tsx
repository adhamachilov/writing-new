import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Check, Diamond, X } from 'lucide-react';

export default function PricingTable() {
  const { isDarkMode } = useStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [discountCode, setDiscountCode] = useState('');
  const [discountMessage, setDiscountMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        '3 essays per month',
        'Basic grammar check',
        'Limited vocabulary suggestions',
        'Standard feedback',
        'Email support'
      ],
      icon: <Diamond className="w-6 h-6 text-gray-400" />,
      popular: false
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? 1.99 : 19.99,
      features: [
        'Unlimited essays',
        'Advanced grammar analysis',
        'Vocabulary enhancement',
        'Detailed feedback',
        'Priority support',
        'Progress tracking',
        'Sample essays library',
        'Export reports'
      ],
      icon: <Diamond className="w-6 h-6 text-blue-500" />,
      popular: true,
      saveAmount: billingCycle === 'yearly' ? 4 : 0
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 4.99 : 49.99,
      features: [
        'Everything in Premium',
        'Custom branding',
        'Team management',
        'API access',
        'Dedicated support',
        'Training sessions',
        'Custom features',
        'SLA guarantee'
      ],
      icon: <Diamond className="w-6 h-6 text-purple-500" />,
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Billing Toggle */}
      <div className="flex justify-center items-center space-x-4 mb-8">
        <div className={`inline-flex p-1 rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              billingCycle === 'monthly'
                ? isDarkMode
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-600 shadow-sm'
                : isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              billingCycle === 'yearly'
                ? isDarkMode
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-blue-600 shadow-sm'
                : isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-600'
            }`}
          >
            Yearly
          </button>
        </div>
        {billingCycle === 'yearly' && (
          <span className={`text-sm px-3 py-1 rounded-full ${
            isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
          }`}>
            Save up to $4!
          </span>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative p-8 rounded-2xl transition-all ${
              plan.popular
                ? isDarkMode
                  ? 'bg-blue-500/10 border-2 border-blue-500/20'
                  : 'bg-blue-50 border-2 border-blue-200'
                : isDarkMode
                  ? 'bg-gray-800'
                  : 'bg-white'
            } ${plan.popular ? 'scale-105 shadow-xl' : 'shadow-lg'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className={`px-4 py-1 rounded-full text-sm font-medium ${
                  isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  Most Popular
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <div className="mt-2">
                  <span className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  )}
                </div>
              </div>
              {plan.icon}
            </div>

            {plan.saveAmount > 0 && (
              <div className={`mb-4 p-2 rounded-lg text-sm ${
                isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
              }`}>
                Save ${plan.saveAmount} with yearly billing
              </div>
            )}

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className={`w-5 h-5 mt-0.5 ${
                    plan.popular
                      ? 'text-blue-500'
                      : isDarkMode
                        ? 'text-gray-400'
                        : 'text-gray-500'
                  }`} />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                plan.popular
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {plan.price === 0 ? 'Get Started' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Discount Code Section */}
      <div className="max-w-md mx-auto">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className={`flex-1 p-3 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-200 text-gray-900'
            }`}
          />
          <button
            className={`px-6 rounded-xl font-medium ${
              isDarkMode
                ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}