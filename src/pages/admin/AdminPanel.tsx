import React, { useState } from 'react';
import { 
  Users, BarChart2, Settings, Download, Search, 
  Calendar, TrendingUp, UserPlus, Activity 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { mockUsers2, mockPlatformStats } from '../../services/mockData';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = mockUsers2.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage users and monitor platform usage
          </p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'dashboard'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <BarChart2 className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'settings'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
        </nav>
      </div>
      
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Total Users',
                value: mockPlatformStats.totalUsers,
                icon: <Users className="h-6 w-6 text-primary-600 dark:text-primary-400" />,
                change: '+32 this month',
                trend: 'up',
              },
              {
                title: 'Active Users (7d)',
                value: mockPlatformStats.activeUsersLast7Days,
                icon: <Activity className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />,
                change: '+15 vs last week',
                trend: 'up',
              },
              {
                title: 'Total Interviews',
                value: mockPlatformStats.totalInterviews,
                icon: <Calendar className="h-6 w-6 text-accent-600 dark:text-accent-400" />,
                change: '+128 this month',
                trend: 'up',
              },
              {
                title: 'Avg. Score',
                value: `${mockPlatformStats.averageScore}%`,
                icon: <TrendingUp className="h-6 w-6 text-success-600 dark:text-success-400" />,
                change: '+2% vs last month',
                trend: 'up',
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
            {/* User Growth */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Growth</h2>
                <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mockPlatformStats.userGrowth}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Interviews by Day */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Interviews by Day</h2>
                <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockPlatformStats.interviewsByDay}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Popular Roles */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Roles</h2>
                <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockPlatformStats.popularRoles}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {mockPlatformStats.popularRoles.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <ul className="space-y-3">
                    {mockPlatformStats.popularRoles.map((role, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></span>
                          <span className="text-sm text-gray-800 dark:text-gray-200">{role.role}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{role.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* System Status */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">System Status</h2>
                <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400">
                  All Systems Operational
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-success-500 mr-2"></div>
                    <span className="text-sm text-gray-800 dark:text-gray-200">API</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">99.9% uptime</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-success-500 mr-2"></div>
                    <span className="text-sm text-gray-800 dark:text-gray-200">Authentication</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">99.9% uptime</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-success-500 mr-2"></div>
                    <span className="text-sm text-gray-800 dark:text-gray-200">Database</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">100% uptime</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-success-500 mr-2"></div>
                    <span className="text-sm text-gray-800 dark:text-gray-200">AI Services</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">99.8% uptime</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-success-500 mr-2"></div>
                    <span className="text-sm text-gray-800 dark:text-gray-200">Media Processing</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">99.7% uptime</span>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full btn btn-outline">
                  View Detailed Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Users list */}
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Users</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="input pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary inline-flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Registered</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Interviews</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.registeredDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.interviewsCompleted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 mr-3">
                          Edit
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No users found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-right">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing <span className="font-medium">{filteredUsers.length}</span> of{' '}
                  <span className="font-medium">{mockUsers2.length}</span> users
                </div>
                <div className="flex items-center space-x-2">
                  <button className="btn btn-outline px-3 py-1 text-sm">Previous</button>
                  <button className="btn btn-outline px-3 py-1 text-sm">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Platform Settings */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Platform Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium text-gray-900 dark:text-white">API Configuration</h3>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Groq API Key</label>
                    <input
                      type="password"
                      className="mt-1 input"
                      placeholder="••••••••••••••••••••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Groq API Endpoint</label>
                    <input
                      type="text"
                      className="mt-1 input"
                      placeholder="https://api.groq.com/v1"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button className="btn btn-primary">Update API Configuration</button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Email Settings</h3>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Server</label>
                    <input
                      type="text"
                      className="mt-1 input"
                      placeholder="smtp.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Port</label>
                    <input
                      type="text"
                      className="mt-1 input"
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Username</label>
                    <input
                      type="text"
                      className="mt-1 input"
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SMTP Password</label>
                    <input
                      type="password"
                      className="mt-1 input"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button className="btn btn-primary">Update Email Settings</button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">Storage Settings</h3>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Storage Provider</label>
                    <select className="mt-1 input">
                      <option>Amazon S3</option>
                      <option>Google Cloud Storage</option>
                      <option>Azure Blob Storage</option>
                      <option>Local Storage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bucket Name</label>
                    <input
                      type="text"
                      className="mt-1 input"
                      placeholder="interview-recordings"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Access Key ID</label>
                    <input
                      type="text"
                      className="mt-1 input"
                      placeholder="AKIAIOSFODNN7EXAMPLE"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Secret Access Key</label>
                    <input
                      type="password"
                      className="mt-1 input"
                      placeholder="••••••••••••••••••••••••••••••"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button className="btn btn-primary">Update Storage Settings</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="card p-6 border-error-200 dark:border-error-900">
            <h2 className="text-lg font-semibold text-error-600 dark:text-error-400 mb-4">Danger Zone</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-error-200 dark:border-error-900 rounded-md bg-error-50 dark:bg-error-900/20">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-error-600 dark:text-error-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-error-600 dark:text-error-400">Reset Application Data</h3>
                    <div className="mt-2">
                      <p className="text-sm text-error-600 dark:text-error-400">
                        This action will permanently delete all user data, interviews, and settings. This cannot be undone.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button className="bg-error-600 hover:bg-error-700 text-white px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500">
                        Reset Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;