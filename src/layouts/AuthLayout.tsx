import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import ThemeToggle from '../components/common/ThemeToggle';

const AuthLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - illustration/info */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 dark:bg-primary-900 text-white flex-col p-10">
        <div className="flex items-center mb-12">
          <Sparkles className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">InterviewPro AI</h1>
        </div>
        
        <div className="flex-grow flex flex-col justify-center max-w-lg mx-auto">
          <h2 className="text-4xl font-bold mb-6">Master your interview skills with AI</h2>
          <p className="text-lg text-primary-100 mb-8">
            Practice interviews with our AI interviewer, get real-time feedback, and track your progress over time.
          </p>
          
          <div className="space-y-6">
            {[
              {
                title: 'Personalized Practice',
                description: 'Configure interviews based on your role, experience level, and topics.'
              },
              {
                title: 'Real-time Analysis',
                description: 'Get instant feedback on your answers, delivery, and confidence.'
              },
              {
                title: 'Progress Tracking',
                description: 'See your improvement over time with detailed analytics.'
              }
            ].map((feature, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary-400 text-primary-900">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{feature.title}</h3>
                  <p className="mt-1 text-primary-200">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-auto text-sm text-primary-300">
          © 2025 InterviewPro AI. All rights reserved.
        </div>
      </div>
      
      {/* Right side - auth form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between p-6">
          <div className="lg:hidden flex items-center">
            <Sparkles className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
            <span className="font-bold text-xl">InterviewPro AI</span>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
        
        <div className="flex-grow flex flex-col items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;