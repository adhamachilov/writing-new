import React from 'react';
import { useStore } from '../../../store/useStore';
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  Shield,
  Ban,
  Crown,
  Mail
} from 'lucide-react';

interface UserManagementProps {
  section: string;
}

export default function UserManagement({ section }: UserManagementProps) {
  const { isDarkMode } = useStore();

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      type: 'premium',
      lastActive: '2024-02-20',
      essays: 45
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'inactive',
      type: 'free',
      lastActive: '2024-02-19',
      essays: 12
    },
    // Add more mock users as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          User Management
        </h1>
        <div className="flex items-center space-x-4">
          <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            isDarkMode
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Invite Users</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
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
              placeholder="Search users..."
              className={`ml-2 flex-1 bg-transparent border-none focus:outline-none ${
                isDarkMode
                  ? 'text-white placeholder-gray-400'
                  : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <select className={`px-4 py-2 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
          <select className={`px-4 py-2 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'bg-white border-gray-200 text-gray-900'
          }`}>
            <option value="all">All Types</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
          <button className={`p-2 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}>
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className={`rounded-xl border ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } overflow-hidden`}>
        <table className="w-full">
          <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } uppercase tracking-wider`}>
                User
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Status
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Type
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Last Active
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Essays
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } uppercase tracking-wider`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${
            isDarkMode ? 'divide-gray-700' : 'divide-gray-200'
          }`}>
            {users.map((user) => (
              <tr key={user.id} className={
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <span className={`text-lg font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {user.name[0]}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {user.name}
                      </div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active'
                      ? isDarkMode
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-green-100 text-green-700'
                      : isDarkMode
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {user.type === 'premium' && (
                      <Crown className={`w-4 h-4 mr-1 ${
                        isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                      }`} />
                    )}
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {user.type}
                    </span>
                  </div>
                </td>
                <td className={`px-6 py-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {user.lastActive}
                </td>
                <td className={`px-6 py-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {user.essays}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button className={`p-1 rounded-lg hover:bg-gray-100 ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}>
                      <Shield className="w-4 h-4" />
                    </button>
                    <button className={`p-1 rounded-lg hover:bg-gray-100 ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}>
                      <Ban className="w-4 h-4" />
                    </button>
                    <button className={`p-1 rounded-lg hover:bg-gray-100 ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          Showing 1 to 10 of 100 users
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