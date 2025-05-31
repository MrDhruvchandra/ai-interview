import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout components
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import InterviewSetup from './pages/interview/InterviewSetup';
import LiveInterview from './pages/interview/LiveInterview';
import Results from './pages/interview/Results';
import Profile from './pages/Profile';
import AdminPanel from './pages/admin/AdminPanel';
import NotFound from './pages/NotFound';

// Auth guard component
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/interview/setup" element={<InterviewSetup />} />
            <Route path="/interview/live" element={<LiveInterview />} />
            <Route path="/interview/results/:id" element={<Results />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;