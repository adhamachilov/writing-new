import React from 'react';
import { useStore } from '../store/useStore';
import { LineChart, History } from 'lucide-react';

export default function Dashboard() {
  const { isDarkMode, user } = useStore();

  if (!user) {
    return (
      <div className={`text-center py-12 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <p className="text-xl">Please sign in to view your dashboard</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Your Writing Progress
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <LineChart className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Score Trends
            </h2>
          </div>
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Score visualization will appear here
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center mb-4">
            <History className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Essays
            </h2>
          </div>
          {user.essays.length > 0 ? (
            <ul className="space-y-4">
              {user.essays.slice(0, 5).map((essay) => (
                <li
                  key={essay.id}
                  className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <p className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Score: {essay.score.overall}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {new Date(essay.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No essays checked yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}