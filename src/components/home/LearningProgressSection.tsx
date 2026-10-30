import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Flame,
  Clock,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { mockLeaderboard } from '../../data/mockData';

interface LearningProgressSectionProps {
  onOpenAnalytics: () => void;
}

export const LearningProgressSection: React.FC<LearningProgressSectionProps> = ({
  onOpenAnalytics,
}) => {
  const daysOfWeek = [
    { label: 'M', active: true, hours: 2.5 },
    { label: 'T', active: true, hours: 3.0 },
    { label: 'W', active: true, hours: 2.0 },
    { label: 'T', active: true, hours: 3.5 },
    { label: 'F', active: true, hours: 2.0 },
    { label: 'S', active: true, hours: 1.5 },
    { label: 'S', active: false, hours: 0 },
  ];

  return (
    <section className="mt-8 mb-6">
      {/* Header with Navigation arrows */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-base md:text-lg font-bold text-[#243B64] tracking-tight">
            Learning Progress
          </h3>
          <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200/50">
            Live Tracker
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            className="w-7 h-7 rounded-full bg-white border border-[#E2E8F8] shadow-xs flex items-center justify-center text-slate-500 hover:text-[#243B64] hover:bg-[#F0F4FF] transition-colors"
            aria-label="Previous progress"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="w-7 h-7 rounded-full bg-white border border-[#E2E8F8] shadow-xs flex items-center justify-center text-slate-500 hover:text-[#243B64] hover:bg-[#F0F4FF] transition-colors"
            aria-label="Next progress"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Leaderboard */}
        <div
          onClick={onOpenAnalytics}
          className="group bg-white rounded-2xl border border-[#E2E8F8] p-4 shadow-xs hover:shadow-[0_12px_28px_-4px_rgba(36,59,100,0.1)] hover:-translate-y-0.5 hover:border-[#BFD5FA] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-[#243B64] text-sm tracking-tight flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Leaderboard</span>
              </h4>
              <span className="text-[11px] font-semibold text-blue-600 group-hover:underline">
                View Full
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Time spent learning this week
            </p>

            {/* Quick Leaderboard list */}
            <div className="space-y-2">
              {mockLeaderboard.slice(0, 3).map((item) => (
                <div
                  key={item.rank}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                    item.name.includes('Smartie')
                      ? 'bg-blue-50/70 border border-blue-100 font-semibold'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        item.rank === 1
                          ? 'bg-amber-100 text-amber-700'
                          : item.rank === 2
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.rank}
                    </span>
                    <span className="text-slate-800">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-semibold">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>You're in the top 5% of learners!</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +2.4 hrs vs last week
            </span>
          </div>
        </div>

        {/* Card 2: Learning Streak & Visual Tracker */}
        <div
          onClick={onOpenAnalytics}
          className="group bg-white rounded-2xl border border-[#E2E8F8] p-4 shadow-xs hover:shadow-[0_12px_28px_-4px_rgba(36,59,100,0.1)] hover:-translate-y-0.5 hover:border-[#BFD5FA] transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-[#243B64] text-sm tracking-tight flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Learning Streak</span>
              </h4>
              <span className="text-[11px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                14 Days
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              174 study sessions in the last year
            </p>

            {/* Weekly Days Tracker */}
            <div className="flex items-center justify-between gap-1 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100 mb-3">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-slate-400">
                    {day.label}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      day.active
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {day.active ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px]">•</span>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-500">
                    {day.hours > 0 ? `${day.hours}h` : '-'}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Study Time Indicator */}
            <div className="flex items-center justify-between text-xs font-medium text-slate-700">
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-blue-500" /> Weekly Goal (15h)
              </span>
              <span className="font-bold text-slate-900">14.5 / 15 hrs (97%)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                style={{ width: '97%' }}
              />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Keep going! 30 mins to hit your weekly goal.</span>
            <span className="text-blue-600 font-semibold">Streak Safe 🔥</span>
          </div>
        </div>
      </div>
    </section>
  );
};

