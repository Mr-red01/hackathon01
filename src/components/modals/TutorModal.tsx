import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import type { Tutor } from '../../types';
import {
  CoderTutorAvatar,
  PhysicsTutorAvatar,
  SmartieAvatar
} from '../illustrations/CourseIllustrations';

interface TutorModalProps {
  tutor: Tutor | null;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'tutor' | 'user';
  text: string;
  timestamp: string;
}

export const TutorModal: React.FC<TutorModalProps> = ({ tutor, onClose }) => {
  if (!tutor) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'tutor',
      text: tutor.avatarType === 'coder'
        ? `Hey Smartie! Ready to tackle some code? We were recently looking at CS500 data structures. What can I help you debug or explain today?`
        : `Greetings Smartie! Welcome back to Physics 101. Are you working on magnetic flux or forces and free-body equilibrium today?`,
      timestamp: 'Just now'
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const textLower = userMsg.text.toLowerCase();

      if (tutor.avatarType === 'coder') {
        if (textLower.includes('tree') || textLower.includes('bst')) {
          reply = `Great question on Binary Search Trees! Remember: left subtree keys < node < right subtree keys. If you keep it balanced (like an AVL or Red-Black tree), search, insertion, and deletion all run in O(log n) time. Would you like a Python snippet?`;
        } else {
          reply = `That's an important programming concept! The key is breaking it down into atomic steps: 1) Identify input constraints, 2) Write pseudo-code, 3) Test edge cases like empty arrays or null values. Shall we walk through an example together?`;
        }
      } else {
        if (textLower.includes('magnet') || textLower.includes('flux')) {
          reply = `Excellent physics focus! Magnetic flux Φ = B * A * cos(θ). Notice that when the surface is perpendicular to the field lines (angle = 0°), cos(0) = 1, giving maximum flux! Let's check a practice problem on this.`;
        } else {
          reply = `Always remember the golden rule of mechanics: draw the vectors first! Once you decompose forces along perpendicular axes (x and y), net force F_net = 0 or m*a makes solving the system straightforward.`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'tutor',
          text: reply,
          timestamp: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full h-[580px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-scaleUp">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            {tutor.avatarType === 'coder' ? (
              <CoderTutorAvatar className="w-11 h-11" />
            ) : (
              <PhysicsTutorAvatar className="w-11 h-11" />
            )}
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <span>{tutor.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </h3>
              <p className="text-xs text-slate-500">
                {tutor.courseTag} • {tutor.specialty}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fbfcfe]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              {msg.sender === 'user' ? (
                <SmartieAvatar size="sm" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-white border border-slate-200/80 rounded-tl-xs shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={`Ask ${tutor.name} anything...`}
            className="flex-1 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:bg-slate-200 disabled:text-slate-400 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
