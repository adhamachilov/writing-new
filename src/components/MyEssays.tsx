import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Essay {
  id: string;
  title: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'feedback';
  score?: number;
  createdAt: string;
  updatedAt: string;
  type: 'task1' | 'task2';
}

export default function MyEssays() {
  const { isDarkMode, user } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Mock data - replace with actual data from your backend
  const essays: Essay[] = [
    {
      id: '1',
      title: 'The Impact of Technology',
      status: 'reviewed',
      score: 7.5,
      createdAt: '2024-02-20',
      updatedAt: '2024-02-21',
      type: 'task2'
    },
    // Add more mock essays as needed
  ];

  const filteredEssays = essays.filter(essay => {
    const matchesSearch = essay.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || essay.status === statusFilter;
    const matchesType = typeFilter === 'all' || essay.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
      case 'submitted':
        return 'text-blue-500 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'reviewed':
        return 'text-green-500 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'feedback':
        return 'text-amber-500 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="w-4 h-4" />;
      case 'submitted':
        return <AlertCircle className="w-4 h-4" />;
      case 'reviewed':
        return <CheckCircle className="w-4 h-4" />;
      case 'feedback':
        return <FileText className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          My Essays
        </h1>
        <Link
          to="/essays/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Essay
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className={`flex items-center px-3 py-2 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <Search className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search essays..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`ml-2 flex-1 bg-transparent border-none focus:outline-none ${
                isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`px-3 py-2 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="submitted">Submitted</option>
          <option value="reviewed">Reviewed</option>
          <option value="feedback">Feedback</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={`px-3 py-2 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <option value="all">All Types</option>
          <option value="task1">Task 1</option>
          <option value="task2">Task 2</option>
        </select>
      </div>

      {/* Essay Grid */}
      {filteredEssays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEssays.map((essay) => (
            <div
              key={essay.id}
              className={`p-6 rounded-xl border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {essay.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 ${
                      getStatusColor(essay.status)
                    }`}>
                      {getStatusIcon(essay.status)}
                      {essay.status.charAt(0).toUpperCase() + essay.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      isDarkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {essay.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                {essay.score && (
                  <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    isDarkMode
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    Band {essay.score}
                  </div>
                )}
              </div>
              <div className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Last updated {new Date(essay.updatedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={`/essays/${essay.id}`}
                  className={`flex-1 px-3 py-2 rounded-lg text-center text-sm font-medium ${
                    isDarkMode
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  View Essay
                </Link>
                <button
                  className={`p-2 rounded-lg ${
                    isDarkMode
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 rounded-lg ${
                    isDarkMode
                      ? 'hover:bg-red-500/20 text-red-400'
                      : 'hover:bg-red-50 text-red-600'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center py-12 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No essays found</h3>
          <p className="mb-4">Start writing your first essay or try different filters</p>
          <Link
            to="/essays/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Write New Essay
          </Link>
        </div>
      )}
    </div>
  );
} 