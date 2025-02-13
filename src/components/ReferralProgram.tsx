import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Gift, Copy, Share2, Users, Award, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function ReferralProgram() {
  const { isDarkMode, user, adminSettings } = useStore();
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Gift className={`w-16 h-16 mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Join Our Referral Program
        </h2>
        <p className={`text-center mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Sign in to start earning rewards by inviting friends
        </p>
        <a
          href="/signin"
          className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all"
        >
          Sign In to Continue
        </a>
      </div>
    );
  }

  const referralLink = `https://bandup.com/signup?ref=${user.id}`;
  const referralCount = user.referrals?.length || 0;
  const progressPercentage = Math.min((referralCount / adminSettings.referral.requiredInvites) * 100, 100);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform: string) => {
    const shareText = "Join me on BandUP - The ultimate IELTS Writing preparation tool!";
    const shareUrl = referralLink;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`);
        break;
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Join BandUP',
              text: shareText,
              url: shareUrl,
            });
          } catch (error) {
            console.error('Error sharing:', error);
          }
        }
    }
    setShowShareOptions(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
          isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
        }`}>
          <Gift className={`w-10 h-10 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`} />
        </div>
        <h1 className={`text-3xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Invite Friends & Earn Rewards
        </h1>
        <p className={`text-xl max-w-2xl mx-auto ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Get {adminSettings.referral.rewardDurationWeeks} weeks of premium access when {adminSettings.referral.requiredInvites} friends join using your link!
        </p>
      </div>

      {/* Progress Card */}
      <div className={`p-6 rounded-xl mb-8 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Your Progress
            </h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              {referralCount} out of {adminSettings.referral.requiredInvites} friends joined
            </p>
          </div>
          <div className={`px-4 py-2 rounded-lg ${
            progressPercentage === 100
              ? isDarkMode
                ? 'bg-green-500/20 text-green-300'
                : 'bg-green-100 text-green-700'
              : isDarkMode
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-blue-100 text-blue-700'
          }`}>
            {progressPercentage === 100 ? (
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Goal Achieved!</span>
              </div>
            ) : (
              <span>{Math.round(progressPercentage)}% Complete</span>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-500 rounded-full ${
              progressPercentage === 100
                ? 'bg-gradient-to-r from-green-400 to-green-500'
                : 'bg-gradient-to-r from-blue-400 to-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Milestones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[2, 5, 8, 10].map((milestone) => (
            <div
              key={milestone}
              className={`p-4 rounded-lg ${
                referralCount >= milestone
                  ? isDarkMode
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-green-50 border border-green-200'
                  : isDarkMode
                    ? 'bg-gray-700/50'
                    : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-medium ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {milestone} Friends
                </span>
                {referralCount >= milestone && (
                  <Check className={`w-5 h-5 ${
                    isDarkMode ? 'text-green-400' : 'text-green-500'
                  }`} />
                )}
              </div>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {milestone === adminSettings.referral.requiredInvites
                  ? `${adminSettings.referral.rewardDurationWeeks} weeks premium`
                  : `${milestone} days premium`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Link Section */}
      <div className={`p-6 rounded-xl mb-8 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Share Your Link
        </h2>
        <div className="flex flex-col md:flex-row items-stretch space-y-4 md:space-y-0 md:space-x-4">
          <div className={`flex-1 p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <code className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
              {referralLink}
            </code>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className={`px-6 py-3 rounded-lg transition-all flex items-center space-x-2 ${
                copied
                  ? isDarkMode
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-green-100 text-green-700'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className={`px-6 py-3 rounded-lg transition-all flex items-center space-x-2 ${
                  isDarkMode
                    ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>

              {showShareOptions && (
                <div className={`absolute right-0 mt-2 w-48 rounded-xl shadow-lg overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  {['Twitter', 'Facebook', 'WhatsApp', 'Telegram'].map((platform) => (
                    <button
                      key={platform}
                      onClick={() => handleShare(platform.toLowerCase())}
                      className={`w-full px-4 py-3 text-left flex items-center space-x-3 ${
                        isDarkMode
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Share2 className="w-4 h-4" />
                      <span>{platform}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className={`p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Share2 className={`w-5 h-5 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Share Your Link
              </h3>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Share your unique referral link with friends and fellow IELTS candidates
            </p>
          </div>

          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
                <Users className={`w-5 h-5 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`} />
              </div>
              <h3 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Friends Join
              </h3>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              When {adminSettings.referral.requiredInvites} friends sign up using your link
            </p>
          </div>

          <div className={`p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <Award className={`w-5 h-5 ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
              <h3 className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Get Premium
              </h3>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Enjoy {adminSettings.referral.rewardDurationWeeks} weeks of premium features for free!
            </p>
          </div>
        </div>
      </div>

      {/* Referral History */}
      <div className={`mt-8 p-6 rounded-xl ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg`}>
        <h2 className={`text-xl font-semibold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Referral History
        </h2>
        {user.referrals && user.referrals.length > 0 ? (
          <div className="space-y-4">
            {user.referrals.map((referral, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <User className={`w-4 h-4 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className={`font-medium ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {referral.name}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Joined {new Date(referral.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No referrals yet. Start sharing your link!</p>
          </div>
        )}
      </div>
    </div>
  );
}