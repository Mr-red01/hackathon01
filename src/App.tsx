import React, { useState } from 'react';
import { Menu, Sparkles } from 'lucide-react';
import type { DashboardTab, Tutor, StudentProfile, TaskItem, FlashcardDeck } from './types';
import {
  initialProfile,
  learningPreferences,
  learningValues,
  initialFlashcardDecks,
  tutorsList,
  generateHeatmapData,
  initialTasks
} from './data/mockData';
import { LeftSidebar } from './components/sidebar/LeftSidebar';
import { RightSidebar } from './components/sidebar/RightSidebar';
import { HomeView } from './components/views/HomeView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { CalendarView } from './components/views/CalendarView';
import { QuizView } from './components/views/QuizView';
import { ClassroomView } from './components/views/ClassroomView';
import { TutorModal } from './components/modals/TutorModal';
import { FlashcardModal } from './components/modals/FlashcardModal';
import { SmartieAvatar } from './components/illustrations/CourseIllustrations';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<DashboardTab>('home');
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core state
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [flashcardDecks, setFlashcardDecks] = useState<FlashcardDeck[]>(initialFlashcardDecks);
  const [tutors] = useState<Tutor[]>(tutorsList);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [heatmapWeeks] = useState(generateHeatmapData);

  // Modals state
  const [activeFlashcardDeck, setActiveFlashcardDeck] = useState<FlashcardDeck | null>(null);
  const [openSyllabusFormDirectly, setOpenSyllabusFormDirectly] = useState(false);
  const [activeTutorModal, setActiveTutorModal] = useState<Tutor | null>(null);
  const [prefilledAIPrompt, setPrefilledAIPrompt] = useState<string>('');

  const handleSelectTab = (tab: DashboardTab) => {
    setCurrentTab(tab);
    setSelectedClassroom(null);
  };

  const handleSelectClassroom = (classroom: string) => {
    setSelectedClassroom(classroom);
    setCurrentTab('classroom');
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (newTask: Omit<TaskItem, 'id'>) => {
    const task: TaskItem = {
      ...newTask,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [task, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleAskAIFromClassroom = (prompt: string) => {
    setPrefilledAIPrompt(prompt);
    setSelectedClassroom(null);
    setCurrentTab('home');
  };

  const handleOpenDeck = (deck: FlashcardDeck) => {
    setActiveFlashcardDeck(deck);
    setOpenSyllabusFormDirectly(false);
  };

  const handleOpenAddSyllabus = () => {
    // Open the first deck with addSyllabus form mode enabled
    setActiveFlashcardDeck(flashcardDecks[0]);
    setOpenSyllabusFormDirectly(true);
  };

  const handleUpdateDeck = (updatedDeck: FlashcardDeck) => {
    setFlashcardDecks((prev) =>
      prev.map((d) => (d.id === updatedDeck.id ? updatedDeck : d))
    );
    setActiveFlashcardDeck(updatedDeck);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-800 flex flex-col antialiased">
      {/* Top Bar for Mobile & Tablet */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/70 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold text-lg text-[#243B64] tracking-tight font-sans">
            Smartie
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSelectTab('quiz')}
            className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100"
            title="AI Quiz"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
          </button>
          <div
            onClick={() => handleSelectTab('analytics')}
            className="cursor-pointer"
          >
            <SmartieAvatar size="sm" />
          </div>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar */}
        <LeftSidebar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          selectedClassroom={selectedClassroom}
          onSelectClassroom={handleSelectClassroom}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Center Main Dashboard Content */}
        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8 max-w-5xl mx-auto w-full min-w-0">
          {selectedClassroom && currentTab === 'classroom' ? (
            <ClassroomView
              classroomName={selectedClassroom}
              onBackToHome={() => {
                setSelectedClassroom(null);
                setCurrentTab('home');
              }}
              onAskAI={handleAskAIFromClassroom}
            />
          ) : currentTab === 'home' ? (
            <HomeView
              userName={profile.name}
              flashcardDecks={flashcardDecks}
              onOpenFlashcardDeck={handleOpenDeck}
              onOpenAddFlashcardSyllabus={handleOpenAddSyllabus}
              tutors={tutors}
              onSelectTutor={(tutor) => setActiveTutorModal(tutor)}
              onOpenAnalytics={() => handleSelectTab('analytics')}
              onTriggerQuiz={() => handleSelectTab('quiz')}
              onPromptFromClassroom={prefilledAIPrompt}
            />
          ) : currentTab === 'analytics' ? (
            <AnalyticsView />
          ) : currentTab === 'calendar' ? (
            <CalendarView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
            />
          ) : currentTab === 'quiz' ? (
            <QuizView />
          ) : null}
        </main>

        {/* Right Sidebar (Responsive on Desktop / XL) */}
        <div className="hidden xl:block">
          <RightSidebar
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            preferences={learningPreferences}
            values={learningValues}
            heatmapWeeks={heatmapWeeks}
            onValueClick={(val) => {
              setPrefilledAIPrompt(`How can I embody the value of "${val}" in my Physics and Coding study sessions?`);
              setCurrentTab('home');
            }}
          />
        </div>
      </div>

      {/* Modals */}
      <FlashcardModal
        deck={activeFlashcardDeck}
        onClose={() => setActiveFlashcardDeck(null)}
        onUpdateDeck={handleUpdateDeck}
        defaultOpenSyllabusForm={openSyllabusFormDirectly}
      />

      <TutorModal
        tutor={activeTutorModal}
        onClose={() => setActiveTutorModal(null)}
      />
    </div>
  );
};

export default App;
