import React, { useState } from 'react';
import { ImagePlus, BarChart as ChartBar, BookOpen, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function TopicAnalysis() {
  const { isDarkMode } = useStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [showTips, setShowTips] = useState(true);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`rounded-xl shadow-lg overflow-hidden ${
      isDarkMode ? 'bg-gray-800' : 'bg-blue-200/40'
    }`}>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Section */}
          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ChartBar className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Topic Image
                </h2>
              </div>
              {!selectedImage && (
                <span className={`text-xs px-3 py-1 rounded-full ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>
                  Required
                </span>
              )}
            </div>
            
            <div className={`border-2 border-dashed rounded-xl transition-all duration-200 ${
              isDarkMode 
                ? 'border-gray-600 hover:border-blue-400/50' 
                : 'border-blue-200 hover:border-blue-400'
            } ${selectedImage ? 'border-none p-0' : 'p-8'} ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'
            }`}>
              {selectedImage ? (
                <div className="relative group">
                  <img
                    src={selectedImage}
                    alt="Uploaded chart"
                    className="w-full rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 flex items-center justify-center shadow-lg"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <div className={`p-4 rounded-full mb-4 ${
                    isDarkMode ? 'bg-gray-600/50' : 'bg-blue-50'
                  }`}>
                    <ImagePlus className={`w-8 h-8 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-500'
                    }`} />
                  </div>
                  <span className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Upload your chart image
                  </span>
                  <span className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    PNG, JPG up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Topic Section */}
          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-white/90'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BookOpen className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Topic
                </h2>
              </div>
              {!topic && (
                <span className={`text-xs px-3 py-1 rounded-full ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>
                  Required
                </span>
              )}
            </div>
            
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a question (topic)..."
              className={`w-full h-[180px] p-4 rounded-xl border transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-blue-200 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            
            {showTips && (
              <div className={`mt-4 p-4 rounded-xl border ${
                isDarkMode 
                  ? 'bg-blue-500/10 border-blue-500/20' 
                  : 'bg-blue-50 border-blue-100'
              }`}>
                <div className="flex items-start">
                  <AlertCircle className={`w-5 h-5 mr-2 mt-0.5 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <div>
                    <h3 className={`text-sm font-semibold mb-2 ${
                      isDarkMode ? 'text-blue-300' : 'text-blue-700'
                    }`}>
                      Key Points to Consider:
                    </h3>
                    <ul className={`space-y-1 text-sm ${
                      isDarkMode ? 'text-blue-200' : 'text-blue-600'
                    }`}>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                        Identify the time period shown
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                        Note units of measurement
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                        Highlight significant changes
                      </li>
                      <li className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
                        Compare different data sets
                      </li>
                    </ul>
                  </div>
                </div>
                <button 
                  onClick={() => setShowTips(false)}
                  className={`mt-3 text-xs ${
                    isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                  } underline underline-offset-2`}
                >
                  Hide tips
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}