
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import EssayChecker from './components/EssayChecker';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Settings from './components/Settings';
import SignInForm from './components/auth/SignInForm';
import SignUpForm from './components/auth/SignUpForm';
import AdminDashboard from './components/admin/AdminDashboard';
import PremiumPage from './components/premium/PremiumPage';
import ReferralProgram from './components/ReferralProgram';
import Footer from './components/Footer';
import MyEssays from './components/MyEssays';
import Community from './components/Community';
import LearningHub from './components/LearningHub';

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-emerald-50/60'}`}>
        <Navbar />
        <div className="flex-1 flex">
          <main className="flex-1 transition-all duration-300 ease-in-out">
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={
                  <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center mb-12">
                      <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        IELTS Writing Task 1 Checker
                      </h1>
                      <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get instant feedback and improve your IELTS Writing Task 1 score
                      </p>
                    </div>
                    <EssayChecker />
                  </div>
                } />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/signin" element={<SignInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/premium" element={<PremiumPage />} />
                <Route path="/referral" element={<ReferralProgram />} />
                <Route path="/essays" element={<MyEssays />} />
                <Route path="/community" element={<Community />} />
                <Route path="/learn" element={<LearningHub />} />
              </Routes>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
