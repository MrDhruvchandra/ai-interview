import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 sm:px-6">
      {/* Left section */}
      <div className="flex items-center flex-1">
        <button
          type="button"
          className="p-2 text-gray-500 rounded-md -ml-2 dark:text-gray-400 lg:hidden"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
        
        {/* Search */}
        <div className="flex items-center max-w-md px-4 mx-auto lg:ml-0 lg:mr-auto">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="input pl-10 py-1.5 w-full lg:w-80"
              placeholder="Search interviews, topics..."
            />
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <button
          type="button"
          className="p-1 text-gray-500 rounded-full hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <span className="sr-only">View notifications</span>
          <Bell className="w-6 h-6" aria-hidden="true" />
        </button>
        
        {/* Profile dropdown */}
        <div className="relative flex-shrink-0 ml-4">
          <Link to="/profile" className="relative">
            <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full overflow-hidden dark:bg-primary-800">
              <span className="font-medium text-primary-700 dark:text-primary-300">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;