import React from 'react';
import { AIAssistantCard } from '../home/AIAssistantCard';
import { FlashcardsSection } from '../home/FlashcardsSection';
import { TutorsSection } from '../home/TutorsSection';
import { LearningProgressSection } from '../home/LearningProgressSection';
import type { Tutor, FlashcardDeck } from '../../types';

interface HomeViewProps {
  userName: string;
  flashcardDecks: FlashcardDeck[];
  onOpenFlashcardDeck: (deck: FlashcardDeck) => void;
  onOpenAddFlashcardSyllabus: () => void;
  tutors: Tutor[];
  onSelectTutor: (tutor: Tutor) => void;
  onOpenAnalytics: () => void;
  onTriggerQuiz: () => void;
  onPromptFromClassroom?: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userName,
  flashcardDecks,
  onOpenFlashcardDeck,
  onOpenAddFlashcardSyllabus,
  tutors,
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

      {/* Flashcards Section: Che, Maths & Phy (Replaced the 3 div box) */}
      <FlashcardsSection
        decks={flashcardDecks}
        onOpenDeck={onOpenFlashcardDeck}
        onOpenAddSyllabus={onOpenAddFlashcardSyllabus}
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
