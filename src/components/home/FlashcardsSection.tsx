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
        return 'bg-[#EBF7F2]';
      case 'cyan':
        return 'bg-[#EAF3FF]';
      case 'purple':
        return 'bg-[#F1EFFF]';
      default:
        return 'bg-[#F0F4FF]';
    }
  };

  const getBadgeColor = (shortName: string) => {
    switch (shortName) {
      case 'Che':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Maths':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Phy':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  return (
    <section className="mt-8">
      {/* Header with Title and Add Syllabus Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base md:text-lg font-bold text-[#243B64] tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Flashcards: Che, Maths & Phy</span>
            </h3>
            <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              Spaced Repetition
            </span>
          </div>
          <p className="text-xs text-[#4F668D] mt-0.5 font-normal">
            Active flashcard decks generated directly from your Chemistry, Mathematics, and Physics syllabi.
          </p>
        </div>

        <button
          onClick={onOpenAddSyllabus}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#243B64] hover:bg-[#162540] text-white rounded-xl text-xs font-semibold shadow-[0_2px_8px_rgba(36,59,100,0.2)] hover:shadow-[0_4px_14px_rgba(36,59,100,0.3)] hover:-translate-y-0.5 transition-all duration-200 self-start sm:self-center"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Syllabus to Flashcards</span>
        </button>
      </div>

      {/* 3 Div Flashcard Box: Che, Maths, Phy with smooth elevation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {decks.map((deck) => {
          const masteredCount = deck.cards.filter((c) => c.isMastered).length;
          const totalCount = deck.cards.length;
          const pct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

          return (
            <div
              key={deck.id}
              onClick={() => onOpenDeck(deck)}
              className="group bg-white rounded-2xl border border-[#E2E8F8] p-4 shadow-[0_2px_8px_-2px_rgba(36,59,100,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(36,59,100,0.1)] hover:-translate-y-1 hover:border-[#BFD5FA] transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Banner with 3D Illustration */}
                <div
                  className={`w-full h-32 rounded-xl ${getBannerBg(
                    deck.theme
                  )} relative flex items-center justify-center p-3 mb-3.5 transition-colors overflow-hidden border border-[#E2E8F8]/60`}
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
                    <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[10px] text-[#4F668D] font-medium px-2 py-0.5 rounded-full shadow-2xs border border-[#E2E8F8]">
                      {deck.lastStudied}
                    </div>
                  )}

                  {/* Illustration */}
                  {renderIllustration(deck.iconType)}
                </div>

                {/* Content */}
                <div className="px-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-[#243B64] text-sm tracking-tight truncate group-hover:text-blue-600 transition-colors">
                      {deck.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#4F668D] mt-0.5 line-clamp-2 leading-relaxed">
                    {deck.description}
                  </p>
                </div>
              </div>

              {/* Progress & Quick Action */}
              <div className="px-1 pt-3 mt-3 border-t border-[#E2E8F8]">
                <div className="flex items-center justify-between text-[11px] text-[#4F668D] mb-1.5 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Mastery</span>
                  </span>
                  <span className="font-semibold text-[#243B64]">
                    {masteredCount} / {totalCount} ({pct}%)
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-[#F0F4FF] rounded-full overflow-hidden border border-[#E2E8F8]/60">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Bottom Practice Action Button with smooth hover transition */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDeck(deck);
                  }}
                  className="w-full mt-3 py-2.5 px-3 rounded-xl bg-[#F0F4FF] hover:bg-blue-600 text-[#243B64] hover:text-white font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 border border-[#D6E2FC] hover:border-transparent hover:shadow-[0_2px_8px_rgba(37,99,235,0.25)]"
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
