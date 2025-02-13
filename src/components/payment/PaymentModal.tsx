import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { CreditCard, Shield, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const { isDarkMode } = useStore();
  const [selectedCurrency, setSelectedCurrency] = useState<'UZS' | 'USD'>('UZS');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'uzcard' | 'humo' | 'visa'>('uzcard');

  const prices = {
    USD: 19.99,
    UZS: 249000,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`w-full max-w-lg p-6 rounded-xl shadow-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Upgrade to Premium
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg hover:bg-gray-100 ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </button>
        </div>

        {/* Currency Selection */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Select Currency
          </label>
          <div className="grid grid-cols-2 gap-4">
            {(['UZS', 'USD'] as const).map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCurrency === currency
                    ? isDarkMode
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-500 bg-blue-50'
                    : isDarkMode
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`text-lg font-bold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currency === 'UZS' ? '249,000 UZS' : '$19.99'}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {currency === 'UZS' ? 'Uzbekistan Som' : 'US Dollar'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-4">
            {([
              { id: 'uzcard', name: 'Uzcard' },
              { id: 'humo', name: 'Humo' },
              { id: 'visa', name: 'Visa' },
            ] as const).map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPaymentMethod === method.id
                    ? isDarkMode
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-blue-500 bg-blue-50'
                    : isDarkMode
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className={`w-6 h-6 mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`} />
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {method.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Card Details Form */}
        <form className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className={`w-full p-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className={`w-full p-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                CVC
              </label>
              <input
                type="text"
                placeholder="123"
                className={`w-full p-3 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>
        </form>

        {/* Security Note */}
        <div className={`flex items-center space-x-2 mb-6 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <Shield className="w-4 h-4" />
          <span className="text-sm">Your payment information is secure and encrypted</span>
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-4 px-6 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
        >
          Pay {selectedCurrency === 'UZS' ? '249,000 UZS' : '$19.99'}
        </button>
      </div>
    </div>
  );
}