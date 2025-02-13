import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Settings, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { isDarkMode, user } = useStore();
  const navigate = useNavigate();

  const handleUpgradeToPremium = () => {
    navigate('/premium');
  };

  if (!user) {
    return (
      <div className={`text-center py-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <p className="text-xl">Please sign in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className={`p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center mb-8">
          <div className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <User className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          </div>
          <div className="ml-4">
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {user.name}
            </h1>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {user.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-4">
              <Crown className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Membership Status
              </h2>
            </div>
            <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {user.premium ? 'Premium Member' : 'Free Trial'}
            </p>
            {!user.premium && (
              <div className="mt-4">
                <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {3 - user.trialCount} trials remaining
                </p>
                <button
                  onClick={handleUpgradeToPremium}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-2 px-5 rounded-lg transform transition-all duration-200 hover:scale-105">
                  Upgrade to Premium
                </button>
              </div>
            )}
          </div>

          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-4">
              <Settings className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Settings
              </h2>
            </div>
            <button className={`w-full text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>
              Change Password
            </button>
            <button className={`w-full text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>
              Notification Settings
            </button>
            <button className={`w-full text-left py-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-blue-500`}>
              Privacy Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}