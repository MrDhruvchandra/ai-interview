import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Mail, Calendar, BarChart2, Settings, ChevronDown, 
  ChevronUp, Award, Briefcase, Book 
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { mockInterviews, mockPerformanceData } from '../services/mockData';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState<'profile' | 'history'>('profile');
  const [expandedSection, setExpandedSection] = React.useState<string | null>('personal-info');
  
  const userInterviews = mockInterviews.filter(interview => interview.userId === user?.id);
  const userPerformance = mockPerformanceData[user?.id || ''] || {
    skillProgress: [],
    scoresByMonth: [],
    interviewCount: 0,
    averageScore: 0,
    topPerformingSkill: '',
    weakestSkill: '',
  };
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage your account and view your interview history
        </p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profile'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
          >
            Interview History
          </button>
        </nav>
      </div>
      
      {activeTab === 'profile' ? (
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="card overflow-hidden">
            <button
              onClick={() => toggleSection('personal-info')}
              className="w-full flex items-center justify-between p-6 text-left border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
              </div>
              {expandedSection === 'personal-info' ? (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            
            {expandedSection === 'personal-info' && (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                      type="text"
                      className="mt-1 input"
                      value={user?.name || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input
                      type="email"
                      className="mt-1 input"
                      value={user?.email || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preferred Role</label>
                    <select className="mt-1 input">
                      <option>Frontend Developer</option>
                      <option>Backend Developer</option>
                      <option>Full Stack Developer</option>
                      <option>Data Scientist</option>
                      <option>DevOps Engineer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience Level</label>
                    <select className="mt-1 input">
                      <option>Entry Level (0-2 years)</option>
                      <option>Mid Level (2-5 years)</option>
                      <option>Senior (5-8 years)</option>
                      <option>Lead/Principal (8+ years)</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="btn btn-primary">Save Changes</button>
                </div>
              </div>
            )}
          </div>
          
          {/* Account Settings */}
          <div className="card overflow-hidden">
            <button
              onClick={() => toggleSection('account-settings')}
              className="w-full flex items-center justify-between p-6 text-left border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Account Settings</h2>
              </div>
              {expandedSection === 'account-settings' ? (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            
            {expandedSection === 'account-settings' && (
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Password</h3>
                    <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                        <input
                          type="password"
                          className="mt-1 input"
                          placeholder="••••••••"
                        />
                      </div>
                      <div></div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                        <input
                          type="password"
                          className="mt-1 input"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                        <input
                          type="password"
                          className="mt-1 input"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="btn btn-primary">Update Password</button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">Notifications</h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-notifications"
                            name="email-notifications"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="email-notifications" className="font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
                          <p className="text-gray-500 dark:text-gray-400">Receive email notifications about new features and updates.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="feedback-reminders"
                            name="feedback-reminders"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            defaultChecked
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="feedback-reminders" className="font-medium text-gray-700 dark:text-gray-300">Feedback Reminders</label>
                          <p className="text-gray-500 dark:text-gray-400">Receive reminders to practice interviews regularly.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="btn btn-primary">Save Preferences</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Performance Overview */}
          <div className="card overflow-hidden">
            <button
              onClick={() => toggleSection('performance')}
              className="w-full flex items-center justify-between p-6 text-left border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <BarChart2 className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Performance Overview</h2>
              </div>
              {expandedSection === 'performance' ? (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
            
            {expandedSection === 'performance' && (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-3">
                      <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{userPerformance.averageScore}%</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-400 mb-3">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{userPerformance.interviewCount}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interviews Completed</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-600 dark:bg-accent-900 dark:text-accent-400 mb-3">
                      <Book className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{userPerformance.topPerformingSkill}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Top Skill</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Score Trend</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userPerformance.scoresByMonth}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Interview History */}
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Interview History</h2>
              <Link to="/interview/setup" className="btn btn-primary text-sm">
                New Interview
              </Link>
            </div>
            
            {userInterviews.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Topics</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {userInterviews.map((interview) => (
                      <tr key={interview.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {format(new Date(interview.date), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {interview.role}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          <div className="flex flex-wrap gap-1">
                            {interview.topics.map((topic, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {interview.duration} min
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${interview.score >= 80 ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400' : ''}
                            ${interview.score >= 60 && interview.score < 80 ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400' : ''}
                            ${interview.score < 60 ? 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400' : ''}
                          `}>
                            {interview.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          <Link
                            to={`/interview/results/${interview.id}`}
                            className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
                          >
                            View Report
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No interviews yet</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Start your first AI interview to practice your skills.
                </p>
                <div className="mt-6">
                  <Link to="/interview/setup" className="btn btn-primary">
                    Start Interview
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;