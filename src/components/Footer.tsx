import React from 'react';
import { useStore } from '../store/useStore';
import { 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Mail, 
  MessageCircle,
  Shield,
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';

export default function Footer() {
  const { isDarkMode } = useStore();

  return (
    <footer className={`py-12 mt-16 ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-emerald-100/30'
    }`}>
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              About IELTS Checker
            </h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Advanced AI-powered IELTS Writing Task 1 analysis tool that helps you improve your score
              through detailed feedback and suggestions.
            </p>
          </div>

          {/* Features Section */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Features
            </h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Advanced Grammar Check</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Vocabulary Enhancement</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Detailed Band Score Analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Progress Tracking</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Quick Links
            </h3>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <a href="#" className="hover:underline">How It Works</a>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
              <li className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4" />
                <a href="#" className="hover:underline">FAQ</a>
              </li>
              <li className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <a href="#" className="hover:underline">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Connect With Us
            </h3>
            <div className={`flex items-center space-x-2 mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <Mail className="w-4 h-4" />
              <a href="mailto:support@ieltschecker.com" className="hover:underline">
                support@ieltschecker.com
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className={`hover:text-emerald-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-emerald-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-emerald-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-emerald-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 mt-8 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-emerald-200/50'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2024 IELTS Checker. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className={`text-sm hover:underline ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Terms of Service
              </a>
              <a href="#" className={`text-sm hover:underline ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm hover:underline ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}