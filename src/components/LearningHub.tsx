import React from 'react';
import { useStore } from '../store/useStore';
import { 
  BookOpen, 
  Play, 
  FileText, 
  Award, 
  Clock,
  CheckCircle,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearningHub() {
  const { isDarkMode, user } = useStore();

  const lessons = [
    {
      title: "Understanding IELTS Writing Task 1",
      duration: "15 mins",
      description: "Learn the basics of IELTS Writing Task 1 and what examiners look for.",
      locked: false
    },
    {
      title: "Graph and Chart Analysis",
      duration: "20 mins",
      description: "Master the art of analyzing different types of graphs and charts.",
      locked: false
    },
    {
      title: "Key Language for Trends",
      duration: "25 mins",
      description: "Essential vocabulary and phrases for describing trends.",
      locked: !user?.premium
    },
    {
      title: "Advanced Data Comparison",
      duration: "30 mins",
      description: "Advanced techniques for comparing multiple data sets.",
      locked: !user?.premium
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
          isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
        }`}>
          <BookOpen className={`w-10 h-10 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </div>
        <h1 className={`text-3xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Learning Hub
        </h1>
        <p className={`text-xl max-w-2xl mx-auto ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Master IELTS Writing Task 1 with our comprehensive lessons
        </p>
      </div>

      {/* Progress Section */}
      <div className={`p-6 rounded-xl mb-8 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Your Progress
          </h2>
          <div className={`px-4 py-2 rounded-lg ${
            isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
          }`}>
            2/8 Lessons Completed
          </div>
        </div>
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{ width: '25%' }} />
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {lessons.map((lesson, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg relative overflow-hidden`}
          >
            {lesson.locked && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-white mb-2 mx-auto" />
                  <p className="text-white font-medium">Premium Content</p>
                  <Link
                    to="/premium"
                    className="mt-2 inline-block px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    Upgrade to Access
                  </Link>
                </div>
              </div>
            )}
            
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {lesson.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {lesson.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{lesson.duration}</span>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                isDarkMode
                  ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}>
                <Play className="w-4 h-4" />
                <span>Start Lesson</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}