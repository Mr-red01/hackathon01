import React from 'react';
import {
  FlaskConical,
  Rocket,
  Compass,
  BookOpen,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

interface ClassroomViewProps {
  classroomName: string;
  onBackToHome: () => void;
  onAskAI: (prompt: string) => void;
}

export const ClassroomView: React.FC<ClassroomViewProps> = ({
  classroomName,
  onBackToHome,
  onAskAI,
}) => {
  const getClassroomDetails = (name: string) => {
    switch (name) {
      case 'Applied Physics 101':
        return {
          icon: FlaskConical,
          color: 'text-emerald-500 bg-emerald-50',
          instructor: 'Dr. Evelyn Reed',
          code: 'PHYS-101',
          schedule: 'Mon, Wed, Fri • 10:00 AM - 11:30 AM',
          modules: [
            { title: 'Module 1: Classical Dynamics & Kinematics', status: 'Completed (100%)', count: '6 lectures' },
            { title: 'Module 2: Energy, Work & Conservative Forces', status: 'In Progress (86%)', count: '8 lectures' },
            { title: 'Module 3: Rotational Equilibrium & Angular Momentum', status: 'Upcoming', count: '5 lectures' },
          ]
        };
      case 'Startup Strategy':
        return {
          icon: Rocket,
          color: 'text-amber-500 bg-amber-50',
          instructor: 'Prof. Marcus Vance',
          code: 'STRAT-302',
          schedule: 'Tue, Thu • 2:00 PM - 3:30 PM',
          modules: [
            { title: 'Module 1: Customer Discovery & Problem-Market Fit', status: 'Completed (100%)', count: '4 case studies' },
            { title: 'Module 2: Unit Economics & CAC/LTV Ratios', status: 'In Progress (70%)', count: '5 case studies' },
            { title: 'Module 3: Pitch Deck Architecture & Angel Syndicates', status: 'Upcoming', count: '3 case studies' },
          ]
        };
      case 'Structural Engineering':
        return {
          icon: Compass,
          color: 'text-sky-500 bg-sky-50',
          instructor: 'Eng. Sarah Jenkins, PE',
          code: 'ENGR-210',
          schedule: 'Wed • 1:00 PM - 4:00 PM (Lab)',
          modules: [
            { title: 'Module 1: Statics & Truss Analysis', status: 'Completed (100%)', count: '4 labs' },
            { title: 'Module 2: Beam Shear & Bending Moment Diagrams', status: 'In Progress (55%)', count: '6 labs' },
            { title: 'Module 3: Finite Element Modeling (FEM)', status: 'Upcoming', count: '4 labs' },
          ]
        };
      default:
        return {
          icon: BookOpen,
          color: 'text-blue-500 bg-blue-50',
          instructor: 'Smartie Faculty',
          code: 'GEN-100',
          schedule: 'Flexible Online Pacing',
          modules: [
            { title: 'Foundational Concepts & Principles', status: 'In Progress (60%)', count: '4 lessons' },
            { title: 'Practical Application Labs', status: 'Upcoming', count: '5 lessons' },
          ]
        };
    }
  };

  const details = getClassroomDetails(classroomName);
  const Icon = details.icon;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Back to Home Button */}
      <button
        onClick={onBackToHome}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Main Dashboard</span>
      </button>

      {/* Classroom Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E2E8F8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center p-3 ${details.color}`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {details.code}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">Active Classroom</span>
            </div>
            <h2 className="text-2xl font-bold text-[#243B64] mt-0.5">
              {classroomName}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Instructor: {details.instructor} • {details.schedule}
            </p>
          </div>
        </div>

        <button
          onClick={() => onAskAI(`Explain the key formulas and concepts for ${classroomName}`)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors self-start md:self-center"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Classroom AI Tutor</span>
        </button>
      </div>

      {/* Modules List */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F8] shadow-xs">
        <h3 className="font-bold text-[#243B64] text-base mb-1">Curriculum & Modules</h3>
        <p className="text-xs text-slate-400 mb-4">Master each core competency to earn course credit.</p>

        <div className="space-y-3">
          {details.modules.map((mod, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F8] flex items-center justify-center text-xs font-bold text-slate-700 shadow-xs">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{mod.title}</h4>
                  <span className="text-xs text-slate-400">{mod.count}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  mod.status.includes('Completed')
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                    : mod.status.includes('In Progress')
                    ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {mod.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
