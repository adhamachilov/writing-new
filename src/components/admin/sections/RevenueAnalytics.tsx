import React from 'react';
import { useStore } from '../../../store/useStore';
import {
  DollarSign,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  Calendar,
  Download
} from 'lucide-react';

interface RevenueAnalyticsProps {
  section: string;
}

export default function RevenueAnalytics({ section }: RevenueAnalyticsProps) {
  const { isDarkMode } = useStore();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$15,890',
      change: '+12%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'Premium Users',
      value: '1,234',
      change: '+8%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'Average Order',
      value: '$19.99',
      change: '-3%',
      trend: 'down',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      change: '+0.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Revenue Analytics
        </h1>
        <div className="flex items-center space-x-4">
          <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            <Calendar className="w-5 h-5" />
            <span>Last 30 Days</span>
          </button>
          <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            <Download className="w-5 h-5" />
            <span>Export</span>
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

      {/* Revenue Chart */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Revenue Overview
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
              }`} />
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Subscriptions
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                isDarkMode ? 'bg-green-400' : 'bg-green-500'
              }`} />
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                One-time Purchases
              </span>
            </div>
          </div>
        </div>
        <div className="h-80 flex items-center justify-center">
          <TrendingUp className={`w-12 h-12 ${
            isDarkMode ? 'text-gray-700' : 'text-gray-300'
          }`} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={`rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg overflow-hidden`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Transactions
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {[1, 2, 3].map((_, index) => (
                <tr key={index}>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    #TRX-{String(index + 1).padStart(4, '0')}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    John Doe
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    $19.99
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isDarkMode
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      Subscription
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isDarkMode
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      Completed
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}>
                    2024-02-20
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}