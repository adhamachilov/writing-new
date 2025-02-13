import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Gift } from 'lucide-react';

export default function SignUpForm() {
  const { isDarkMode, signup, addReferral } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Get referral ID from URL parameters
  const queryParams = new URLSearchParams(location.search);
  const referrerId = queryParams.get('ref');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { user, success } = await signup({
        email: formData.email,
        password: formData.password,
        referrerId
      });

      if (success && user) {
        if (referrerId) {
          await addReferral(user.id, referrerId);
        }
        navigate('/dashboard');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 rounded-xl shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Create Account
      </h2>

      {referrerId && (
        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
          isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'
        }`}>
          <Gift className="w-5 h-5" />
          <span>Signing up with a referral - Get 2 weeks free when you invite 10 friends!</span>
        </div>
      )}

      {error && (
        <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
          isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-700'
        }`}>
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter your email"
              required
            />
            <Mail className={`absolute left-3 top-2.5 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full pl-10 pr-12 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Create a password"
              required
            />
            <Lock className={`absolute left-3 top-2.5 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5"
            >
              {showPassword ? (
                <EyeOff className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              ) : (
                <Eye className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`w-full pl-10 pr-12 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Confirm your password"
              required
            />
            <Lock className={`absolute left-3 top-2.5 w-5 h-5 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all duration-200 hover:scale-105"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}