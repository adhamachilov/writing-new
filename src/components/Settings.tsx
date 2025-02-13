import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Bell, Moon, Sun, Globe, Lock, Shield, Trash2, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const { isDarkMode, toggleDarkMode, user } = useStore();
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: true,
    security: true
  });

  if (!user) {
    return (
      <div className={`text-center py-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <p className="text-xl">Please sign in to access settings</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Settings
      </h1>

      <div className="space-y-6">
        {/* Appearance */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-blue-400" />
              ) : (
                <Sun className="w-5 h-5 text-blue-600" />
              )}
              <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                Dark Mode
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        {/* Language */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Language
          </h2>
          <div className="flex items-center space-x-4">
            <Globe className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300'
              } border`}
            >
              <option value="en">English</option>
              <option value="uz">O'zbek</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', icon: <Bell className="w-5 h-5" /> },
              { key: 'push', label: 'Push Notifications', icon: <Bell className="w-5 h-5" /> },
              { key: 'updates', label: 'Product Updates', icon: <Bell className="w-5 h-5" /> },
              { key: 'security', label: 'Security Alerts', icon: <Shield className="w-5 h-5" /> }
            ].map(({ key, label, icon }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                    {icon}
                  </span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    {label}
                  </span>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({
                    ...prev,
                    [key]: !prev[key as keyof typeof notifications]
                  }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    notifications[key as keyof typeof notifications]
                      ? 'bg-blue-600'
                      : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    notifications[key as keyof typeof notifications]
                      ? 'translate-x-6'
                      : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Security */}
        <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Privacy & Security
          </h2>
          <div className="space-y-4">
            <button className={`w-full flex items-center justify-between p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center space-x-3">
                <Lock className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Change Password
                </span>
              </div>
            </button>
            <button className={`w-full flex items-center justify-between p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center space-x-3">
                <Shield className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                  Two-Factor Authentication
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`p-6 rounded-xl border-2 ${
          isDarkMode
            ? 'bg-gray-800 border-red-500/20'
            : 'bg-white border-red-200'
        }`}>
          <div className="flex items-center space-x-3 mb-6">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Danger Zone
            </h2>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <Trash2 className="w-5 h-5" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}