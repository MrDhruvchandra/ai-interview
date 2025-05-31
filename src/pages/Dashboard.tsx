import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart2, Award, TrendingUp, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { useAuth } from '../hooks/useAuth';
import { mockInterviews, mockPerformanceData } from '../services/mockData';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Fetch user's interviews and performance data
  const userInterviews = mockInterviews.filter(interview => interview.userId === user?.id);
  const userPerformance = mockPerformanceData[user?.id || ''] || {
    skillProgress: [],
    scoresByMonth: [],
    interviewCount: 0,
    averageScore: 0,
    topPerformingSkill: '',
    weakestSkill: '',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/interview/setup"
            className="btn btn-primary inline-flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Interview
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Interviews Completed',
            value: userPerformance.interviewCount,
            icon: <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
            change: '+2 from last month',
            trend: 'up',
          },
          {
            title: 'Average Score',
            value: `${userPerformance.averageScore}%`,
            icon: <BarChart2 className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />,
            change: '+5% from last month',
            trend: 'up',
          },
          {
            title: 'Top Skill',
            value: userPerformance.topPerformingSkill || 'N/A',
            icon: <Award className="h-6 w-6 text-accent-600 dark:text-accent-400" />,
            change: 'Consistent performance',
            trend: 'neutral',
          },
          {
            title: 'Needs Improvement',
            value: userPerformance.weakestSkill || 'N/A',
            icon: <TrendingUp className="h-6 w-6 text-warning-600 dark:text-warning-400" />,
            change: 'Focus area identified',
            trend: 'down',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="card p-5 flex flex-col justify-between"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <div className="rounded-full p-2 bg-gray-100 dark:bg-gray-700 self-start">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4">
              <p className={`text-xs flex items-center
                ${stat.trend === 'up' ? 'text-success-600 dark:text-success-400' : ''}
                ${stat.trend === 'down' ? 'text-error-600 dark:text-error-400' : ''}
                ${stat.trend === 'neutral' ? 'text-gray-600 dark:text-gray-400' : ''}
              `}>
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance trend */}
        <div className="card p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userPerformance.scoresByMonth}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill progress */}
        <div className="card p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skill Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userPerformance.skillProgress.map(item => ({
                  skill: item.skill,
                  score: item.scores[item.scores.length - 1] || 0,
                }))}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 25,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="skill" tick={{ fontSize: 12 }} width={80} />
                <Tooltip />
                <Bar 
                  dataKey="score" 
                  fill="#8b5cf6" 
                  radius={[0, 4, 4, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent interviews */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Interviews</h2>
        </div>
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
              {userInterviews.length > 0 ? (
                userInterviews.map((interview) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No interviews completed yet. Start your first interview now!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {userInterviews.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 text-right">
            <Link
              to="/profile"
              className="text-sm text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View all interviews →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;