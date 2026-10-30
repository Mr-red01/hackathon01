import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, MessageSquare } from 'lucide-react';
import type { Tutor } from '../../types';
import {
  CoderTutorAvatar,
  PhysicsTutorAvatar,
} from '../illustrations/CourseIllustrations';

interface TutorsSectionProps {
  tutors: Tutor[];
  onSelectTutor: (tutor: Tutor) => void;
}

export const TutorsSection: React.FC<TutorsSectionProps> = ({
  tutors,
  onSelectTutor,
}) => {
  return (
    <section className="mt-8">
      {/* Header with Navigation arrows */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight">
          Tutors
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            aria-label="Previous tutors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="w-7 h-7 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            aria-label="Next tutors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor.id}
            onClick={() => onSelectTutor(tutor)}
            className="group bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex items-center gap-4"
          >
            {/* Illustrated Thumbnail */}
            {tutor.avatarType === 'coder' ? (
              <CoderTutorAvatar className="w-16 h-16 md:w-20 md:h-20" />
            ) : (
              <PhysicsTutorAvatar className="w-16 h-16 md:w-20 md:h-20" />
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm tracking-tight truncate group-hover:text-blue-600 transition-colors">
                  {tutor.name}
                </h4>
                <span className="text-[11px] font-medium text-slate-400 group-hover:text-blue-600 transition-colors flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Course Tag & Last Active */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <span className="font-medium text-slate-700">{tutor.courseTag}</span>
                <span>•</span>
                <span>{tutor.lastActive}</span>
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {tutor.description}
              </p>

              {/* Quick Chat Pill */}
              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <MessageSquare className="w-3 h-3" />
                <span>Chat with {tutor.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
