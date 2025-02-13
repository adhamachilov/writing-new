import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings2,
  Shield,
  DollarSign,
  Gift,
  BookOpen,
  MessageSquare,
  Menu,
  X,
  Activity,
  Home,
  GraduationCap,
  UserCheck,
  Mail,
  Globe,
  Palette,
  History,
  Tag,
  Calendar,
  Bell,
  AlertTriangle,
  Megaphone,
  BookMarked,
  LineChart,
  TrendingUp,
  UserPlus,
  RefreshCcw,
  Lock,
  Eye,
  Award,
  Zap,
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminOverview from './sections/AdminOverview';
import UserManagement from './sections/UserManagement';
import ContentManagement from './sections/ContentManagement';
import RevenueAnalytics from './sections/RevenueAnalytics';
import SystemSettings from './sections/SystemSettings';
import Dashboard from '../Dashboard';
import MyEssays from '../MyEssays';
import LearningHub from '../LearningHub';
import Community from '../Community';
import SettingsPage from '../Settings';

export default function AdminDashboard() {
  const { isDarkMode, user } = useStore();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});
  const [activeSection, setActiveSection] = useState('overview');

  // Check for admin access
  if (!user || user.email !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-center p-8 rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Access Denied
          </h2>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            You don't have permission to access this area.
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      title: 'HOME',
      items: [
        { 
          icon: <Home className="w-5 h-5" />, 
          label: 'Home',
          id: 'home'
        },
        { 
          icon: <LayoutDashboard className="w-5 h-5" />, 
          label: 'Dashboard',
          id: 'dashboard'
        },
        { 
          icon: <FileText className="w-5 h-5" />, 
          label: 'Essays',
          id: 'essays'
        },
        { 
          icon: <BookOpen className="w-5 h-5" />, 
          label: 'Learning Hub',
          id: 'learning-hub'
        },
        { 
          icon: <MessageSquare className="w-5 h-5" />, 
          label: 'Community',
          id: 'community'
        }
      ]
    },
    {
      title: 'ADMIN',
      items: [
        {
          icon: <BarChart2 className="w-5 h-5" />,
          label: 'Analytics',
          id: 'analytics',
          submenu: [
            { label: 'Website Traffic', id: 'analytics-traffic' },
            { label: 'User Engagement', id: 'analytics-engagement' },
            { label: 'Conversion Rates', id: 'analytics-conversion' },
            { label: 'Growth Metrics', id: 'analytics-growth' },
            { label: 'Custom Reports', id: 'analytics-reports' }
          ]
        },
        {
          icon: <DollarSign className="w-5 h-5" />,
          label: 'Revenue',
          id: 'revenue',
          submenu: [
            { label: 'Financial Overview', id: 'revenue-overview' },
            { label: 'Transaction History', id: 'revenue-transactions' },
            { label: 'Revenue Reports', id: 'revenue-reports' },
            { label: 'Refund Management', id: 'revenue-refunds' },
            { label: 'Payment Gateway', id: 'revenue-gateway' }
          ]
        },
        {
          icon: <Shield className="w-5 h-5" />,
          label: 'Admin Management',
          id: 'admin',
          submenu: [
            { label: 'Admin Accounts', id: 'admin-accounts' },
            { label: 'Role Permissions', id: 'admin-roles' },
            { label: 'Access Logs', id: 'admin-logs' },
            { label: 'Security Settings', id: 'admin-security' }
          ]
        }
      ]
    },
    {
      title: 'NAVIGATION',
      items: [
        {
          icon: <Users className="w-5 h-5" />,
          label: 'User Management',
          id: 'users',
          submenu: [
            { label: 'All Users', id: 'users-all' },
            { label: 'Premium Members', id: 'users-premium' },
            { label: 'Free Users', id: 'users-free' },
            { label: 'Banned Accounts', id: 'users-banned' },
            { label: 'Activity Logs', id: 'users-logs' },
            { label: 'Verification Queue', id: 'users-verification' }
          ]
        },
        {
          icon: <Gift className="w-5 h-5" />,
          label: 'Referral System',
          id: 'referral',
          submenu: [
            { label: 'Active Campaigns', id: 'referral-campaigns' },
            { label: 'Referral Tracking', id: 'referral-tracking' },
            { label: 'Reward Configuration', id: 'referral-rewards' },
            { label: 'Partner Programs', id: 'referral-partners' },
            { label: 'Performance Analytics', id: 'referral-analytics' }
          ]
        },
        {
          icon: <Award className="w-5 h-5" />,
          label: 'Membership',
          id: 'membership',
          submenu: [
            { label: 'Plan Management', id: 'membership-plans' },
            { label: 'Pricing Configuration', id: 'membership-pricing' },
            { label: 'Discount Codes', id: 'membership-discounts' },
            { label: 'Promotions', id: 'membership-promotions' },
            { label: 'Subscription Analytics', id: 'membership-analytics' },
            { label: 'Payment History', id: 'membership-payments' }
          ]
        },
        {
          icon: <BookMarked className="w-5 h-5" />,
          label: 'Learning Hub',
          id: 'learning',
          submenu: [
            { label: 'Course Management', id: 'learning-courses' },
            { label: 'Premium Content', id: 'learning-premium' },
            { label: 'Free Resources', id: 'learning-free' },
            { label: 'Progress Tracking', id: 'learning-progress' },
            { label: 'Student Analytics', id: 'learning-analytics' },
            { label: 'Content Calendar', id: 'learning-calendar' }
          ]
        },
        {
          icon: <MessageSquare className="w-5 h-5" />,
          label: 'Community',
          id: 'community-admin',
          submenu: [
            { label: 'Forum Management', id: 'community-forums' },
            { label: 'Discussion Moderation', id: 'community-moderation' },
            { label: 'User Groups', id: 'community-groups' },
            { label: 'Event Calendar', id: 'community-events' },
            { label: 'Announcements', id: 'community-announcements' },
            { label: 'Content Guidelines', id: 'community-guidelines' }
          ]
        }
      ]
    },
    {
      title: 'SETTINGS',
      items: [
        {
          icon: <Settings2 className="w-5 h-5" />,
          label: 'Website Configuration',
          id: 'website',
          submenu: [
            { label: 'Basic Information', id: 'website-info' },
            { label: 'Branding Settings', id: 'website-branding' },
            { label: 'Email Templates', id: 'website-email' },
            { label: 'Social Media Links', id: 'website-social' },
            { label: 'SEO Settings', id: 'website-seo' }
          ]
        },
        {
          icon: <Settings className="w-5 h-5" />,
          label: 'Personal Settings',
          id: 'personal',
          submenu: [
            { label: 'Profile Management', id: 'personal-profile' },
            { label: 'Activity History', id: 'personal-activity' }
          ]
        }
      ]
    }
  ];

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleMenuClick = (id: string) => {
    setActiveSection(id);
  };

  const sidebarVariants = {
    expanded: {
      width: '280px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    collapsed: {
      width: '72px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'essays':
        return <MyEssays />;
      case 'learning-hub':
        return <LearningHub />;
      case 'community':
        return <Community />;
      case 'personal-profile':
        return <SettingsPage />;
      case 'overview':
        return <AdminOverview />;
      case 'users':
      case 'users-all':
      case 'users-premium':
      case 'users-free':
      case 'users-banned':
        return <UserManagement section={activeSection} />;
      case 'revenue':
      case 'revenue-overview':
      case 'revenue-transactions':
        return <RevenueAnalytics section={activeSection} />;
      case 'website':
      case 'website-info':
      case 'website-branding':
        return <SystemSettings section={activeSection} />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="expanded"
        animate={isSidebarCollapsed ? 'collapsed' : 'expanded'}
        className={`fixed left-0 top-0 h-screen ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        } shadow-lg z-50`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4">
          <AnimatePresence>
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`font-bold text-xl ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Admin Panel
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode
                ? 'hover:bg-gray-800 text-gray-400'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {isSidebarCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-6">
              <AnimatePresence>
                {!isSidebarCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`px-4 mb-2 text-xs font-semibold ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {section.title}
                  </motion.div>
                )}
              </AnimatePresence>

              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <button
                    onClick={() => {
                      if (item.submenu) {
                        toggleMenu(item.label);
                      } else {
                        handleMenuClick(item.id);
                      }
                    }}
                    className={`w-full flex items-center px-4 py-2 ${
                      activeSection === item.id
                        ? isDarkMode
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-100 text-gray-900'
                        : isDarkMode
                          ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    } transition-colors duration-200`}
                  >
                    <div className="flex items-center flex-1">
                      {item.icon}
                      <AnimatePresence>
                        {!isSidebarCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="ml-3"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    {!isSidebarCollapsed && item.submenu && (
                      <motion.div
                        animate={{ rotate: expandedMenus[item.label] ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    )}
                  </button>

                  {/* Submenu */}
                  {!isSidebarCollapsed && item.submenu && (
                    <AnimatePresence>
                      {expandedMenus[item.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <button
                              key={subIndex}
                              onClick={() => handleMenuClick(subItem.id)}
                              className={`w-full flex items-center pl-12 pr-4 py-2 ${
                                activeSection === subItem.id
                                  ? isDarkMode
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-gray-100 text-gray-900'
                                  : isDarkMode
                                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                              } transition-colors duration-200`}
                            >
                              <ChevronRight className="w-4 h-4 mr-2" />
                              {subItem.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? 'ml-[72px]' : 'ml-[280px]'} transition-all duration-300`}>
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}