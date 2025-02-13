import React from 'react';
import { useStore } from '../../store/useStore';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface VocabularyAnalysisProps {
  repetitions: Array<{
    word: string;
    count: number;
    suggestions: string[];
  }>;
}

export default function VocabularyAnalysis({ repetitions }: VocabularyAnalysisProps) {
  const { isDarkMode } = useStore();

  return (
    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-blue-200/40'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Vocabulary Enhancement
      </h3>
      
      <div className="space-y-4">
        {repetitions.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`w-4 h-4 ${
                  item.count > 3
                    ? 'text-red-400'
                    : item.count > 2
                      ? 'text-yellow-400'
                      : 'text-blue-400'
                }`} />
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  "{item.word}"
                </span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  used {item.count} times
                </span>
              </div>
              <button className={`flex items-center space-x-1 text-sm ${
                isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}>
                <RefreshCw className="w-3 h-3" />
                <span>More suggestions</span>
              </button>
            </div>
            
            <div className="mt-3">
              <div className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Suggested alternatives:
              </div>
              <div className="flex flex-wrap gap-2">
                {item.suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode
                        ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}