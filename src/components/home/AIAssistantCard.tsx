import React, { useState, useRef } from 'react';
import {
  Image,
  Mic,
  MicOff,
  Send,
  Sparkles,
  BookOpen,
  FileText,
  Brain,
  Baby,
  X,
  CheckCircle2,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AIAssistantCardProps {
  onTriggerQuiz?: () => void;
  defaultTopic?: string;
}

interface AIResponse {
  type: string;
  query: string;
  title: string;
  content: string[];
  keyTakeaway?: string;
  suggestedAction?: {
    label: string;
    onClick: () => void;
  };
}

export const AIAssistantCard: React.FC<AIAssistantCardProps> = ({
  onTriggerQuiz,
  defaultTopic = '',
}) => {
  const [inputValue, setInputValue] = useState(defaultTopic);
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeResponse, setActiveResponse] = useState<AIResponse | null>(null);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    {
      id: 'explain',
      label: 'Explain this concept',
      icon: BookOpen,
      iconColor: 'text-blue-600',
      action: () => handleActionClick('Explain Faraday’s Law of Electromagnetic Induction'),
    },
    {
      id: 'summarize',
      label: 'Summarize this',
      icon: FileText,
      iconColor: 'text-indigo-600',
      action: () => handleActionClick('Summarize Newton’s Three Laws of Motion with key equations'),
    },
    {
      id: 'quiz',
      label: 'Test my knowledge',
      icon: Brain,
      iconColor: 'text-sky-600',
      action: () => {
        if (onTriggerQuiz) {
          onTriggerQuiz();
        } else {
          handleActionClick('Give me a quick 3-question quiz on Lorentz Force');
        }
      },
    },
    {
      id: 'eli5',
      label: "Explain like I'm 5",
      icon: Baby,
      iconColor: 'text-blue-500',
      action: () => handleActionClick('Explain quantum superposition like I am 5 years old'),
    },
  ];

  const handleActionClick = (prompt: string) => {
    setInputValue(prompt);
    executePrompt(prompt);
  };

  const executePrompt = (prompt: string) => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setActiveResponse(null);

    // Simulate smart AI response with realistic learning companion outputs
    setTimeout(() => {
      let responseData: AIResponse;
      const lower = prompt.toLowerCase();

      if (lower.includes('faraday') || lower.includes('electromagnet')) {
        responseData = {
          type: 'Concept Explanation',
          query: prompt,
          title: 'Faraday’s Law of Electromagnetic Induction',
          content: [
            'Magnetic flux (Φ) represents the total magnetic field passing through a given surface area: Φ = B · A · cos(θ).',
            'When this magnetic flux changes over time, an Electromotive Force (EMF, ε) is generated across the wire loop.',
            'Lenz’s Law (indicated by the negative sign in ε = -dΦ/dt) ensures that the induced current generates its own magnetic field opposing the change.',
            'Practical everyday application: Induction cooktops, electric guitars, electrical generators, and wireless phone chargers.'
          ],
          keyTakeaway: 'Rule of thumb: A stationary magnet produces zero current. Movement or changing magnetic field strength is essential to generate power.',
          suggestedAction: onTriggerQuiz ? {
            label: 'Test yourself on Electromagnetism →',
            onClick: onTriggerQuiz
          } : undefined
        };
      } else if (lower.includes('newton') || lower.includes('summarize')) {
        responseData = {
          type: 'Executive Summary',
          query: prompt,
          title: 'Summary: Newton’s Classical Mechanics',
          content: [
            '1st Law (Inertia): Objects at rest stay at rest; objects moving stay in motion with constant velocity unless a net external force acts upon them.',
            '2nd Law (Dynamics): F_net = m · a. Acceleration is directly proportional to net force and inversely proportional to mass.',
            '3rd Law (Action-Reaction): For every action force, there is an equal in magnitude and opposite in direction reaction force.',
          ],
          keyTakeaway: 'Always isolate the system and draw a clean Free-Body Diagram (FBD) before calculating net forces!',
        };
      } else if (lower.includes('5') || lower.includes('quantum') || lower.includes('superposition')) {
        responseData = {
          type: "Explain Like I'm 5",
          query: prompt,
          title: 'Superposition Explained Simply 🐱',
          content: [
            'Imagine spinning a coin on a smooth table. While it is spinning fast, is it heads or tails?',
            'It is both at the same time until your palm slaps down and stops it!',
            'In the quantum world, microscopic particles like electrons act like that spinning coin. They can be in multiple states at once until we observe them.'
          ],
          keyTakeaway: 'Measurement collapses the coin into a single heads or tails outcome!'
        };
      } else {
        responseData = {
          type: 'AI Tutor Insight',
          query: prompt,
          title: `Insights for: "${prompt}"`,
          content: [
            'Here is a structured breakdown based on your active Physics 12A and CS500 curriculum.',
            '1. Master the foundational definitions before moving to multi-variable formulas.',
            '2. Relate each mathematical term back to physical intuition (mass, distance, velocity).',
            '3. Practice solving at least two practice problems to cement neural pathways.'
          ],
          keyTakeaway: 'Consistent spaced repetition produces 3x better recall than cramming the night before.'
        };
      }

      setIsGenerating(false);
      setActiveResponse(responseData);
      setIsExpanded(true);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file.name);
    }
  };

  const copyResponse = () => {
    if (activeResponse) {
      navigator.clipboard.writeText(
        `${activeResponse.title}\n\n${activeResponse.content.join('\n')}\n\nKey Takeaway: ${activeResponse.keyTakeaway || ''}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#F4F7FF] rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_-6px_rgba(36,59,100,0.08),0_2px_8px_-2px_rgba(36,59,100,0.03)] border border-[#C8D9F8] transition-all duration-300 hover:border-[#ADC7F5]">
      {/* Search / Input Box with refined border and soft shadow */}
      <div className="relative rounded-2xl border border-[#BCD2F7] bg-white p-3.5 md:p-4 shadow-[0_2px_8px_rgba(36,59,100,0.04)] focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-200">
        {/* Text Area */}
        <textarea
          rows={2}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              executePrompt(inputValue);
            }
          }}
          placeholder="|Ask anything"
          className="w-full resize-none border-none bg-transparent text-sm md:text-base font-normal text-[#243B64] placeholder-[#7A91B4] focus:outline-none"
        />

        {/* Attached file chip */}
        {attachedFile && (
          <div className="flex items-center gap-1.5 bg-[#F0F4FF] border border-[#D6E2FC] text-blue-700 text-xs px-2.5 py-1 rounded-lg w-fit mb-2">
            <span>📎 {attachedFile}</span>
            <button
              onClick={() => setAttachedFile(null)}
              className="text-blue-500 hover:text-blue-800"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Input Footer Controls */}
        <div className="flex items-center justify-between pt-1">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.txt"
          />

          {/* Left attachment button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-[#7A91B4] hover:text-[#243B64] rounded-xl hover:bg-[#F0F4FF] transition-colors"
            title="Attach image or notes"
          >
            <Image className="w-5 h-5" />
          </button>

          {/* Right Controls: Mic & Send */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-xl transition-colors ${
                isListening
                  ? 'bg-rose-100 text-rose-600 animate-pulse'
                  : 'text-[#7A91B4] hover:text-[#243B64] hover:bg-[#F0F4FF]'
              }`}
              title={isListening ? 'Stop listening' : 'Voice input'}
            >
              {isListening ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => executePrompt(inputValue)}
              disabled={!inputValue.trim() || isGenerating}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                inputValue.trim() && !isGenerating
                  ? 'bg-[#243B64] hover:bg-[#162540] text-white shadow-[0_2px_8px_rgba(36,59,100,0.25)] hover:shadow-[0_4px_12px_rgba(36,59,100,0.35)] hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Chips Row with smooth hover elevation */}
      <div className="flex flex-wrap items-center gap-2.5 mt-4">
        {quickActions.map((qa) => {
          const Icon = qa.icon;
          return (
            <button
              key={qa.id}
              onClick={qa.action}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#D6E2FC] bg-white hover:bg-white text-[#243B64] hover:text-blue-700 text-xs font-semibold transition-all duration-200 shadow-[0_1px_4px_rgba(36,59,100,0.04)] hover:shadow-[0_4px_12px_rgba(36,59,100,0.08)] hover:-translate-y-0.5 hover:border-blue-400 group"
            >
              <Icon className={`w-3.5 h-3.5 ${qa.iconColor} group-hover:scale-110 transition-transform duration-200`} />
              <span>{qa.label}</span>
            </button>
          );
        })}
      </div>

      {/* Simulated AI Tutor Interactive Response Area */}
      {isGenerating && (
        <div className="mt-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="text-sm font-medium text-blue-700">
            Synthesizing explanation for Smartie...
          </span>
        </div>
      )}

      {activeResponse && !isGenerating && (
        <div className="mt-4 rounded-2xl border border-[#D6E2FC] bg-white p-4 shadow-[0_4px_16px_rgba(36,59,100,0.06)] transition-all animate-fadeIn">
          {/* Response Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F8]">
            <div className="flex items-center gap-2">
              <span className="bg-[#243B64] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                {activeResponse.type}
              </span>
              <h4 className="text-sm font-bold text-[#243B64]">
                {activeResponse.title}
              </h4>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={copyResponse}
                className="p-1.5 text-[#7A91B4] hover:text-[#243B64] rounded-lg transition-colors"
                title="Copy response"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-[#7A91B4] hover:text-[#243B64] rounded-lg"
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setActiveResponse(null)}
                className="p-1.5 text-[#7A91B4] hover:text-[#243B64] rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Response Content */}
          {isExpanded && (
            <div className="pt-3 space-y-2.5">
              <ul className="space-y-1.5 text-xs text-[#243B64] leading-relaxed list-disc list-inside">
                {activeResponse.content.map((item, idx) => (
                  <li key={idx} className="pl-1">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {activeResponse.keyTakeaway && (
                <div className="bg-[#F0F4FF] border border-[#D6E2FC] rounded-xl p-3 text-xs text-[#243B64] mt-2 flex items-start gap-2">
                  <span className="text-base leading-none">💡</span>
                  <div>
                    <span className="font-bold text-[#243B64]">Takeaway: </span>
                    {activeResponse.keyTakeaway}
                  </div>
                </div>
              )}

              {activeResponse.suggestedAction && (
                <div className="pt-2">
                  <button
                    onClick={activeResponse.suggestedAction.onClick}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                  >
                    {activeResponse.suggestedAction.label}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

