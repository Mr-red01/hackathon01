import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  BrainCircuit,
  Lightbulb,
  Plus,
  BookOpen,
  Sparkles,
  Trash2,
  FileText,
  Layers,
  X
} from 'lucide-react';
import type { QuizQuestion, SyllabusModule } from '../../types';
import { initialSyllabusModules, syllabusPresets } from '../../data/mockData';
import { generateQuizFromSyllabus } from '../../utils/quizGenerator';

export const QuizView: React.FC = () => {
  // Modules State
  const [modules, setModules] = useState<SyllabusModule[]>(initialSyllabusModules);
  const [activeModuleId, setActiveModuleId] = useState<string>(initialSyllabusModules[0].id);

  // Modal State for Adding Module / Syllabus
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState('Physics');
  const [newSyllabusText, setNewSyllabusText] = useState('');
  const [newQuestionCount, setNewQuestionCount] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  // Quiz Taking State
  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];
  const questions = activeModule.questions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: QuizQuestion | undefined = questions[currentIdx];

  const handleSelectModule = (modId: string) => {
    setActiveModuleId(modId);
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered || !currentQ) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleRegenerateFromCurrentSyllabus = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const freshQuestions = generateQuizFromSyllabus(
        activeModule.title,
        activeModule.subject,
        activeModule.syllabusText,
        activeModule.questionsCount || 4
      );

      setModules((prev) =>
        prev.map((m) =>
          m.id === activeModule.id
            ? { ...m, questions: freshQuestions, questionsCount: freshQuestions.length }
            : m
        )
      );

      setCurrentIdx(0);
      setSelectedOption(null);
      setHasAnswered(false);
      setScore(0);
      setIsFinished(false);
      setIsGenerating(false);
    }, 600);
  };

  const handleCreateModuleAndQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSyllabusText.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const generatedQuestions = generateQuizFromSyllabus(
        newTitle.trim(),
        newSubject,
        newSyllabusText.trim(),
        newQuestionCount
      );

      const newModule: SyllabusModule = {
        id: `module-${Date.now()}`,
        title: newTitle.trim(),
        subject: newSubject,
        syllabusText: newSyllabusText.trim(),
        createdAt: 'Custom Added',
        questionsCount: generatedQuestions.length,
        questions: generatedQuestions,
        isCustom: true,
      };

      setModules((prev) => [newModule, ...prev]);
      setActiveModuleId(newModule.id);
      setCurrentIdx(0);
      setSelectedOption(null);
      setHasAnswered(false);
      setScore(0);
      setIsFinished(false);

      // Reset form
      setNewTitle('');
      setNewSyllabusText('');
      setShowAddModal(false);
      setIsGenerating(false);
    }, 800);
  };

  const handleDeleteModule = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (modules.length <= 1) return;

    const remaining = modules.filter((m) => m.id !== id);
    setModules(remaining);
    if (activeModuleId === id) {
      setActiveModuleId(remaining[0].id);
      setCurrentIdx(0);
      setSelectedOption(null);
      setHasAnswered(false);
      setScore(0);
      setIsFinished(false);
    }
  };

  const handleLoadPreset = (preset: typeof syllabusPresets[0]) => {
    setNewTitle(preset.title);
    setNewSubject(preset.subject);
    setNewSyllabusText(preset.syllabusText);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <BrainCircuit className="w-3.5 h-3.5" /> AI Syllabus Quiz Maker
            </span>
            <span className="text-xs text-slate-400">• Spaced Repetition Mode</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Interactive AI Quiz
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Add custom course modules, paste syllabus notes, and let Smartie generate tailored quizzes!
          </p>
        </div>

        {/* Action Button: Add Module */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Module & Syllabus</span>
        </button>
      </div>

      {/* Module Selector Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Active Syllabus Modules ({modules.length})</span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            <span>+ Create New</span>
          </button>
        </div>

        {/* Horizontal Modules List */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scroll-smooth no-scrollbar">
          {modules.map((mod) => {
            const isActive = mod.id === activeModuleId;
            return (
              <div
                key={mod.id}
                onClick={() => handleSelectModule(mod.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs cursor-pointer transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold shadow-xs'
                    : 'bg-slate-50/70 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BookOpen className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="truncate max-w-[160px]">{mod.title}</span>
                <span className="bg-white/80 border border-slate-200 text-[10px] px-1.5 py-0.2 rounded-md text-slate-500">
                  {mod.questionsCount}Q
                </span>

                {mod.isCustom && (
                  <button
                    onClick={(e) => handleDeleteModule(mod.id, e)}
                    className="p-0.5 text-slate-400 hover:text-rose-600 rounded transition-colors ml-1"
                    title="Delete custom module"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Area */}
      {!isFinished && currentQ ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full truncate max-w-[220px]">
                {activeModule.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-medium text-slate-600">
                Score: <span className="text-blue-600 font-bold">{score}</span> / {questions.length}
              </span>
              <button
                onClick={handleRegenerateFromCurrentSyllabus}
                disabled={isGenerating}
                className="text-[11px] font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
                title="Generate fresh questions from this syllabus"
              >
                <Sparkles className="w-3 h-3" />
                <span>Remix Questions</span>
              </button>
            </div>
          </div>

          {/* Subject tag & Question prompt */}
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400 block mb-2">
              {currentQ.subject}
            </span>
            <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctAnswer;

              let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-900 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-400 bg-rose-50/70 text-rose-900 font-semibold';
                } else {
                  btnStyle = 'border-slate-200 opacity-50 text-slate-500';
                }
              } else if (isSelected) {
                btnStyle = 'border-blue-500 bg-blue-50 text-blue-900 font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 flex-shrink-0 bg-white">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnswered && (
                    <div>
                      {isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {!isCorrect && isSelected && (
                        <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {hasAnswered && (
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 space-y-1.5 animate-fadeIn">
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Smartie AI Explanation & Syllabus Reference:</span>
              </div>
              <p className="leading-relaxed pl-5 text-slate-800">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Button */}
          {hasAnswered && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-all hover:shadow-md"
              >
                <span>
                  {currentIdx + 1 < questions.length ? 'Next Question' : 'View Results'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : isFinished ? (
        /* Quiz Finished State */
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs text-center space-y-5 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full">
              {activeModule.title}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-2">Quiz Completed!</h3>
            <p className="text-xs text-slate-500 mt-1">
              You scored <span className="font-bold text-blue-600">{score}</span> out of{' '}
              <span className="font-bold">{questions.length}</span> correct (
              {questions.length > 0 ? Math.round((score / questions.length) * 100) : 100}%)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 max-w-sm mx-auto text-xs text-slate-600 leading-relaxed">
            {score === questions.length
              ? '🎉 Outstanding work, Smartie! You have completely mastered the syllabus concepts in this module.'
              : '👍 Great effort, Smartie! Spaced practice makes these definitions and mechanisms second nature.'}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={handleRegenerateFromCurrentSyllabus}
              className="px-5 py-2.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Generate New Questions</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <span>Add Another Syllabus</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* View Syllabus Accordion / Reference for Active Module */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Syllabus & Lecture Notes Source: {activeModule.title}</span>
          </h4>
          <span className="text-[11px] text-slate-400">{activeModule.subject}</span>
        </div>
        <pre className="text-xs text-slate-600 font-sans whitespace-pre-wrap bg-slate-50/80 p-3 rounded-xl border border-slate-100 leading-relaxed">
          {activeModule.syllabusText}
        </pre>
      </div>

      {/* Modal: Add Module & Syllabus */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <form
            onSubmit={handleCreateModuleAndQuiz}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-scaleUp max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>Add Module & Syllabus</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Paste your curriculum notes or lecture outline. Smartie AI will synthesize multiple-choice quizzes automatically!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick 1-Click Presets */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Quick-Load Preset Samples (Click to test):
              </label>
              <div className="flex flex-wrap gap-2">
                {syllabusPresets.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleLoadPreset(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 font-medium transition-colors"
                  >
                    ⚡ {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Module Title
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Molecular Genetics & Transcription"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Subject / Category
                </label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Biology, Math, Economics"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Number of Questions
                </label>
                <select
                  value={newQuestionCount}
                  onChange={(e) => setNewQuestionCount(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value={3}>3 Questions</option>
                  <option value={4}>4 Questions</option>
                  <option value={5}>5 Questions</option>
                  <option value={6}>6 Questions</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Syllabus Topics, Definitions or Lecture Notes
              </label>
              <textarea
                required
                rows={5}
                value={newSyllabusText}
                onChange={(e) => setNewSyllabusText(e.target.value)}
                placeholder={`Paste your syllabus or lecture points here, e.g.:
• Concept 1: Description of principle
• Concept 2: Key formula and definition
• Concept 3: Experimental observation`}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono text-slate-700"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Each bullet point or concept definition will be converted into a quiz problem with explanations.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <button
                type="submit"
                disabled={isGenerating || !newTitle.trim() || !newSyllabusText.trim()}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing Syllabus & Generating Quiz...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Quiz from Syllabus</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
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
