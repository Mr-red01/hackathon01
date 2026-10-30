import React, { useState } from 'react';
import {
  X,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Shuffle,
  RotateCcw,
  Plus,
  BookOpen
} from 'lucide-react';
import type { FlashcardDeck, Flashcard } from '../../types';
import { flashcardSyllabusPresets } from '../../data/mockData';
import { generateFlashcardsFromSyllabus } from '../../utils/flashcardGenerator';

interface FlashcardModalProps {
  deck: FlashcardDeck | null;
  onClose: () => void;
  onUpdateDeck: (updatedDeck: FlashcardDeck) => void;
  defaultOpenSyllabusForm?: boolean;
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({
  deck,
  onClose,
  onUpdateDeck,
  defaultOpenSyllabusForm = false,
}) => {
  if (!deck) return null;

  const [cards, setCards] = useState<Flashcard[]>(deck.cards);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'practice' | 'addSyllabus'>(
    defaultOpenSyllabusForm ? 'addSyllabus' : 'practice'
  );

  // Add Syllabus Form State
  const [syllabusTitle, setSyllabusTitle] = useState(deck.title);
  const [syllabusSubject, setSyllabusSubject] = useState(deck.subject);
  const [syllabusText, setSyllabusText] = useState(deck.syllabusSource || '');
  const [targetCount, setTargetCount] = useState(6);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const currentCard = cards[currentIdx];
  const masteredCount = cards.filter((c) => c.isMastered).length;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIdx((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleToggleMastered = (mastered: boolean) => {
    if (!currentCard) return;
    const updatedCards = cards.map((c, i) =>
      i === currentIdx ? { ...c, isMastered: mastered } : c
    );
    setCards(updatedCards);
    onUpdateDeck({ ...deck, cards: updatedCards });
    handleNext();
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIdx(0);
  };

  const handleResetProgress = () => {
    const reset = cards.map((c) => ({ ...c, isMastered: false }));
    setCards(reset);
    onUpdateDeck({ ...deck, cards: reset });
    setCurrentIdx(0);
    setIsFlipped(false);
  };

  const handleGenerateFromSyllabus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!syllabusText.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const generatedCards = generateFlashcardsFromSyllabus(
        syllabusSubject,
        syllabusTitle,
        syllabusText.trim(),
        targetCount
      );

      // Append new cards to existing deck
      const mergedCards = [...generatedCards, ...cards];
      const updatedDeck: FlashcardDeck = {
        ...deck,
        title: syllabusTitle.trim() || deck.title,
        subject: syllabusSubject,
        cards: mergedCards,
        syllabusSource: syllabusText.trim(),
        lastStudied: 'Just now',
      };

      setCards(mergedCards);
      onUpdateDeck(updatedDeck);
      setCurrentIdx(0);
      setIsFlipped(false);
      setIsGenerating(false);
      setViewMode('practice');
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
    }, 750);
  };

  const handleLoadPreset = (preset: typeof flashcardSyllabusPresets[0]) => {
    setSyllabusSubject(preset.subject);
    setSyllabusTitle(preset.title);
    setSyllabusText(preset.syllabusText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 relative overflow-hidden animate-scaleUp flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {deck.shortName}
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-base md:text-lg">
                {deck.title}
              </h3>
              <p className="text-xs text-slate-500">
                {deck.subject} • {cards.length} Flashcards ({masteredCount} Mastered)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-100 p-0.5 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewMode('practice')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'practice'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Practice
              </button>
              <button
                onClick={() => setViewMode('addSyllabus')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  viewMode === 'addSyllabus'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Syllabus</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-xs font-semibold animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Success! Generated new flashcards from your syllabus notes.</span>
          </div>
        )}

        {/* View Mode 1: Interactive Flashcard Practice */}
        {viewMode === 'practice' ? (
          <div className="py-4 space-y-4 flex-1 flex flex-col justify-between overflow-y-auto">
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                Card {currentIdx + 1} of {cards.length}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShuffle}
                  className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors"
                  title="Shuffle deck"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>
                <button
                  onClick={handleResetProgress}
                  className="flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors"
                  title="Reset mastery status"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Interactive 3D Card */}
            {currentCard ? (
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`min-h-[240px] md:min-h-[280px] w-full rounded-3xl border-2 p-6 md:p-8 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between select-none ${
                  isFlipped
                    ? 'bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white border-blue-300'
                    : 'bg-gradient-to-br from-white to-slate-50/70 border-slate-200 hover:border-blue-200'
                }`}
              >
                {/* Card Top Pill */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isFlipped
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isFlipped ? '💡 Answer / Explanation' : '❓ Question / Concept'}
                  </span>

                  {currentCard.isMastered && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Mastered
                    </span>
                  )}
                </div>

                {/* Card Body Text */}
                <div className="py-4 text-center my-auto">
                  <div
                    className={`font-semibold text-slate-800 leading-relaxed ${
                      isFlipped
                        ? 'text-sm md:text-base text-slate-700 whitespace-pre-wrap'
                        : 'text-base md:text-xl font-bold text-slate-900'
                    }`}
                  >
                    {isFlipped ? currentCard.back : currentCard.front}
                  </div>
                </div>

                {/* Card Bottom Flip Hint */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Click card to flip</span>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400">
                <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>No cards in this deck yet. Add a syllabus to generate cards!</p>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Previous / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                  aria-label="Next card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mastered / Review Toggle Buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleToggleMastered(false)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Needs Review</span>
                </button>
                <button
                  onClick={() => handleToggleMastered(true)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Got It Mastered</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* View Mode 2: Add Syllabus and Generate Flashcards */
          <form
            onSubmit={handleGenerateFromSyllabus}
            className="py-4 space-y-4 overflow-y-auto"
          >
            <div>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Generate Flashcards from {deck.shortName} Syllabus</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Paste your lecture syllabus, formula sheet, or concept list. Smartie AI will convert each point into interactive flashcards!
              </p>
            </div>

            {/* Quick 1-Click Samples */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Load Sample Syllabus:
              </span>
              <div className="flex flex-wrap gap-2">
                {flashcardSyllabusPresets.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => handleLoadPreset(preset)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 font-medium transition-colors"
                  >
                    ⚡ {preset.subject}: {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Topic / Deck Title
                </label>
                <input
                  type="text"
                  required
                  value={syllabusTitle}
                  onChange={(e) => setSyllabusTitle(e.target.value)}
                  placeholder="e.g. Chemical Kinetics & Catalysts"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Card Count
                </label>
                <select
                  value={targetCount}
                  onChange={(e) => setTargetCount(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value={4}>4 Flashcards</option>
                  <option value={6}>6 Flashcards</option>
                  <option value={8}>8 Flashcards</option>
                  <option value={10}>10 Flashcards</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Syllabus Notes, Formulas or Bullet Points
              </label>
              <textarea
                required
                rows={6}
                value={syllabusText}
                onChange={(e) => setSyllabusText(e.target.value)}
                placeholder={`Paste your syllabus or lecture points, e.g.:
• Arrhenius Equation: k = A * e^(-Ea / RT), relates reaction rate to temperature.
• Activation Energy: Minimum energy required for reactants to undergo reaction.
• Catalysts: Lower activation energy without being consumed.`}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono text-slate-700"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Each concept and definition will be synthesized into Question (Front) and Answer (Back).
              </span>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={isGenerating || !syllabusText.trim()}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Flashcards from Syllabus...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Flashcards from Syllabus</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('practice')}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
