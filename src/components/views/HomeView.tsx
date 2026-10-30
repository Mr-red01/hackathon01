import React from 'react';
import { AIAssistantCard } from '../home/AIAssistantCard';
import { ContinueLearningSection } from '../home/ContinueLearningSection';
import { TutorsSection } from '../home/TutorsSection';
import { LearningProgressSection } from '../home/LearningProgressSection';
import type { LearningCourse, Tutor } from '../../types';

interface HomeViewProps {
  userName: string;
  courses: LearningCourse[];
  tutors: Tutor[];
  onSelectCourse: (course: LearningCourse) => void;
  onSelectTutor: (tutor: Tutor) => void;
  onOpenAnalytics: () => void;
  onTriggerQuiz: () => void;
  onPromptFromClassroom?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userName,
  courses,
  tutors,
  onSelectCourse,
  onSelectTutor,
  onOpenAnalytics,
  onTriggerQuiz,
  onPromptFromClassroom,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Greeting Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Good Morning, {userName}
        </h1>
      </div>

      {/* AI Assistant Input Card */}
      <AIAssistantCard
        onTriggerQuiz={onTriggerQuiz}
        defaultTopic={onPromptFromClassroom}
      />

      {/* Continue Learning Section */}
      <ContinueLearningSection
        courses={courses}
        onSelectCourse={onSelectCourse}
      />

      {/* Tutors Section */}
      <TutorsSection
        tutors={tutors}
        onSelectTutor={onSelectTutor}
      />

      {/* Learning Progress / Visual Tracker Section */}
      <LearningProgressSection
        onOpenAnalytics={onOpenAnalytics}
      />
    </div>
  );
};
