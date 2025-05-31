import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, LayoutDashboard, Settings, User, Users, Clock, BarChart2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'New Interview', href: '/interview/setup', icon: Clock },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  ];
  
  const adminNavigation = [
    { name: 'Admin Panel', href: '/admin', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 left-0 z-30 w-64 flex flex-col max-w-xs bg-white dark:bg-gray-800 lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-5 border-b dark:border-gray-700">
              <div className="flex items-center">
                <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">InterviewPro AI</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-500 rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <span className="sr-only">Close sidebar</span>
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto">
              <SidebarContent
                navigation={navigation}
                adminNavigation={adminNavigation}
                user={user}
                logout={logout}
                mobile={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center h-16 px-4 border-b dark:border-gray-700">
              <div className="flex items-center">
                <Sparkles className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">InterviewPro AI</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <SidebarContent
                navigation={navigation}
                adminNavigation={adminNavigation}
                user={user}
                logout={logout}
                mobile={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface SidebarContentProps {
  navigation: Array<{ name: string; href: string; icon: React.ElementType }>;
  adminNavigation: Array<{ name: string; href: string; icon: React.ElementType }>;
  user: any;
  logout: () => void;
  mobile: boolean;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  navigation,
  adminNavigation,
  user,
  logout,
  mobile
}) => {
  return (
    <nav className="flex-1 px-2 py-4 space-y-2">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          onClick={mobile ? () => {} : undefined}
          className={({ isActive }) =>
            `flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
              isActive
                ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
            }`
          }
        >
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {item.name}
        </NavLink>
      ))}

      {user?.isAdmin && (
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
            Admin
          </h3>
          <div className="mt-2 space-y-1">
            {adminNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={mobile ? () => {} : undefined}
                className={({ isActive }) =>
                  `flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;