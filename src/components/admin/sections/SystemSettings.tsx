import React from 'react';
import { useStore } from '../../../store/useStore';
import {
  Settings2,
  Bell,
  Shield,
  Mail,
  Globe,
  Database,
  Save,
  AlertTriangle
} from 'lucide-react';

interface SystemSettingsProps {
  section: string;
}

export default function SystemSettings({ section }: SystemSettingsProps) {
  const { isDarkMode } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          System Settings
        </h1>
        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2">
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* General Settings */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          General Settings
        </h2>
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Platform Name
            </label>
            <input
              type="text"
              defaultValue="IELTS Writing Checker"
              className={`w-full px-4 py-2 rounded-lg border ${
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
              Support Email
            </label>
            <input
              type="email"
              defaultValue="support@example.com"
              className={`w-full px-4 py-2 rounded-lg border ${
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
              Default Language
            </label>
            <select
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      {/* AI Configuration */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          AI Configuration
        </h2>
        <div className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Model Version
            </label>
            <select
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="v1">Version 1.0</option>
              <option value="v2">Version 2.0</option>
              <option value="v3">Version 3.0 (Beta)</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Response Time Threshold
            </label>
            <input
              type="number"
              defaultValue="5000"
              className={`w-full px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <p className={`mt-1 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Maximum response time in milliseconds
            </p>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Security Settings
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Two-Factor Authentication
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Require 2FA for all admin accounts
              </p>
            </div>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`font-medium ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                IP Whitelist
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Restrict admin access to specific IPs
              </p>
            </div>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1`} />
            </button>
          </div>
        </div>
      </div>

      {/* Backup & Maintenance */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Backup & Maintenance
        </h2>
        <div className="space-y-4">
          <button className={`w-full px-4 py-3 rounded-lg flex items-center justify-center space-x-2 ${
            isDarkMode
              ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}>
            <Database className="w-5 h-5" />
            <span>Create Backup</span>
          </button>
          <button className={`w-full px-4 py-3 rounded-lg flex items-center justify-center space-x-2 ${
            isDarkMode
              ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
              : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}>
            <AlertTriangle className="w-5 h-5" />
            <span>Clear Cache</span>
          </button>
        </div>
      </div>
    </div>
  );
}