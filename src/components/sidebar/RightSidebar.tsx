import React, { useState } from 'react';
import { Edit2, Check, Sparkles } from 'lucide-react';
import type {
  StudentProfile,
  LearningPreference,
  LearningValue,
  StudyDay
} from '../../types';
import { HanaAvatar } from '../illustrations/CourseIllustrations';

interface RightSidebarProps {
  profile: StudentProfile;
  onUpdateProfile?: (updated: Partial<StudentProfile>) => void;
  preferences: LearningPreference[];
  values: LearningValue[];
  heatmapWeeks: StudyDay[][];
  onValueClick?: (value: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  profile,
  onUpdateProfile,
  preferences,
  values,
  heatmapWeeks,
  onValueClick,
}) => {
  const [isEditingGamePlan, setIsEditingGamePlan] = useState(false);
  const [gamePlanText, setGamePlanText] = useState(profile.gamePlan);
  const [hoveredDay, setHoveredDay] = useState<StudyDay | null>(null);

  const handleSaveGamePlan = () => {
    setIsEditingGamePlan(false);
    if (onUpdateProfile && gamePlanText.trim()) {
      onUpdateProfile({ gamePlan: gamePlanText.trim() });
    }
  };

  // Color mapping for heatmap levels
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-slate-100 hover:ring-1 hover:ring-slate-300';
      case 1:
        return 'bg-blue-200 hover:ring-1 hover:ring-blue-400';
      case 2:
        return 'bg-blue-400 hover:ring-1 hover:ring-blue-500';
      case 3:
        return 'bg-blue-600 hover:ring-1 hover:ring-blue-700';
      case 4:
        return 'bg-[#1e3a8a] hover:ring-1 hover:ring-blue-900';
      default:
        return 'bg-slate-100';
    }
  };

  return (
    <aside className="w-full xl:w-80 bg-white border-l border-slate-200/70 p-6 flex flex-col gap-6 overflow-y-auto">
      {/* Top Student Profile Card */}
      <div className="flex items-center gap-4">
        <HanaAvatar size="lg" />
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
            {profile.name}
          </h2>
          <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-0.5">
            {profile.title}
          </span>
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* GAME PLAN */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Game Plan
          </span>
          <button
            onClick={() => {
              if (isEditingGamePlan) {
                handleSaveGamePlan();
              } else {
                setIsEditingGamePlan(true);
              }
            }}
            className="text-slate-400 hover:text-blue-600 transition-colors p-1"
            title={isEditingGamePlan ? 'Save goal' : 'Edit goal'}
          >
            {isEditingGamePlan ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Edit2 className="w-3 h-3" />
            )}
          </button>
        </div>

        {isEditingGamePlan ? (
          <div className="space-y-2">
            <textarea
              value={gamePlanText}
              onChange={(e) => setGamePlanText(e.target.value)}
              className="w-full text-xs font-medium text-slate-700 p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-blue-50/20"
              rows={3}
              autoFocus
            />
            <button
              onClick={handleSaveGamePlan}
              className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md font-medium hover:bg-blue-700"
            >
              Update Plan
            </button>
          </div>
        ) : (
          <p className="text-[13px] font-semibold text-slate-800 leading-snug">
            {profile.gamePlan}
          </p>
        )}
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* HOW I LIKE TO LEARN */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3.5">
          How I Like To Learn
        </div>

        <div className="space-y-3">
          {preferences.map((pref) => (
            <div key={pref.name} className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-medium">{pref.name}</span>
              <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pref.percentage}%`,
                    backgroundColor: pref.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* VALUES */}
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
          Values
        </div>

        <div className="flex flex-wrap gap-2">
          {values.map((v) => (
            <button
              key={v.label}
              onClick={() => onValueClick && onValueClick(v.label)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-700 transition-colors"
            >
              <span>{v.emoji}</span>
              <span>{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full" />

      {/* LEARNING SESSIONS (HEATMAP) */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-[13px] font-bold text-slate-800">Learning Sessions</div>
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
        </div>
        <div className="text-xs text-slate-500 mb-4 font-normal">
          174 study sessions in the last year
        </div>

        {/* Month labels */}
        <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1 mb-2">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
        </div>

        {/* Heatmap Grid */}
        <div className="relative">
          <div className="grid grid-flow-col grid-rows-7 gap-[3px] p-2 bg-slate-50/70 rounded-xl border border-slate-100">
            {heatmapWeeks.map((week, wIdx) =>
              week.map((day, dIdx) => (
                <div
                  key={`${wIdx}-${dIdx}`}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-3.5 h-3.5 rounded-[3px] transition-colors cursor-pointer ${getLevelColor(
                    day.level
                  )}`}
                />
              ))
            )}
          </div>

          {/* Interactive Tooltip */}
          {hoveredDay && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-30">
              <span className="font-semibold">{hoveredDay.date}:</span>{' '}
              {hoveredDay.count > 0
                ? `${hoveredDay.count} sessions (${hoveredDay.hours} hrs)`
                : 'No study recorded'}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 text-[11px] text-slate-400 mt-3 px-1">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-100" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-200" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-400" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-blue-600" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1e3a8a]" />
          <span>More</span>
        </div>
      </div>
    </aside>
  );
};
