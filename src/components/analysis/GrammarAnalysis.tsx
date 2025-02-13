import React from 'react';
import { useStore } from '../../store/useStore';
import { AlertCircle, Check } from 'lucide-react';

interface GrammarAnalysisProps {
  errors: Array<{
    text: string;
    suggestion: string;
    explanation: string;
  }>;
}

export default function GrammarAnalysis({ errors }: GrammarAnalysisProps) {
  const { isDarkMode } = useStore();

  return (
    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-blue-200/40'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Grammar Check
        </h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
          errors.length === 0
            ? isDarkMode
              ? 'bg-green-500/20 text-green-300'
              : 'bg-green-100 text-green-700'
            : isDarkMode
              ? 'bg-yellow-500/20 text-yellow-300'
              : 'bg-yellow-100 text-yellow-700'
        }`}>
          {errors.length === 0 ? (
            <>
              <Check className="w-4 h-4" />
              <span>No errors found</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>{errors.length} {errors.length === 1 ? 'error' : 'errors'} found</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {errors.map((error, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                isDarkMode ? 'text-red-400' : 'text-red-500'
              }`} />
              <div className="flex-1">
                <div className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {error.text}
                </div>
                <div className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {error.explanation}
                </div>
                <button
                  className={`px-4 py-2 rounded-lg text-sm ${
                    isDarkMode
                      ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  Replace with: {error.suggestion}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}