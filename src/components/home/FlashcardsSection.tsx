import React from 'react';
import {
  Layers,
  Sparkles,
  Plus,
  Play,
  CheckCircle2
} from 'lucide-react';
import type { FlashcardDeck } from '../../types';
import {
  BeakerIllustration,
  MathIllustration,
  AtomIllustration
} from '../illustrations/CourseIllustrations';

interface FlashcardsSectionProps {
  decks: FlashcardDeck[];
  onOpenDeck: (deck: FlashcardDeck) => void;
  onOpenAddSyllabus: () => void;
}

export const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({
  decks,
  onOpenDeck,
  onOpenAddSyllabus,
}) => {
  const renderIllustration = (iconType: string) => {
    switch (iconType) {
      case 'beaker':
        return <BeakerIllustration className="w-20 h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />;
      case 'math':
        return <MathIllustration className="w-20 h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />;
      case 'atom':
        return <AtomIllustration className="w-20 h-20 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />;
      default:
        return <Sparkles className="w-12 h-12 text-blue-500" />;
    }
  };

  const getBannerBg = (theme: string) => {
    switch (theme) {
      case 'emerald':
        return 'bg-[#e6f8f0]';
      case 'cyan':
        return 'bg-[#e5f5f9]';
      case 'purple':
        return 'bg-[#f0edfa]';
      default:
        return 'bg-slate-50';
    }
  };

  const getBadgeColor = (shortName: string) => {
    switch (shortName) {
      case 'Che':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Maths':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'Phy':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <section className="mt-8">
      {/* Header with Title and Add Syllabus Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Flashcards: Che, Maths & Phy</span>
            </h3>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Spaced Repetition
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active flashcard decks generated directly from your Chemistry, Mathematics, and Physics syllabi.
          </p>
        </div>

        <button
          onClick={onOpenAddSyllabus}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Syllabus to Flashcards</span>
        </button>
      </div>

      {/* 3 Div Flashcard Box: Che, Maths, Phy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {decks.map((deck) => {
          const masteredCount = deck.cards.filter((c) => c.isMastered).length;
          const totalCount = deck.cards.length;
          const pct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

          return (
            <div
              key={deck.id}
              onClick={() => onOpenDeck(deck)}
              className="group bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Banner with 3D Illustration */}
                <div
                  className={`w-full h-32 rounded-xl ${getBannerBg(
                    deck.theme
                  )} relative flex items-center justify-center p-3 mb-3.5 transition-colors overflow-hidden border border-slate-100/60`}
                >
                  {/* Subject Tag Badge */}
                  <div className="absolute top-2.5 left-2.5">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs border ${getBadgeColor(
                        deck.shortName
                      )}`}
                    >
                      {deck.shortName} • {totalCount} Cards
                    </span>
                  </div>

                  {/* Last Studied badge */}
                  {deck.lastStudied && (
                    <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[10px] text-slate-500 font-medium px-2 py-0.5 rounded-full shadow-2xs border border-white">
                      {deck.lastStudied}
                    </div>
                  )}

                  {/* Illustration */}
                  {renderIllustration(deck.iconType)}
                </div>

                {/* Content */}
                <div className="px-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight truncate group-hover:text-blue-600 transition-colors">
                      {deck.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {deck.description}
                  </p>
                </div>
              </div>

              {/* Progress & Quick Action */}
              <div className="px-1 pt-3 mt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1.5 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Mastery</span>
                  </span>
                  <span className="font-semibold text-slate-800">
                    {masteredCount} / {totalCount} ({pct}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Bottom Practice Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDeck(deck);
                  }}
                  className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200/60"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Practice {deck.shortName} Flashcards</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
