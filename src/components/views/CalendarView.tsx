import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Trash2
} from 'lucide-react';
import type { TaskItem } from '../../types';

interface CalendarViewProps {
  tasks: TaskItem[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<TaskItem, 'id'>) => void;
  onDeleteTask: (taskId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics 12A');
  const [newDueDate, setNewDueDate] = useState('Tomorrow, 5:00 PM');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      subject: newSubject,
      dueDate: newDueDate,
      completed: false,
      priority: newPriority,
    });

    setNewTitle('');
    setShowAddModal(false);
  };

  const getPriorityBadge = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return (
          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
            High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
            Normal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Calendar & Learning To-Do List
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Track deadlines, upcoming problem sets, and review schedules.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main To-Do List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters Bar */}
          <div className="flex items-center justify-between bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1">
              {(['all', 'pending', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                    filter === tab
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 px-2">
              {tasks.filter((t) => !t.completed).length} tasks remaining
            </span>
          </div>

          {/* Task Items */}
          <div className="space-y-2.5">
            {filteredTasks.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-400">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
                <p className="text-sm font-semibold text-slate-700">No tasks in this view</p>
                <p className="text-xs mt-1">All caught up or ready to add your next study goal!</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`bg-white rounded-xl border p-3.5 flex items-center justify-between gap-3 shadow-xs hover:shadow-sm transition-all ${
                    task.completed
                      ? 'border-slate-200/60 bg-slate-50/50 opacity-70'
                      : 'border-slate-200/80 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className="text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <h4
                        className={`text-sm font-semibold truncate ${
                          task.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-800'
                        }`}
                      >
                        {task.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                        <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-medium">
                          {task.subject}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" /> {task.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {getPriorityBadge(task.priority)}
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar: Mini Calendar & Study Tip */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <span>Upcoming Study Schedule</span>
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="text-xs font-bold text-blue-800">Tomorrow • 9:00 AM</div>
                <div className="text-xs text-slate-700 font-medium mt-0.5">
                  Electricity & Magnetism Quiz Prep
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Physics 12A • 45 min session</div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100">
                <div className="text-xs font-bold text-purple-800">Friday • 3:00 PM</div>
                <div className="text-xs text-slate-700 font-medium mt-0.5">
                  Binary Trees & Recursion Coding Session
                </div>
                <div className="text-[11px] text-slate-500 mt-1">CS500 Tutor • 1 hr</div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                <div className="text-xs font-bold text-amber-800">June 12</div>
                <div className="text-xs text-slate-700 font-medium mt-0.5">
                  Forces & Motion Essentials Final Submission
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Physics 12A Assignment</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-sm">
            <h4 className="font-bold text-sm mb-1">Study Tip from Smartie AI</h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Spacing out your Physics practice in 25-minute sprints (Pomodoro) gives your brain time to assimilate vector math concepts effortlessly!
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <form
            onSubmit={handleCreateTask}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scaleUp"
          >
            <h3 className="font-bold text-lg text-slate-900">Add New Learning Task</h3>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Task Description
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Review Lenz's Law & Faraday Equations"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Subject
              </label>
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Physics 12A">Physics 12A</option>
                <option value="CS500 Coding">CS500 Coding</option>
                <option value="Applied Physics 101">Applied Physics 101</option>
                <option value="Startup Strategy">Startup Strategy</option>
                <option value="Structural Engineering">Structural Engineering</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Due Date
                </label>
                <input
                  type="text"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  placeholder="e.g. Tomorrow, 5 PM"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Priority
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-xs"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="py-2.5 px-4 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
