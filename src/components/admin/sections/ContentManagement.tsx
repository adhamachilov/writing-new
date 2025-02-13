import React from 'react';
import { useStore } from '../../../store/useStore';
import {
  FileText,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  AlertTriangle
} from 'lucide-react';

interface ContentManagementProps {
  section: string;
}

export default function ContentManagement({ section }: ContentManagementProps) {
  const { isDarkMode } = useStore();

  const essays = [
    {
      id: '1',
      title: 'Population Growth in Major Cities',
      author: 'John Doe',
      score: 7.5,
      status: 'reviewed',
      date: '2024-02-20',
      type: 'Task 1'
    },
    {
      id: '2',
      title: 'Global Temperature Changes',
      author: 'Jane Smith',
      score: 6.5,
      status: 'pending',
      date: '2024-02-19',
      type: 'Task 1'
    },
    // Add more mock essays
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Content Management
        </h1>
        <div className="flex items-center space-x-4">
          <button className={`px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            <Filter className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
            Add Content
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className={`flex items-center px-4 py-2 rounded-lg border ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      }`}>
        <Search className={`w-5 h-5 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <input
          type="text"
          placeholder="Search content..."
          className={`ml-2 flex-1 bg-transparent border-none focus:outline-none ${
            isDarkMode
              ? 'text-white placeholder-gray-400'
              : 'text-gray-900 placeholder-gray-500'
          }`}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6">
        {essays.map((essay) => (
          <div
            key={essay.id}
            className={`p-6 rounded-xl border ${
              isDarkMode
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <FileText className={`w-6 h-6 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-medium mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {essay.title}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      By {essay.author}
                    </span>
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {essay.date}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      essay.status === 'reviewed'
                        ? isDarkMode
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-green-100 text-green-700'
                        : isDarkMode
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {essay.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className={`p-2 rounded-lg ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <Eye className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <Edit className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode
                    ? 'hover:bg-red-500/20 text-red-400'
                    : 'hover:bg-red-100 text-red-600'
                }`}>
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Showing 1 to 10 of 50 items
        </div>
        <div className="flex items-center space-x-2">
          <button className={`px-3 py-1 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            Previous
          </button>
          <button className={`px-3 py-1 rounded-lg ${
            isDarkMode
              ? 'bg-blue-500/20 text-blue-300'
              : 'bg-blue-100 text-blue-700'
          }`}>
            1
          </button>
          <button className={`px-3 py-1 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            2
          </button>
          <button className={`px-3 py-1 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            3
          </button>
          <button className={`px-3 py-1 rounded-lg ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}