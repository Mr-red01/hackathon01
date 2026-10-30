export type DashboardTab = 'home' | 'analytics' | 'calendar' | 'quiz' | 'classroom';

export interface StudentProfile {
  name: string;
  email: string;
  avatarUrl: string;
  title: string;
  gamePlan: string;
}

export interface LearningPreference {
  name: string;
  percentage: number;
  color: string;
}

export interface LearningValue {
  label: string;
  emoji: string;
}

export interface LearningCourse {
  id: string;
  title: string;
  subject: string;
  progress: number;
  duration: string;
  dueDate?: string;
  dueSoon?: boolean;
  theme: 'pink' | 'cyan' | 'purple';
  avatars?: string[];
  iconType: 'magnet' | 'ruler' | 'dna';
  description: string;
  modulesCompleted: number;
  totalModules: number;
}

export interface Tutor {
  id: string;
  name: string;
  courseTag: string;
  lastActive: string;
  description: string;
  avatarType: 'coder' | 'physicist';
  specialty: string;
  color: string;
}

export interface StudyDay {
  date: string;
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
  hours: number;
}

export interface TaskItem {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface QuizQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  topic?: string;
  isMastered?: boolean;
}

export interface FlashcardDeck {
  id: string;
  subject: string;
  shortName: string;
  title: string;
  description: string;
  theme: 'pink' | 'cyan' | 'purple' | 'emerald' | 'amber' | 'blue';
  iconType: 'beaker' | 'math' | 'atom' | 'magnet' | 'ruler' | 'dna';
  cards: Flashcard[];
  syllabusSource?: string;
  lastStudied?: string;
}

export interface SyllabusModule {
  id: string;
  title: string;
  subject: string;
  syllabusText: string;
  createdAt: string;
  questionsCount: number;
  questions: QuizQuestion[];
  isCustom?: boolean;
}


