import React from 'react';
import { useStore } from '../store/useStore';
import { Award, BookOpen, Brain, Drama as Grammar, AlertCircle, ChevronRight, Sparkles } from 'lucide-react';
import DetailedFeedback from './analysis/DetailedFeedback';
import type { Essay } from '../types/essay';

interface ScoreCriteriaProps {
  title: string;
  score: number;
  feedback: string[];
  icon: React.ReactNode;
}

function ScoreCriteria({ title, score, feedback, icon }: ScoreCriteriaProps) {
  const { isDarkMode } = useStore();
  
  return (
    <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
        </div>
        <div className={`px-4 py-2 rounded-lg font-bold ${
          score >= 7 
            ? isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
            : score >= 6 
              ? isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
              : isDarkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {score.toFixed(1)}
        </div>
      </div>
      <ul className="space-y-2">
        {feedback.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <ChevronRight className={`w-4 h-4 mt-1 flex-shrink-0 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EssayAnalysis() {
  const { isDarkMode, currentEssay } = useStore();
  
  if (!currentEssay) return null;

  const { score, feedback, improvedVersion } = currentEssay;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-blue-200/40'}`}>
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
            isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Award className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Overall Band Score: {score.overall.toFixed(1)}
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {score.overall >= 7 
              ? 'Excellent work! Your writing demonstrates strong skills.'
              : score.overall >= 6 
                ? 'Good attempt! Here are some areas for improvement.'
                : 'Keep practicing! Focus on the suggested improvements.'}
          </p>
        </div>
      </div>

      {/* Detailed Feedback */}
      <DetailedFeedback />

      {/* Improved Version */}
      <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-blue-200/40'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Improved Version
          </h3>
          {!currentEssay.userId && (
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              isDarkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'
            }`}>
              <AlertCircle className={`w-4 h-4 ${
                isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
              }`} />
              <span className={`text-sm font-medium ${
                isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
              }`}>
                Upgrade to save improvements
              </span>
            </div>
          )}
        </div>
        <div className={`p-6 rounded-lg ${
          isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'
        }`}>
          <p className={`whitespace-pre-wrap ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {improvedVersion}
          </p>
        </div>
      </div>
    </div>
  );
}