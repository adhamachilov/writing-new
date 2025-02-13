import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  BookOpen, 
  Brain, 
  Sparkles, 
  AlertCircle,
  Check,
  BarChart2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
  Link as LinkIcon,
  BookMarked,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

interface FeedbackSection {
  title: string;
  icon: React.ReactNode;
  score: number;
  items: Array<{
    text: string;
    suggestion?: string;
    explanation?: string;
    examples?: string[];
    severity: 'error' | 'warning' | 'success' | 'info';
  }>;
}

export default function DetailedFeedback() {
  const { isDarkMode, currentEssay } = useStore();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'task-achievement': true,
    'coherence': true,
    'lexical': true,
    'grammar': true
  });

  if (!currentEssay) return null;

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const feedbackSections: FeedbackSection[] = [
    {
      title: 'Task Achievement',
      icon: <Target className="w-5 h-5" />,
      score: 7.0,
      items: [
        {
          text: 'Overview Statement',
          explanation: 'Your essay includes a clear overview that effectively summarizes the main trends.',
          examples: [
            'The graph shows a clear upward trend in smartphone usage from 2010 to 2020.',
            'Overall, there was a significant increase in mobile device adoption over the decade.'
          ],
          severity: 'success'
        },
        {
          text: 'Key Features Coverage',
          explanation: 'All major data points and trends are addressed.',
          severity: 'success'
        },
        {
          text: 'Data Accuracy',
          explanation: 'Some minor inaccuracies in numerical data presentation.',
          suggestion: 'Double-check the exact figures when describing peak values.',
          severity: 'warning'
        }
      ]
    },
    {
      title: 'Coherence & Cohesion',
      icon: <LinkIcon className="w-5 h-5" />,
      score: 6.5,
      items: [
        {
          text: 'Paragraph Organization',
          explanation: 'Clear logical progression between paragraphs.',
          severity: 'success'
        },
        {
          text: 'Linking Devices',
          explanation: 'Limited use of cohesive devices makes the text less fluid.',
          suggestion: 'Consider using more linking words like "furthermore," "however," and "consequently."',
          examples: [
            'Original: "The number increased. The rate slowed down."',
            'Improved: "While the number increased initially, the rate subsequently slowed down."'
          ],
          severity: 'warning'
        },
        {
          text: 'Referencing',
          explanation: 'Some unclear pronoun references could confuse the reader.',
          suggestion: 'Use specific nouns instead of pronouns when the reference might be ambiguous.',
          severity: 'error'
        }
      ]
    },
    {
      title: 'Lexical Resource',
      icon: <BookMarked className="w-5 h-5" />,
      score: 7.0,
      items: [
        {
          text: 'Vocabulary Range',
          explanation: 'Good use of topic-specific vocabulary.',
          examples: [
            'Effective: "substantial increase," "gradual decline," "peaked at"',
            'Consider: "surged," "plummeted," "plateaued"'
          ],
          severity: 'success'
        },
        {
          text: 'Word Choice Accuracy',
          explanation: 'Some word choices could be more precise.',
          suggestion: 'Use more specific terms for describing trends.',
          severity: 'warning'
        },
        {
          text: 'Collocations',
          explanation: 'Good use of natural word combinations.',
          examples: [
            'Effective: "sharp increase," "steady decline"',
            'Avoid: "big increase," "fast decline"'
          ],
          severity: 'success'
        }
      ]
    },
    {
      title: 'Grammatical Range & Accuracy',
      icon: <MessageSquare className="w-5 h-5" />,
      score: 6.5,
      items: [
        {
          text: 'Sentence Structures',
          explanation: 'Mix of simple and complex sentences, but could use more variety.',
          suggestion: 'Try incorporating more complex structures with relative clauses.',
          examples: [
            'Simple: "The graph shows an increase in 2010."',
            'Complex: "The graph, which covers a ten-year period, shows a significant increase starting from 2010."'
          ],
          severity: 'warning'
        },
        {
          text: 'Tense Usage',
          explanation: 'Consistent use of appropriate tenses.',
          severity: 'success'
        },
        {
          text: 'Error Frequency',
          explanation: 'Some minor grammatical errors present.',
          suggestion: 'Review subject-verb agreement and article usage.',
          severity: 'warning'
        }
      ]
    }
  ];

  return (
    <div className={`space-y-6 p-6 rounded-xl ${
      isDarkMode ? 'bg-gray-800' : 'bg-blue-200/40'
    }`}>
      {/* Overall Score */}
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Detailed Analysis
        </h2>
        <div className={`px-4 py-2 rounded-xl ${
          currentEssay.score.overall >= 7
            ? isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700'
            : currentEssay.score.overall >= 6
              ? isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
              : isDarkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'
        }`}>
          <div className="text-sm font-medium mb-1">Overall Band Score</div>
          <div className="text-2xl font-bold text-center">
            {currentEssay.score.overall.toFixed(1)}
          </div>
        </div>
      </div>

      {/* AI Analysis Summary */}
      <div className={`p-4 rounded-xl mb-8 ${
        isDarkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50'
      }`}>
        <div className="flex items-center space-x-2 mb-4">
          <Zap className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            AI-Powered Analysis
          </h3>
        </div>
        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Our advanced AI has analyzed your essay using IELTS Task 1 criteria. Here's a summary of key findings:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Strengths
              </span>
            </div>
            <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Clear overview statement</li>
              <li>• Good data coverage</li>
              <li>• Appropriate vocabulary usage</li>
            </ul>
          </div>
          <div className={`p-3 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Areas for Improvement
              </span>
            </div>
            <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• Use more cohesive devices</li>
              <li>• Vary sentence structures</li>
              <li>• Enhance data accuracy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="space-y-4">
        {feedbackSections.map((section, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'
            }`}
          >
            <button
              onClick={() => toggleSection(`section-${index}`)}
              className="w-full p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-100'
                }`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h3>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Band {section.score.toFixed(1)}
                  </div>
                </div>
              </div>
              {expandedSections[`section-${index}`] ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {expandedSections[`section-${index}`] && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {item.severity === 'error' ? (
                            <AlertCircle className="w-5 h-5 text-red-500" />
                          ) : item.severity === 'warning' ? (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          ) : item.severity === 'success' ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.text}
                          </p>
                          {item.explanation && (
                            <p className={`mt-1 text-sm ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {item.explanation}
                            </p>
                          )}
                          {item.examples && (
                            <div className="mt-3 space-y-2">
                              {item.examples.map((example, exIndex) => (
                                <div
                                  key={exIndex}
                                  className={`text-sm p-2 rounded-lg ${
                                    isDarkMode
                                      ? 'bg-gray-700 text-gray-300'
                                      : 'bg-white text-gray-600'
                                  }`}
                                >
                                  {example}
                                </div>
                              ))}
                            </div>
                          )}
                          {item.suggestion && (
                            <div className="mt-3">
                              <button className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                                isDarkMode
                                  ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              }`}>
                                <ArrowRight className="w-4 h-4" />
                                <span>{item.suggestion}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Technology Explanation */}
      <div className={`mt-8 p-4 rounded-lg ${
        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
      }`}>
        <div className="flex items-center space-x-3 mb-4">
          <BarChart2 className={`w-5 h-5 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <h3 className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How We Analyze Your Essay
          </h3>
        </div>
        <div className={`text-sm space-y-3 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>Our AI-powered system uses advanced Natural Language Processing to analyze your essay:</p>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Grammar and structure analysis using advanced NLP models</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Task achievement evaluation based on IELTS criteria</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Vocabulary assessment using academic word lists</span>
            </li>
            <li className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Coherence analysis through deep learning models</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}