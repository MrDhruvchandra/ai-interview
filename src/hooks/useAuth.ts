import { useState, useEffect, useCallback } from 'react';
import { mockUsers } from '../services/mockData';

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Error parsing stored user:', error);
          localStorage.removeItem('user');
          setState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } else {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    // Simulate API call
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          setState({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
          });
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  }, []);

  const register = useCallback(async ({ name, email, password }: RegisterData) => {
    // Simulate API call
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers.some(u => u.email === email)) {
          reject(new Error('Email already in use'));
          return;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          isAdmin: false,
        };

        localStorage.setItem('user', JSON.stringify(newUser));
        setState({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
        resolve(newUser);
      }, 500);
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    register,
    logout,
  };
}