import React from 'react';
import { useStore } from '../../../store/useStore';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Activity,
  ArrowUp,
  ArrowDown,
  BarChart2
} from 'lucide-react';

export default function AdminOverview() {
  const { isDarkMode } = useStore();

  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />
    },
    {
      title: 'Essays Checked',
      value: '45,678',
      change: '+8%',
      trend: 'up',
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: 'Revenue',
      value: '$15,890',
      change: '-3%',
      trend: 'down',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'AI Accuracy',
      value: '98.5%',
      change: '+0.5%',
      trend: 'up',
      icon: <Activity className="w-6 h-6" />
    }
  ];

  const alerts = [
    {
      title: 'High System Load',
      description: 'Server load has exceeded 80% capacity',
      type: 'warning'
    },
    {
      title: 'New Premium Users',
      description: '15 new premium subscriptions in the last hour',
      type: 'success'
    },
    {
      title: 'AI Model Update',
      description: 'New model version available for deployment',
      type: 'info'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Dashboard Overview
        </h1>
        <div className="flex items-center space-x-4">
          <select
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-200'
            } border`}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className={`px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}>
            <BarChart2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {stat.icon}
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm ${
                stat.trend === 'up'
                  ? isDarkMode
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-green-100 text-green-700'
                  : isDarkMode
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-red-100 text-red-700'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className={`text-2xl font-bold mb-1 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {stat.value}
            </div>
            <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          System Alerts
        </h2>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg flex items-start space-x-3 ${
                alert.type === 'warning'
                  ? isDarkMode
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-yellow-100 text-yellow-700'
                  : alert.type === 'success'
                    ? isDarkMode
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-green-100 text-green-700'
                    : isDarkMode
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-blue-100 text-blue-700'
              }`}
            >
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <div>
                <div className="font-medium">{alert.title}</div>
                <div className="text-sm opacity-80">{alert.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Chart Placeholder */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Activity Overview
          </h2>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
            }`} />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Essay Submissions
            </span>
            <div className={`w-3 h-3 rounded-full ${
              isDarkMode ? 'bg-green-400' : 'bg-green-500'
            }`} />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              New Users
            </span>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center">
          <TrendingUp className={`w-12 h-12 ${
            isDarkMode ? 'text-gray-700' : 'text-gray-300'
          }`} />
        </div>
      </div>
    </div>
  );
}