import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

export default function SignInForm() {
  const { isDarkMode, login } = useStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(formData.email, formData.password);
    if (success) {
      navigate(formData.email === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={`max-w-md mx-auto p-8 rounded-xl shadow-lg ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Sign In
      </h2>

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
            Email or Username
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              placeholder="Enter your email or username"
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
              placeholder="Enter your password"
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

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-all duration-200 hover:scale-105"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}