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
import { SmartieLogo, SmartieAvatar } from '../illustrations/CourseIllustrations';

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
      label: 'Calendar',
      icon: CalendarCheck,
    },
    {
      id: 'quiz' as DashboardTab,
      label: 'AI Quiz',
      icon: Sparkles,
    },
  ];

  const classroomItems = [
    { name: 'Applied Physics 101', icon: FlaskConical, color: 'text-blue-600' },
    { name: 'Startup Strategy', icon: Rocket, color: 'text-indigo-600' },
    { name: 'Structural Engineering', icon: Compass, color: 'text-sky-600' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#162540]/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container with subtle light-blue background (#F0F4FF) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#F0F4FF] border-r border-[#E2E8F8] flex flex-col justify-between py-6 px-4 transition-transform duration-300 ease-in-out ${
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
              <div className="w-9 h-9 rounded-xl bg-white shadow-[0_2px_8px_-2px_rgba(36,59,100,0.08)] border border-[#E2E8F8] flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-200">
                <SmartieLogo className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#243B64] font-sans">
                Smartie
              </span>
            </div>

            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-[#4F668D] hover:text-[#243B64] rounded-lg hover:bg-[#E4ECFC] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation */}
          <div className="space-y-1.5 mb-7">
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
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left group ${
                    isActive
                      ? 'bg-white text-[#243B64] shadow-[0_2px_8px_-2px_rgba(36,59,100,0.07)] border border-[#D6E2FC] font-semibold'
                      : 'text-[#4F668D] hover:text-[#243B64] hover:bg-[#E4ECFC]/80 hover:translate-x-1'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? 'text-blue-600' : 'text-[#7A91B4] group-hover:text-blue-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Quick reference links */}
            <div className="pt-2 space-y-1">
              <button
                onClick={() => {
                  onSelectClassroom('Applied Physics 101');
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-[#4F668D] hover:text-[#243B64] hover:bg-[#E4ECFC]/80 hover:translate-x-1 transition-all duration-200 text-left group"
              >
                <Layers className="w-4 h-4 text-[#7A91B4] group-hover:text-blue-600 transition-colors" />
                <span>Classrooms</span>
              </button>
              <button
                onClick={() => {
                  onSelectTab('calendar');
                  onCloseMobile();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-[#4F668D] hover:text-[#243B64] hover:bg-[#E4ECFC]/80 hover:translate-x-1 transition-all duration-200 text-left group"
              >
                <Clock className="w-4 h-4 text-[#7A91B4] group-hover:text-blue-600 transition-colors" />
                <span>Due Soon</span>
              </button>
            </div>
          </div>

          {/* Classrooms Section */}
          <div className="px-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#7A91B4] mb-2 px-2">
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
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 text-left truncate group ${
                      isSelected
                        ? 'bg-white text-[#243B64] font-semibold border border-[#D6E2FC] shadow-[0_2px_6px_-1px_rgba(36,59,100,0.06)]'
                        : 'text-[#4F668D] hover:text-[#243B64] hover:bg-[#E4ECFC]/70 hover:translate-x-1'
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
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#7A91B4] hover:text-[#243B64] hover:bg-[#E4ECFC]/70 hover:translate-x-1 transition-all duration-200 text-left"
              >
                <MoreHorizontal className="w-3.5 h-3.5 flex-shrink-0" />
                <span>More</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Pill at Bottom Left with hover elevation */}
        <div className="pt-4 border-t border-[#E2E8F8]">
          <button
            onClick={() => onSelectTab('analytics')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/70 hover:bg-white text-[#243B64] border border-[#E2E8F8] hover:border-[#D6E2FC] hover:shadow-[0_4px_12px_-2px_rgba(36,59,100,0.06)] hover:-translate-y-0.5 transition-all duration-200 text-left group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <SmartieAvatar size="sm" />
              <div className="min-w-0">
                <div className="text-xs font-bold text-[#243B64] truncate group-hover:text-blue-600 transition-colors">
                  Smartie
                </div>
                <div className="text-[11px] text-[#7A91B4] truncate">
                  smartie@smartie.ai
                </div>
              </div>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-[#7A91B4] group-hover:text-[#243B64] flex-shrink-0 transition-colors" />
          </button>
        </div>
      </aside>
    </>
  );
};
