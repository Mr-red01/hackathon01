import React from 'react';
import {
  Home,
  BarChart2,
  CalendarCheck,
  Sparkles,
  Layers,
  Clock,
  FlaskConical,
  Rocket,
  Compass,
  MoreHorizontal,
  ChevronsUpDown,
  X
} from 'lucide-react';
import type { DashboardTab } from '../../types';
import { MindjoyLogo, HanaAvatar } from '../illustrations/CourseIllustrations';

interface LeftSidebarProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  selectedClassroom: string | null;
  onSelectClassroom: (classroom: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentTab,
  onSelectTab,
  selectedClassroom,
  onSelectClassroom,
  mobileOpen,
  onCloseMobile,
}) => {
  const mainNavItems = [
    {
      id: 'home' as DashboardTab,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'analytics' as DashboardTab,
      label: 'Analytics',
      icon: BarChart2,
    },
    {
      id: 'calendar' as DashboardTab,
      label: 'Calendar (To-Do List)',
      icon: CalendarCheck,
    },
    {
      id: 'quiz' as DashboardTab,
      label: 'AI Quiz',
      icon: Sparkles,
    },
  ];

  const classroomItems = [
    { name: 'Applied Physics 101', icon: FlaskConical, color: 'text-emerald-500' },
    { name: 'Startup Strategy', icon: Rocket, color: 'text-amber-500' },
    { name: 'Structural Engineering', icon: Compass, color: 'text-sky-500' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#f8fafc] border-r border-slate-200/70 flex flex-col justify-between py-5 px-4 transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Logo & Close button for mobile */}
          <div className="flex items-center justify-between px-2 mb-7">
            <div
              onClick={() => {
                onSelectTab('home');
                onCloseMobile();
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                <MindjoyLogo className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800 font-sans">
                Mindjoy
              </span>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation */}
          <div className="space-y-1 mb-8">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id && !selectedClassroom;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Quick reference links from reference image */}
            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectClassroom('Applied Physics 101');
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 text-left"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Classrooms</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('calendar');
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white/60 text-left"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Due Soon</span>
              </button>
            </div>
          </div>

          {/* Classrooms Section */}
          <div className="px-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
              Classrooms
            </div>
            <div className="space-y-1">
              {classroomItems.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedClassroom === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      onSelectClassroom(item.name);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left truncate ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${item.color} flex-shrink-0`} />
                    <span className="truncate">{item.name}</span>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  onSelectClassroom('More Subjects');
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-600 hover:bg-slate-100/70 text-left"
              >
                <MoreHorizontal className="w-3.5 h-3.5 flex-shrink-0" />
                <span>More</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Pill at Bottom Left */}
        <div className="pt-4 border-t border-slate-200/60">
          <button
            onClick={() => onSelectTab('analytics')}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/80 transition-all border border-transparent hover:border-slate-200/60 text-left group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <HanaAvatar size="sm" />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                  Hana
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  hana@mindjoy.com
                </div>
              </div>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 flex-shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
};
