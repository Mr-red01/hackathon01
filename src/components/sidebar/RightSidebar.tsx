import React, { useState } from 'react';
import { Edit2, Check, Sparkles } from 'lucide-react';
import type {
  StudentProfile,
  LearningPreference,
  LearningValue,
  StudyDay
} from '../../types';
import { SmartieAvatar } from '../illustrations/CourseIllustrations';

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

  // Cohesive blue palette for heatmap levels
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return 'bg-white hover:ring-1 hover:ring-blue-200';
      case 1:
        return 'bg-[#C8DBFC] hover:ring-1 hover:ring-blue-400';
      case 2:
        return 'bg-[#7EABF7] hover:ring-1 hover:ring-blue-500';
      case 3:
        return 'bg-[#3B82F6] hover:ring-1 hover:ring-blue-600';
      case 4:
        return 'bg-[#243B64] hover:ring-1 hover:ring-[#162540]';
      default:
        return 'bg-white';
    }
  };

  return (
    <aside className="w-full xl:w-80 bg-[#F0F4FF] border-l border-[#E2E8F8] p-6 flex flex-col gap-5 overflow-y-auto">
      {/* Top Student Profile Card */}
      <div className="flex items-center gap-3.5 bg-white p-3.5 rounded-2xl border border-[#E2E8F8] shadow-[0_2px_8px_-2px_rgba(36,59,100,0.05)] hover:shadow-md transition-shadow">
        <SmartieAvatar size="lg" />
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-[#243B64] tracking-tight truncate">
            {profile.name}
          </h2>
          <span className="text-[10px] font-bold tracking-wider text-[#243B64] uppercase bg-[#F0F4FF] border border-[#D6E2FC] px-2 py-0.5 rounded-md inline-block mt-0.5">
            {profile.title}
          </span>
        </div>
      </div>

      {/* GAME PLAN CARD */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F8] shadow-[0_2px_8px_-2px_rgba(36,59,100,0.04)] hover:border-[#D6E2FC] transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A91B4]">
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
            className="text-[#7A91B4] hover:text-blue-600 transition-colors p-1"
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
              className="w-full text-xs font-medium text-[#243B64] p-2.5 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-blue-50/30"
              rows={3}
              autoFocus
            />
            <button
              onClick={handleSaveGamePlan}
              className="text-xs bg-[#243B64] hover:bg-[#162540] text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              Update Plan
            </button>
          </div>
        ) : (
          <p className="text-xs font-semibold text-[#243B64] leading-relaxed">
            {profile.gamePlan}
          </p>
        )}
      </div>

      {/* HOW I LIKE TO LEARN CARD */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F8] shadow-[0_2px_8px_-2px_rgba(36,59,100,0.04)]">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A91B4] mb-3">
          How I Like To Learn
        </div>

        <div className="space-y-3">
          {preferences.map((pref) => (
            <div key={pref.name} className="flex items-center justify-between text-xs">
              <span className="text-[#243B64] font-medium">{pref.name}</span>
              <div className="w-24 h-2 bg-[#F0F4FF] rounded-full overflow-hidden border border-[#E2E8F8]/60">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pref.percentage}%`,
                    backgroundColor: pref.color === '#f97316' ? '#2563eb' : pref.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VALUES CARD */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F8] shadow-[0_2px_8px_-2px_rgba(36,59,100,0.04)]">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A91B4] mb-3">
          Values
        </div>

        <div className="flex flex-wrap gap-2">
          {values.map((v) => (
            <button
              key={v.label}
              onClick={() => onValueClick && onValueClick(v.label)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F0F4FF] hover:bg-white text-[#243B64] border border-[#D6E2FC] hover:shadow-[0_2px_6px_-1px_rgba(36,59,100,0.08)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{v.emoji}</span>
              <span>{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* LEARNING SESSIONS (HEATMAP) CARD */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F8] shadow-[0_2px_8px_-2px_rgba(36,59,100,0.04)]">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-bold text-[#243B64]">Learning Sessions</div>
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        </div>
        <div className="text-[11px] text-[#7A91B4] mb-3 font-normal">
          174 study sessions in the last year
        </div>

        {/* Month labels */}
        <div className="flex justify-between text-[10px] text-[#7A91B4] font-semibold px-1 mb-1.5">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
        </div>

        {/* Heatmap Grid */}
        <div className="relative">
          <div className="grid grid-flow-col grid-rows-7 gap-[3px] p-2 bg-[#F0F4FF]/70 rounded-xl border border-[#E2E8F8]">
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
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#162540] text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none whitespace-nowrap z-30 border border-blue-900/40">
              <span className="font-semibold">{hoveredDay.date}:</span>{' '}
              {hoveredDay.count > 0
                ? `${hoveredDay.count} sessions (${hoveredDay.hours} hrs)`
                : 'No study recorded'}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1.5 text-[10px] text-[#7A91B4] mt-3 px-1 font-medium">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-white border border-[#E2E8F8]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#C8DBFC]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#7EABF7]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#3B82F6]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#243B64]" />
          <span>More</span>
        </div>
      </div>
    </aside>
  );
};
