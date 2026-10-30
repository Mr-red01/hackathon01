import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';
import { sampleQuizQuestions } from '../../data/mockData';

export const QuizView: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = sampleQuizQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < sampleQuizQuestions.length) {
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

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-3xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <BrainCircuit className="w-3.5 h-3.5" /> AI Knowledge Check
          </span>
          <span className="text-xs text-slate-400">• Spaced Repetition Mode</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Interactive AI Quiz
        </h2>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Targeted micro-assessments generated from your Physics 12A and CS500 coursework.
        </p>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-4">
            <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Question {currentIdx + 1} of {sampleQuizQuestions.length}
            </span>
            <span className="font-medium text-slate-600">
              Score: <span className="text-blue-600 font-bold">{score}</span> / {sampleQuizQuestions.length}
            </span>
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
                <span>AI Tutor Explanation:</span>
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
                  {currentIdx + 1 < sampleQuizQuestions.length ? 'Next Question' : 'View Results'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished State */
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs text-center space-y-5 animate-scaleUp">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">Quiz Completed!</h3>
            <p className="text-xs text-slate-500 mt-1">
              You scored <span className="font-bold text-blue-600">{score}</span> out of{' '}
              <span className="font-bold">{sampleQuizQuestions.length}</span> correct (
              {Math.round((score / sampleQuizQuestions.length) * 100)}%)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 max-w-sm mx-auto text-xs text-slate-600 leading-relaxed">
            {score === sampleQuizQuestions.length
              ? '🎉 Outstanding work, Hana! You have completely mastered these Electromagnetism and Newton mechanics concepts.'
              : '👍 Great effort! Spaced practice makes these physics definitions second nature.'}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
