import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Moon, 
  Sun, 
  Diamond, 
  User, 
  LogOut, 
  History, 
  BarChart2,
  Menu,
  X,
  Home,
  Settings,
  Users,
  Gift,
  HelpCircle,
  BookOpen,
  Bell,
  Zap,
  FileText,
  Award,
  MessageSquare,
  LayoutDashboard
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const { isDarkMode, toggleDarkMode, user, logout } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const mainNavLinks = user ? [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/essays', icon: <FileText className="w-5 h-5" />, label: <span style={{ fontSize: '16px' }}>Essays</span> },
    { path: '/referral', icon: <Gift className="w-5 h-5" />, label: <span style={{ fontSize: '16px' }}>Referral</span> },
    { path: '/learn', icon: <BookOpen className="w-5 h-5" />, label: 'Learning Hub' },
    { path: '/community', icon: <MessageSquare className="w-5 h-5" />, label: 'Community' },
  ] : [];

  const adminLinks = [
    { path: '/admin', icon: <Settings className="w-5 h-5" />, label: 'Admin Panel' },
    { path: '/admin/users', icon: <Users className="w-5 h-5" />, label: 'User Management' },
    { path: '/admin/analytics', icon: <BarChart2 className="w-5 h-5" />, label: 'Analytics' },
  ];

  const mockNotifications = [
    { id: 1, title: 'New Achievement!', message: 'You\'ve completed 5 essays this week', type: 'achievement' },
    { id: 2, title: 'Score Improvement', message: 'Your latest essay score has improved by 0.5 bands', type: 'progress' },
    { id: 3, title: 'Premium Trial Ending', message: 'Your premium trial ends in 2 days', type: 'alert' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? isDarkMode 
          ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
        : isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className={`text-xl font-bold hidden sm:block ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              BandUP
            </span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden lg:flex items-center space-x-1">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    location.pathname === link.path
                      ? isDarkMode
                        ? 'bg-gray-800 text-white'
                        : 'bg-emerald-100 text-emerald-700'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-lg transition-all ${
                    isDarkMode
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg overflow-hidden ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="p-4">
                      <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b ${
                            isDarkMode ? 'border-gray-700' : 'border-gray-200'
                          } hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer`}
                        >
                          <div className="flex items-start space-x-3">
                            {notification.type === 'achievement' && (
                              <Award className={`w-5 h-5 ${
                                isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                              }`} />
                            )}
                            {notification.type === 'progress' && (
                              <Zap className={`w-5 h-5 ${
                                isDarkMode ? 'text-green-400' : 'text-green-500'
                              }`} />
                            )}
                            {notification.type === 'alert' && (
                              <Bell className={`w-5 h-5 ${
                                isDarkMode ? 'text-red-400' : 'text-red-500'
                              }`} />
                            )}
                            <div>
                              <p className={`font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {notification.title}
                              </p>
                              <p className={`text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <button className={`text-sm font-medium ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      } hover:underline`}>
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Premium Button */}
            {(!user || !user.premium) && (
              <Link
                to="/premium"
                className={`hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 hover:from-amber-500/30 hover:to-amber-600/30'
                    : 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 hover:from-amber-200 hover:to-amber-300'
                }`}
              >
                <Diamond className="w-5 h-5" />
                <span>Upgrade</span>
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all ${
                isDarkMode 
                  ? 'hover:bg-gray-800 text-gray-300' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className={`flex items-center space-x-2 p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <User className={`w-5 h-5 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                  </div>
                  <span className={`hidden sm:block ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {user.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-lg transition-all transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className={`flex items-center space-x-2 px-4 py-2 ${
                        isDarkMode
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className={`flex items-center space-x-2 px-4 py-2 ${
                        isDarkMode
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className={`flex items-center space-x-2 px-4 py-2 ${
                          isDarkMode
                            ? 'hover:bg-gray-700 text-gray-300'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className={`flex items-center space-x-2 px-4 py-2 w-full text-left ${
                        isDarkMode
                          ? 'hover:bg-red-500/20 text-red-400'
                          : 'hover:bg-red-50 text-red-600'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/signin"
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isDarkMode
                      ? 'text-white hover:bg-gray-800'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg transition-colors duration-200"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          showMobileMenu ? 'max-h-screen' : 'max-h-0'
        }`}>
          <div className={`px-4 py-6 space-y-4 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {user ? (
              <>
                <div className={`flex items-center space-x-4 pb-4 border-b ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <div className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <User className="w-6 h-6" />
                  </div>
                  <div>
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

                {mainNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === link.path
                        ? isDarkMode
                          ? 'bg-gray-700 text-white'
                          : 'bg-emerald-100 text-emerald-700'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}

                {user.isAdmin && adminLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      location.pathname === link.path
                        ? isDarkMode
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-purple-100 text-purple-700'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                      isDarkMode
                        ? 'text-red-300 hover:bg-red-500/20'
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/signin"
                  className={`block w-full px-4 py-3 rounded-lg text-center transition-all ${
                    isDarkMode
                      ? 'text-white hover:bg-gray-700'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 rounded-lg text-center bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
                >
                  Sign Up
                </Link>
                <Link
                  to="/premium"
                  className="block w-full px-4 py-3 rounded-lg text-center bg-emerald-500 text-white hover:bg-emerald-600 transition-all"
                >
                  Upgrade Premium
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}