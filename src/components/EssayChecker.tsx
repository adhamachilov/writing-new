import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import type { Essay } from '../types/essay';
import TopicAnalysis from './TopicAnalysis';
import EssayAnalysis from './EssayAnalysis';
import Timer from './Timer';
import { AlertTriangle, Check, Clock } from 'lucide-react';
import PremiumModal from './premium/PremiumModal';

export default function EssayChecker() {
  const [content, setContent] = useState('');
  const { 
    isDarkMode, 
    user, 
    setCurrentEssay, 
    currentEssay, 
    trialCount, 
    decrementTrialCount,
    timerSettings
  } = useStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [timeSpent, setTimeSpent] = useState<number | null>(null);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    if (!user?.premium && trialCount === 0) {
      setShowPremiumModal(true);
    }
  }, [trialCount, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isAnalyzing) return;

    if (!user && trialCount <= 0) {
      setShowPremiumModal(true);
      return;
    }

    setIsAnalyzing(true);

    // TODO: Implement API call to analyze essay
    setTimeout(() => {
      const mockEssay: Essay = {
        id: Date.now().toString(),
        content,
        timeSpent: timeSpent,
        score: {
          taskAchievement: 7,
          coherenceAndCohesion: 6.5,
          lexicalResource: 7,
          grammaticalRange: 6.5,
          overall: 6.75
        },
        feedback: {
          taskAchievement: [
            'Good overview of main trends',
            'Key features well highlighted',
            'Data accurately reported'
          ],
          coherenceAndCohesion: [
            'Consider using more cohesive devices',
            'Good paragraph organization',
            'Clear progression of ideas'
          ],
          lexicalResource: [
            'Good range of vocabulary',
            'Effective use of collocations',
            'Consider using more sophisticated terms'
          ],
          grammaticalRange: [
            'Some complex structures used effectively',
            'Good control of grammar',
            'Minor errors in article usage'
          ],
          general: ['Overall good attempt']
        },
        improvedVersion: content,
        createdAt: new Date(),
        userId: user?.id
      };
      setCurrentEssay(mockEssay);
      setIsAnalyzing(false);
      if (!user) {
        decrementTrialCount();
      }
    }, 2000);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setWordCount(newContent.trim().split(/\s+/).filter(Boolean).length);
  };

  const handleTimeUp = () => {
    if (content.trim()) {
      handleSubmit(new Event('submit') as any);
    }
  };

  return (
    <div className="space-y-6">
      <TopicAnalysis />
      
      <div className={`rounded-xl shadow-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-blue-200/40'
      }`}>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <h2 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Your Essay
                  </h2>
                  {wordCount > 0 && (
                    <div className={`flex items-center text-sm px-3 py-1 rounded-full ${
                      wordCount >= 150
                        ? isDarkMode 
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-green-100 text-green-700'
                        : isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {wordCount >= 150 ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Word count met
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {150 - wordCount} words needed
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowTimer(!showTimer)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                      isDarkMode
                        ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>{showTimer ? 'Hide Timer' : 'Show Timer'}</span>
                  </button>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Words: {wordCount}
                  </span>
                </div>
              </div>
              
              <div className={`relative rounded-xl border ${
                isDarkMode
                  ? 'bg-gray-700/50 border-gray-600'
                  : 'bg-white/90 border-blue-200'
              }`}>
                <textarea
                  id="essay"
                  rows={12}
                  className={`w-full p-4 rounded-xl ${
                    isDarkMode
                      ? 'bg-transparent text-white placeholder-gray-400'
                      : 'bg-transparent text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Paste or type your IELTS Writing Task 1 essay here..."
                  value={content}
                  onChange={handleContentChange}
                />
                
                {!content && (
                  <div className={`absolute inset-0 pointer-events-none flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-700/50' : 'bg-white/80'
                  }`}>
                    <div className={`text-center ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <p className="text-sm font-medium mb-1">Start writing or paste your text</p>
                      <p className="text-xs">Minimum 150 words required</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              {!user && (
                <div className={`flex items-center space-x-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span className="text-sm">Free trial:</span>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < trialCount
                            ? isDarkMode
                              ? 'bg-emerald-400'
                              : 'bg-emerald-500'
                            : isDarkMode
                              ? 'bg-gray-600'
                              : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">{trialCount} attempts left</span>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isAnalyzing || !content.trim() || wordCount < 150}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isAnalyzing || !content.trim() || wordCount < 150
                    ? 'bg-gray-400 cursor-not-allowed opacity-50'
                    : 'bg-emerald-500 hover:bg-emerald-600 shadow-lg hover:shadow-emerald-500/25'
                } text-white`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Check Essay'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {currentEssay && <EssayAnalysis />}
      {showTimer && <Timer onTimeUp={handleTimeUp} />}
      {showPremiumModal && (
        <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      )}
    </div>
  );
}