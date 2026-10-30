import React, { useState } from 'react';
import { X, Play, CheckCircle, Clock } from 'lucide-react';
import type { LearningCourse } from '../../types';
import {
  MagnetIllustration,
  RulerIllustration,
  DnaIllustration,
} from '../illustrations/CourseIllustrations';

interface CourseModalProps {
  course: LearningCourse | null;
  onClose: () => void;
  onUpdateProgress: (courseId: string, newProgress: number) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  onUpdateProgress,
}) => {
  if (!course) return null;

  const [currentProgress, setCurrentProgress] = useState(course.progress);
  const [completedNotification, setCompletedNotification] = useState(false);

  const handleStudySession = () => {
    const nextVal = Math.min(100, currentProgress + 10);
    setCurrentProgress(nextVal);
    onUpdateProgress(course.id, nextVal);
    setCompletedNotification(true);
    setTimeout(() => setCompletedNotification(false), 2500);
  };

  const renderIllustration = () => {
    switch (course.iconType) {
      case 'magnet':
        return <MagnetIllustration className="w-24 h-24" />;
      case 'ruler':
        return <RulerIllustration className="w-24 h-24" />;
      case 'dna':
        return <DnaIllustration className="w-24 h-24" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative overflow-hidden animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header & Visual */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center p-2 border border-slate-100">
            {renderIllustration()}
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full">
              {course.subject}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {course.title}
            </h3>
            {course.dueDate && (
              <p className="text-xs text-rose-600 font-medium mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {course.dueDate}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {course.description}
        </p>

        {/* Progress Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Overall Module Completion</span>
            <span className="text-blue-600">{currentProgress}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
            <span>
              {course.modulesCompleted} of {course.totalModules} modules mastered
            </span>
            <span>Est. {course.duration} remaining</span>
          </div>
        </div>

        {/* Success toast */}
        {completedNotification && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Progress recorded! +10% module completed. Keep it up!</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleStudySession}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all hover:shadow-md"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Continue 15-min Study Sprint</span>
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
