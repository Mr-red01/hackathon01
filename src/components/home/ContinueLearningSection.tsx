import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { LearningCourse } from '../../types';
import {
  MagnetIllustration,
  RulerIllustration,
  DnaIllustration,
} from '../illustrations/CourseIllustrations';

interface ContinueLearningSectionProps {
  courses: LearningCourse[];
  onSelectCourse: (course: LearningCourse) => void;
}

export const ContinueLearningSection: React.FC<ContinueLearningSectionProps> = ({
  courses,
  onSelectCourse,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const renderIllustration = (type: string) => {
    switch (type) {
      case 'magnet':
        return <MagnetIllustration className="w-20 h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />;
      case 'ruler':
        return <RulerIllustration className="w-20 h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />;
      case 'dna':
        return <DnaIllustration className="w-20 h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />;
      default:
        return <Sparkles className="w-12 h-12 text-blue-500" />;
    }
  };

  const getBannerBg = (theme: string) => {
    switch (theme) {
      case 'pink':
        return 'bg-[#fceeed]';
      case 'cyan':
        return 'bg-[#e5f5f9]';
      case 'purple':
        return 'bg-[#f0edfa]';
      default:
        return 'bg-slate-50';
    }
  };

  return (
    <section className="mt-8">
      {/* Header with Carousel Controls */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-bold text-[#243B64] tracking-tight">
          Continue Learning
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full bg-white border border-[#E2E8F8] shadow-xs flex items-center justify-center text-slate-500 hover:text-[#243B64] hover:bg-[#F0F4FF] transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full bg-white border border-[#E2E8F8] shadow-xs flex items-center justify-center text-slate-500 hover:text-[#243B64] hover:bg-[#F0F4FF] transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Grid / Carousel */}
      <div
        ref={scrollRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar"
      >
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="group bg-white rounded-2xl border border-[#E2E8F8] p-3 shadow-xs hover:shadow-[0_12px_28px_-4px_rgba(36,59,100,0.1)] hover:-translate-y-1 hover:border-[#BFD5FA] transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Visual Container */}
            <div
              className={`w-full h-32 rounded-xl ${getBannerBg(
                course.theme
              )} relative flex items-center justify-center p-3 mb-3.5 transition-colors overflow-hidden`}
            >
              {/* Due Date Badge */}
              {course.dueDate && (
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-[11px] font-medium text-slate-700 px-2.5 py-0.5 rounded-full shadow-xs border border-white">
                  {course.dueDate}
                </div>
              )}

              {/* Avatars */}
              {course.avatars && course.avatars.length > 0 && (
                <div className="absolute top-2.5 right-2.5 flex -space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {course.avatars[0]}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {course.avatars[1]}
                  </span>
                </div>
              )}

              {/* 3D Illustration */}
              {renderIllustration(course.iconType)}
            </div>

            {/* Course Meta Info */}
            <div className="px-1">
              <h4 className="font-bold text-[#243B64] text-sm tracking-tight truncate group-hover:text-blue-600 transition-colors">
                {course.title}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {course.subject}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              {/* Progress text */}
              <div className="text-[11px] font-medium text-slate-500 mt-2 flex items-center gap-1.5">
                <span>{course.progress}% complete</span>
                <span>•</span>
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
