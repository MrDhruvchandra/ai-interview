import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const from = (location.state as any)?.from?.pathname || '/';
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>
      
      {error && (
        <div className="p-3 rounded-md bg-error-50 text-error-600 dark:bg-error-900/30 dark:text-error-400">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`input ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            className={`input ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.password.message}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            Remember me
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full flex justify-center"
        >
          {isLoading ? (
            <span className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Signing in...</span>
            </span>
          ) : (
            <span className="inline-flex items-center">
              <LogIn className="h-4 w-4 mr-2" />
              <span>Sign in</span>
            </span>
          )}
        </button>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
            Sign up
          </Link>
        </p>
      </div>
      
      {/* Demo accounts */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-2">Demo accounts</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              const userEmail = document.getElementById('email') as HTMLInputElement;
              const userPassword = document.getElementById('password') as HTMLInputElement;
              if (userEmail && userPassword) {
                userEmail.value = 'user@example.com';
                userPassword.value = 'password123';
              }
            }}
            className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            User Account
          </button>
          <button
            type="button"
            onClick={() => {
              const userEmail = document.getElementById('email') as HTMLInputElement;
              const userPassword = document.getElementById('password') as HTMLInputElement;
              if (userEmail && userPassword) {
                userEmail.value = 'admin@example.com';
                userPassword.value = 'password123';
              }
            }}
            className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Admin Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;