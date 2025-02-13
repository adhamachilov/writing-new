import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import {
  MessageSquare,
  Search,
  Plus,
  User,
  ThumbsUp,
  MessageCircle,
  Flag,
  Filter,
  Bookmark,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isPinned?: boolean;
}

export default function Community() {
  const { isDarkMode, user } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'discussion', label: 'Discussions' },
    { id: 'questions', label: 'Questions' },
    { id: 'resources', label: 'Resources' },
    { id: 'success-stories', label: 'Success Stories' }
  ];

  // Mock data - replace with actual data from your backend
  const posts: Post[] = [
    {
      id: '1',
      title: 'Tips for achieving Band 8 in Writing',
      content: 'Here are my top strategies that helped me achieve Band 8...',
      author: {
        id: '1',
        name: 'John Doe',
        role: 'Verified Expert'
      },
      category: 'success-stories',
      tags: ['writing', 'band8', 'tips'],
      likes: 45,
      comments: 12,
      createdAt: '2024-02-20',
      isPinned: true
    },
    // Add more posts...
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Community
        </h1>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Connect with fellow IELTS test-takers and share your journey
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className={`flex items-center px-4 py-2 rounded-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <Search className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`ml-2 flex-1 bg-transparent border-none focus:outline-none ${
                isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`px-4 py-2 rounded-lg border ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700 text-white' 
              : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
        </select>
        {user && (
          <Link
            to="/community/new"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Post
          </Link>
        )}
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-8 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === category.id
                ? isDarkMode
                  ? 'bg-emerald-500 text-white'
                  : 'bg-emerald-500 text-white'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className={`p-6 rounded-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            {post.isPinned && (
              <div className={`flex items-center gap-2 mb-4 text-sm ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                <TrendingUp className="w-4 h-4" />
                Pinned Post
              </div>
            )}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <User className={`w-6 h-6 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {post.author.name}
                    </span>
                    {post.author.role === 'Verified Expert' && (
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        isDarkMode
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        Expert
                      </span>
                    )}
                  </div>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 rounded-lg ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className={`p-2 rounded-lg ${
                  isDarkMode
                    ? 'hover:bg-gray-700 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}>
                  <Flag className="w-5 h-5" />
                </button>
              </div>
            </div>
            <Link to={`/community/post/${post.id}`}>
              <h3 className={`text-xl font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {post.title}
              </h3>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {post.content.length > 200 
                  ? post.content.substring(0, 200) + '...' 
                  : post.content}
              </p>
            </Link>
            <div className="flex items-center gap-4">
              <button className={`flex items-center gap-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <ThumbsUp className="w-5 h-5" />
                {post.likes}
              </button>
              <button className={`flex items-center gap-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <MessageCircle className="w-5 h-5" />
                {post.comments}
              </button>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-1 rounded text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 