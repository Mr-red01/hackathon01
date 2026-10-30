import React from 'react';
import {
  TrendingUp,
  Clock,
  Flame,
  Award,
  Sparkles
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, target: 2.0 },
    { day: 'Tue', hours: 3.0, target: 2.0 },
    { day: 'Wed', hours: 2.0, target: 2.0 },
    { day: 'Thu', hours: 3.5, target: 2.0 },
    { day: 'Fri', hours: 2.0, target: 2.0 },
    { day: 'Sat', hours: 1.5, target: 2.0 },
    { day: 'Sun', hours: 0.0, target: 2.0 },
  ];

  const subjects = [
    { name: 'Physics 12A (Electromagnetism & Motion)', hours: 38.5, percentage: 45, color: '#3b82f6' },
    { name: 'CS500 (Data Structures & Coding)', hours: 28.0, percentage: 32, color: '#0284c7' },
    { name: 'Structural Engineering', hours: 12.5, percentage: 15, color: '#8b5cf6' },
    { name: 'Startup Strategy', hours: 7.0, percentage: 8, color: '#f59e0b' },
  ];

  const milestones = [
    { title: '14-Day Study Streak', desc: 'Active every day for two consecutive weeks', icon: '🔥', date: 'Active' },
    { title: 'Electromagnetism Pioneer', desc: 'Completed 12 lab exercises in Physics 12A', icon: '⚡', date: 'Earned 3d ago' },
    { title: 'Problem Solver Master', desc: 'Answered over 150 AI Quiz questions correctly', icon: '🧠', date: 'Earned 1w ago' },
    { title: 'Early Bird Learner', desc: 'Completed 10 morning study sprints before 9 AM', icon: '🌅', date: 'Earned 2w ago' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Learning Analytics & Insights
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Visual metrics, time distribution, and subject mastery tracking for Hana.
        </p>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-600">Total Study Time</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">142.5 hrs</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingUp className="w-3 h-3" /> +18.2% this month
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-600">Current Streak</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">14 Days</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Personal best: 28 days
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-600">Quiz Accuracy</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">89.4%</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingUp className="w-3 h-3" /> +4.1% vs last week
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-600">Sessions Year-to-Date</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900">174</div>
          <div className="text-[11px] text-slate-500 mt-1">
            Target: 250 sessions
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Study Hours Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm md:text-base">
                Weekly Study Time Distribution
              </h3>
              <p className="text-xs text-slate-400">
                14.5 hours logged this week across all active subjects
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Goal: 15 hrs
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
            {weeklyData.map((item) => {
              const maxHours = 4.0;
              const barHeightPct = Math.round((item.hours / maxHours) * 100);
              const targetHeightPct = Math.round((item.target / maxHours) * 100);

              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] font-semibold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.hours}h
                  </div>
                  <div className="w-full max-w-[36px] bg-slate-100 rounded-t-lg relative flex items-end h-full">
                    {/* Target line */}
                    <div
                      className="absolute w-full border-b border-dashed border-slate-300 z-10"
                      style={{ bottom: `${targetHeightPct}%` }}
                      title="Daily target (2h)"
                    />
                    {/* Filled bar */}
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-sky-400 rounded-t-lg transition-all duration-500 group-hover:from-blue-700 group-hover:to-sky-300"
                      style={{ height: `${barHeightPct}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600">{item.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-blue-600 rounded-xs" /> Logged Hours
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-slate-300 border-b border-dashed border-slate-400" /> Target (2h/day)
              </span>
            </div>
            <span className="font-semibold text-slate-700">Average: 2.4 hrs/day</span>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">
              Subject Focus
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Time allocation across active curriculum
            </p>

            <div className="space-y-4">
              {subjects.map((sub) => (
                <div key={sub.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium text-slate-800 truncate max-w-[180px]">
                      {sub.name}
                    </span>
                    <span className="font-semibold text-slate-600">
                      {sub.hours}h ({sub.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${sub.percentage}%`,
                        backgroundColor: sub.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-xs text-slate-500">
            💡 <span className="font-medium text-slate-700">Insight:</span> You spend the most time on Physics 12A, aligning directly with your Game Plan!
          </div>
        </div>
      </div>

      {/* Milestones & Badges */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">
          Recent Achievements & Badges
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Milestones unlocked on your AI Learning journey
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((ms) => (
            <div
              key={ms.title}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl mb-2 block">{ms.icon}</span>
                <h4 className="font-bold text-slate-800 text-xs">{ms.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {ms.desc}
                </p>
              </div>
              <span className="text-[10px] font-semibold text-blue-600 mt-3 block">
                {ms.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
