import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, ChevronDown, ChevronUp, ArrowLeft, Bookmark } from 'lucide-react';
import { 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';
import { mockInterviews, mockInterviewDetails } from '../../services/mockData';

const Results: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  
  // Get interview and details
  const interview = mockInterviews.find(interview => interview.id === id);
  const interviewDetails = mockInterviewDetails[id as keyof typeof mockInterviewDetails];
  
  if (!interview || !interviewDetails) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Interview not found</h2>
        <Link to="/" className="mt-4 inline-flex items-center text-primary-600 dark:text-primary-400">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    );
  }
  
  // Toggle question expansion
  const toggleQuestion = (questionId: string) => {
    if (expandedQuestions.includes(questionId)) {
      setExpandedQuestions(expandedQuestions.filter(id => id !== questionId));
    } else {
      setExpandedQuestions([...expandedQuestions, questionId]);
    }
  };
  
  // Prepare radar chart data
  const radarData = [
    { subject: 'Technical Knowledge', A: 85 },
    { subject: 'Communication', A: 70 },
    { subject: 'Problem Solving', A: 80 },
    { subject: 'Cultural Fit', A: 90 },
    { subject: 'Code Quality', A: 75 },
  ];
  
  // Prepare question score data
  const questionScoreData = interviewDetails.questions.map((q, index) => ({
    name: `Q${index + 1}`,
    score: q.score,
  }));
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Interview Results</h1>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="text-gray-600 dark:text-gray-400">{interview.role}</span>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <span className="text-gray-600 dark:text-gray-400">{interview.experienceLevel}</span>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <span className="text-gray-600 dark:text-gray-400">{interview.duration} min</span>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium
            ${interview.score >= 80 ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400' : ''}
            ${interview.score >= 60 && interview.score < 80 ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400' : ''}
            ${interview.score < 60 ? 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400' : ''}
          `}>
            {interview.score}% Score
          </span>
        </div>
      </div>
      
      {/* Summary card */}
      <div className="card p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Performance Summary</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar chart */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Performance by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Question scores */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Question Scores</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={questionScoreData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Strengths and weaknesses */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Strengths</h3>
            <ul className="space-y-2">
              {interviewDetails.summary.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300 flex items-center justify-center mr-2 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Areas for Improvement</h3>
            <ul className="space-y-2">
              {interviewDetails.summary.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-warning-100 text-warning-700 dark:bg-warning-900 dark:text-warning-300 flex items-center justify-center mr-2 mt-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Overall feedback */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Overall Feedback</h3>
          <p className="text-gray-800 dark:text-gray-200">
            {interviewDetails.summary.overallFeedback}
          </p>
        </div>
      </div>
      
      {/* Question details */}
      <div className="card overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Question Details</h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {interviewDetails.questions.map((question, index) => (
            <div key={question.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 font-medium">
                    {index + 1}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">{question.text}</h3>
                    <div className="mt-1 flex items-center space-x-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Time: {Math.floor(question.timeSpent / 60)}:{(question.timeSpent % 60).toString().padStart(2, '0')}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                        ${question.score >= 80 ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400' : ''}
                        ${question.score >= 60 && question.score < 80 ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400' : ''}
                        ${question.score < 60 ? 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400' : ''}
                      `}>
                        Score: {question.score}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="flex-shrink-0 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  {expandedQuestions.includes(question.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedQuestions.includes(question.id) && (
                <div className="mt-4 ml-11 space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Your Answer:</h4>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">{question.answer}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 dark:text-gray-300">Feedback:</h4>
                    <p className="mt-1 text-gray-800 dark:text-gray-200">{question.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Learning resources */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Resources</h2>
        
        <ul className="space-y-3">
          {interviewDetails.summary.recommendedResources.map((resource, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <Bookmark className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
              </div>
              <span className="ml-3 text-gray-800 dark:text-gray-200">{resource}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between">
        <Link to="/" className="btn btn-outline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
        
        <button className="btn btn-primary flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Results;