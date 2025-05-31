import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock interview questions - in a real app these would come from the API
const mockQuestions = [
  "Can you explain the difference between controlled and uncontrolled components in React?",
  "How would you optimize the performance of a React application?",
  "Explain how CSS specificity works and how to manage it in large projects.",
  "What are closures in JavaScript and how might you use them?",
];

const LiveInterview: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(120); // 2 minutes per question
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showThinking, setShowThinking] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  // Handle question navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setRemainingTime(120);
      setTranscript('');
      setShowThinking(true);
      
      // Simulate AI thinking
      setTimeout(() => {
        setShowThinking(false);
      }, 1500);
    } else {
      // Interview is complete
      navigate('/interview/results/int1');
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setRemainingTime(120);
      setShowThinking(true);
      
      // Simulate AI thinking
      setTimeout(() => {
        setShowThinking(false);
      }, 1500);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (remainingTime > 0 && !showThinking) {
      timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      // Auto-advance to next question when time is up
      goToNextQuestion();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [remainingTime, showThinking]);
  
  // Simulate loading the interview
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowThinking(true);
      
      // Simulate AI thinking
      setTimeout(() => {
        setShowThinking(false);
      }, 2000);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate speech-to-text (in a real app, this would use a real API)
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    
    setIsRecording(true);
    
    // Mock transcription updates
    const sentences = [
      "In React, controlled components are those where form data is handled by React state.",
      "The component state becomes the single source of truth for the input value.",
      "Any changes to the input are reflected in state through onChange handlers.",
      "Uncontrolled components are where form data is handled by the DOM itself.",
      "Instead of using state, you would use refs to get values from the DOM.",
      "Controlled components provide more control but require more code to set up.",
      "Uncontrolled components are simpler but less predictable.",
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < sentences.length) {
        setTranscript(prev => prev + (prev ? ' ' : '') + sentences[currentIndex]);
        currentIndex++;
        
        // Scroll to bottom of transcript
        if (transcriptRef.current) {
          transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsRecording(false);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 border-t-4 border-b-4 border-primary-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">Preparing your interview...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Header with progress and timer */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Question {currentQuestionIndex + 1} of {mockQuestions.length}
          </span>
          <div className="ml-4 w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 dark:bg-primary-400"
              style={{ width: `${((currentQuestionIndex + 1) / mockQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className={`flex items-center py-1 px-3 rounded-full 
          ${remainingTime < 30 ? 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}
        `}>
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">{formatTime(remainingTime)}</span>
        </div>
      </div>
      
      {/* AI Interviewer */}
      <div className="card p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <span className="text-primary-700 dark:text-primary-300 font-medium">AI</span>
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Interviewer</h3>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                Speaking
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              {showThinking ? (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 flex items-center text-gray-600 dark:text-gray-400"
                >
                  <div className="flex space-x-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="ml-2">Thinking...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 text-gray-800 dark:text-gray-200"
                >
                  {mockQuestions[currentQuestionIndex]}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* User Response Area */}
      <div className="card p-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
              <span className="text-secondary-700 dark:text-secondary-300 font-medium">You</span>
            </div>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Response</h3>
              {isRecording && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400 animate-pulse">
                  Recording
                </span>
              )}
            </div>
            
            <div 
              ref={transcriptRef}
              className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-md min-h-[120px] max-h-[200px] overflow-y-auto"
            >
              {transcript ? (
                <p className="text-gray-800 dark:text-gray-200">{transcript}</p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">
                  {isRecording ? "Listening..." : "Click the microphone button to start speaking..."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0 || showThinking}
          className="btn btn-outline flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        
        <button
          onClick={toggleRecording}
          disabled={showThinking}
          className={`btn rounded-full w-14 h-14 flex items-center justify-center ${
            isRecording ? 'bg-error-600 hover:bg-error-700 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        
        <button
          onClick={goToNextQuestion}
          disabled={showThinking}
          className="btn btn-outline flex items-center"
        >
          {currentQuestionIndex === mockQuestions.length - 1 ? 'Finish' : 'Next'}
          {currentQuestionIndex < mockQuestions.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
        </button>
      </div>
    </div>
  );
};

export default LiveInterview;