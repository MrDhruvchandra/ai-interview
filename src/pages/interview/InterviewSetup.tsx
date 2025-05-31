import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Briefcase, GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockRoles, mockExperienceLevels, mockTopics, mockDurations } from '../../services/mockData';

const InterviewSetup: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<string>('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [duration, setDuration] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available topics based on selected role
  const availableTopics = role ? mockTopics[role as keyof typeof mockTopics] : [];

  const handleTopicToggle = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      if (selectedTopics.length < 5) {
        setSelectedTopics([...selectedTopics, topic]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role || !experienceLevel || selectedTopics.length === 0) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call to create interview session
    setTimeout(() => {
      navigate('/interview/live');
    }, 1000);
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Configure Your Interview</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Customize your AI interview experience based on your preferences.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Role selection */}
        <motion.div 
          className="card p-6"
          initial="hidden"
          animate="visible"
          variants={stepVariants}
        >
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900">
                <Briefcase className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Select Role</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose the role you're interviewing for
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mockRoles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  setSelectedTopics([]);
                }}
                className={`relative flex items-center px-4 py-3 rounded-md border transition-all
                  ${role === r 
                    ? 'border-primary-500 ring-2 ring-primary-200 dark:ring-primary-900 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                  }
                `}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">{r}</span>
                {role === r && (
                  <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 absolute right-3" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Experience level */}
        <motion.div 
          className="card p-6"
          initial="hidden"
          animate="visible"
          variants={stepVariants}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-900">
                <GraduationCap className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Experience Level</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select your experience level
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mockExperienceLevels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setExperienceLevel(level)}
                className={`relative flex items-center px-4 py-3 rounded-md border transition-all
                  ${experienceLevel === level 
                    ? 'border-secondary-500 ring-2 ring-secondary-200 dark:ring-secondary-900 bg-secondary-50 dark:bg-secondary-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-secondary-300 dark:hover:border-secondary-700'
                  }
                `}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">{level}</span>
                {experienceLevel === level && (
                  <CheckCircle className="w-5 h-5 text-secondary-600 dark:text-secondary-400 absolute right-3" />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Topics */}
        <motion.div 
          className="card p-6"
          initial="hidden"
          animate="visible"
          variants={stepVariants}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900">
                <BookOpen className="w-4 h-4 text-accent-600 dark:text-accent-400" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Topics</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select up to 5 topics to focus on (requires role selection)
              </p>
            </div>
          </div>
          
          {role ? (
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedTopics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300"
                  >
                    {topic}
                    <button
                      type="button"
                      onClick={() => handleTopicToggle(topic)}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-200 dark:bg-accent-800 text-accent-800 dark:text-accent-300 hover:bg-accent-300 dark:hover:bg-accent-700"
                    >
                      <span className="sr-only">Remove topic</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {availableTopics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    disabled={selectedTopics.length >= 5 && !selectedTopics.includes(topic)}
                    onClick={() => handleTopicToggle(topic)}
                    className={`px-3 py-2 rounded-md text-sm font-medium text-left transition-colors
                      ${selectedTopics.includes(topic) 
                        ? 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }
                      ${selectedTopics.length >= 5 && !selectedTopics.includes(topic) ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {topic}
                  </button>
                ))}
              </div>
              
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Selected: {selectedTopics.length}/5 topics
              </p>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">Please select a role first</p>
            </div>
          )}
        </motion.div>

        {/* Duration */}
        <motion.div 
          className="card p-6"
          initial="hidden"
          animate="visible"
          variants={stepVariants}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning-100 dark:bg-warning-900">
                <Clock className="w-4 h-4 text-warning-600 dark:text-warning-400" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Duration</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select interview duration in minutes
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mockDurations.map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => setDuration(mins)}
                className={`relative flex items-center justify-center px-4 py-3 rounded-md border transition-all
                  ${duration === mins 
                    ? 'border-warning-500 ring-2 ring-warning-200 dark:ring-warning-900 bg-warning-50 dark:bg-warning-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-warning-300 dark:hover:border-warning-700'
                  }
                `}
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">{mins} min</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!role || !experienceLevel || selectedTopics.length === 0 || isSubmitting}
            className="btn btn-primary px-8"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Starting Interview...
              </span>
            ) : (
              'Start Interview'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewSetup;