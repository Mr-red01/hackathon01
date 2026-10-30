import React from 'react';

// Geometric Avatar matching Hana's profile avatar from reference image
export const HanaAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size = 'md' }) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-16 h-16',
  }[size];

  return (
    <div className={`${dimensions} rounded-full overflow-hidden flex-shrink-0 shadow-sm relative bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-[2px]`}>
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Base circle background */}
          <rect width="100" height="100" fill="#3b82f6" />
          
          {/* Geometric angular facets resembling the reference image */}
          <polygon points="0,0 60,0 35,50 0,35" fill="#60a5fa" />
          <polygon points="60,0 100,0 100,55 55,40" fill="#93c5fd" />
          <polygon points="0,35 45,45 25,100 0,100" fill="#2563eb" />
          <polygon points="45,45 80,40 65,100 25,100" fill="#818cf8" />
          <polygon points="80,40 100,55 100,100 65,100" fill="#4f46e5" />
          
          {/* Modern abstract geometric central slice */}
          <path d="M25,48 L75,48 L65,60 L20,60 Z" fill="#ffffff" fillOpacity="0.9" />
          <path d="M30,30 L45,30 L40,75 L25,75 Z" fill="#ffffff" fillOpacity="0.9" />
          <path d="M55,30 L70,30 L65,75 L50,75 Z" fill="#ffffff" fillOpacity="0.9" />
        </svg>
      </div>
    </div>
  );
};

// Horseshoe Magnet 3D style illustration for Electricity & Magnetism
export const MagnetIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="magnetRed" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="60%" stopColor="#e02424" />
          <stop offset="100%" stopColor="#9b1c1c" />
        </radialGradient>
        <linearGradient id="silverPole" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="50%" stopColor="#d1d5db" />
          <stop offset="100%" stopColor="#9ca3af" />
        </linearGradient>
        <filter id="magnetGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#f87171" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Subtle magnetic wave rings */}
      <path d="M35 100 Q 60 115 85 100" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
      <path d="M25 105 Q 60 125 95 105" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />

      {/* Main Horseshoe Magnet Body */}
      <g filter="url(#magnetGlow)">
        <path
          d="M32 75 V 45 C 32 29.5 44.5 17 60 17 C 75.5 17 88 29.5 88 45 V 75"
          stroke="url(#magnetRed)"
          strokeWidth="16"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {/* Curved Highlight */}
        <path
          d="M36 45 C 36 32 46.5 22 60 22 C 73.5 22 84 32 84 45"
          stroke="#ffa8a8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      {/* Left Pole (Silver Tip) */}
      <rect x="24" y="72" width="16" height="15" rx="3" fill="url(#silverPole)" />
      <line x1="26" y1="79" x2="38" y2="79" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <text x="32" y="84" fill="#374151" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>

      {/* Right Pole (Silver Tip) */}
      <rect x="80" y="72" width="16" height="15" rx="3" fill="url(#silverPole)" />
      <line x1="82" y1="79" x2="94" y2="79" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <text x="88" y="84" fill="#374151" fontSize="7" fontWeight="bold" textAnchor="middle">S</text>

      {/* Energy Sparks */}
      <circle cx="28" cy="95" r="2.5" fill="#f87171" opacity="0.8" />
      <circle cx="92" cy="95" r="2.5" fill="#38bdf8" opacity="0.8" />
      <path d="M50 94 L53 88 L58 91 L62 84" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// Set Square / Drafting Triangle 3D style for Forces & Motion
export const RulerIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="triangleGrad" x1="20" y1="20" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#93c5fd" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
        </linearGradient>
        <filter id="rulerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#38bdf8" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#rulerShadow)" transform="rotate(-12 60 60)">
        {/* Outer triangle */}
        <polygon
          points="25,95 95,95 25,25"
          fill="url(#triangleGrad)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner cutout */}
        <polygon
          points="35,85 75,85 35,45"
          fill="#f0f9ff"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Measurement tick marks */}
        <line x1="32" y1="95" x2="32" y2="90" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="42" y1="95" x2="42" y2="88" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="52" y1="95" x2="52" y2="90" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="62" y1="95" x2="62" y2="88" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="72" y1="95" x2="72" y2="90" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="82" y1="95" x2="82" y2="88" stroke="#1e40af" strokeWidth="1.5" />

        <line x1="25" y1="88" x2="30" y2="88" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="25" y1="78" x2="32" y2="78" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="25" y1="68" x2="30" y2="68" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="25" y1="58" x2="32" y2="58" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="25" y1="48" x2="30" y2="48" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="25" y1="38" x2="32" y2="38" stroke="#1e40af" strokeWidth="1.5" />

        {/* Angle degree arc */}
        <path d="M 68 85 A 15 15 0 0 0 62 76" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
      </g>
    </svg>
  );
};

// DNA Helix 3D style for Genetics / Molecular Physics
export const DnaIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dnaBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="dnaPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="dnaPurple" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      <g transform="rotate(45 60 60)">
        {/* Rungs */}
        <line x1="45" y1="35" x2="75" y2="35" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="50" x2="70" y2="50" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="45" y1="65" x2="75" y2="65" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="80" x2="80" y2="80" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="48" y1="95" x2="72" y2="95" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />

        {/* Nodes */}
        <circle cx="45" cy="35" r="7" fill="url(#dnaBlue)" />
        <circle cx="75" cy="35" r="7" fill="url(#dnaPink)" />

        <circle cx="50" cy="50" r="6" fill="url(#dnaPink)" />
        <circle cx="70" cy="50" r="6" fill="url(#dnaBlue)" />

        <circle cx="60" cy="65" r="7" fill="url(#dnaPurple)" />
        <circle cx="45" cy="65" r="6.5" fill="url(#dnaBlue)" />
        <circle cx="75" cy="65" r="6.5" fill="url(#dnaPink)" />

        <circle cx="40" cy="80" r="7" fill="url(#dnaPink)" />
        <circle cx="80" cy="80" r="7" fill="url(#dnaBlue)" />

        <circle cx="48" cy="95" r="6" fill="url(#dnaBlue)" />
        <circle cx="72" cy="95" r="6" fill="url(#dnaPink)" />

        {/* Smooth flowing strand overlay */}
        <path
          d="M 45 25 Q 40 45 60 62 T 48 105"
          stroke="url(#dnaBlue)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M 75 25 Q 80 45 60 62 T 72 105"
          stroke="url(#dnaPink)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      </g>
    </svg>
  );
};

// Coder Tutor Illustration
export const CoderTutorAvatar: React.FC<{ className?: string }> = ({ className = "w-14 h-14" }) => {
  return (
    <div className={`${className} rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-900 flex-shrink-0 flex items-center justify-center relative p-1 shadow-md group-hover:scale-105 transition-transform duration-300`}>
      <svg viewBox="0 0 80 80" className="w-full h-full rounded-xl">
        {/* Cozy room background with warm ambient light */}
        <rect width="80" height="80" fill="#0f172a" />
        <rect x="5" y="8" width="22" height="30" rx="3" fill="#1e293b" opacity="0.6" />
        <line x1="8" y1="18" x2="22" y2="18" stroke="#334155" strokeWidth="1.5" />
        <line x1="8" y1="28" x2="22" y2="28" stroke="#334155" strokeWidth="1.5" />

        {/* Window with night stars */}
        <circle cx="15" cy="14" r="1.5" fill="#38bdf8" />
        <circle cx="22" cy="22" r="1" fill="#fde047" />

        {/* Desk and green CRT monitor */}
        <rect x="8" y="42" width="26" height="20" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <rect x="11" y="45" width="20" height="14" rx="2" fill="#064e3b" />
        <line x1="14" y1="49" x2="26" y2="49" stroke="#34d399" strokeWidth="1.5" />
        <line x1="14" y1="53" x2="22" y2="53" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="27" cy="56" r="1" fill="#10b981" />

        {/* Character profile in warm orange hoodie */}
        {/* Head & Hair */}
        <circle cx="54" cy="38" r="13" fill="#fed7aa" />
        <path d="M42 35 C 42 22 66 22 66 35 C 66 40 64 45 61 46 C 58 43 55 43 53 45 C 50 42 47 43 45 46 Z" fill="#78350f" />
        {/* Eye & smiling cheek */}
        <circle cx="48" cy="38" r="1.8" fill="#1e293b" />
        <path d="M47 43 Q 50 46 54 44" stroke="#c2410c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        {/* Headphones */}
        <path d="M54 23 C 45 23 44 32 44 36" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" fill="none" />
        <rect x="42" y="34" width="4" height="9" rx="2" fill="#0284c7" />

        {/* Orange Hoodie Body */}
        <path d="M38 65 C 38 52 46 50 56 50 C 66 50 72 52 74 65 Z" fill="#ea580c" />
        {/* Hands typing */}
        <ellipse cx="40" cy="62" rx="4" ry="3" fill="#fed7aa" />
        <ellipse cx="48" cy="64" rx="4" ry="3" fill="#fed7aa" />
      </svg>
    </div>
  );
};

// Physics Mentor Illustration
export const PhysicsTutorAvatar: React.FC<{ className?: string }> = ({ className = "w-14 h-14" }) => {
  return (
    <div className={`${className} rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-900 flex-shrink-0 flex items-center justify-center relative p-1 shadow-md group-hover:scale-105 transition-transform duration-300`}>
      <svg viewBox="0 0 80 80" className="w-full h-full rounded-xl">
        {/* Green chalkboard background with formulas */}
        <rect width="80" height="80" fill="#064e3b" />
        {/* Chalk markings: E=mc², F=ma */}
        <text x="10" y="22" fill="#6ee7b7" fontSize="8" fontFamily="monospace" opacity="0.6">E=mc²</text>
        <text x="12" y="34" fill="#a7f3d0" fontSize="7" fontFamily="monospace" opacity="0.4">F=ma</text>
        <circle cx="30" cy="18" r="5" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="1 1" opacity="0.5" fill="none" />

        {/* Physics mentor character */}
        {/* Body / Sweater */}
        <path d="M38 66 C 38 54 46 51 55 51 C 65 51 72 54 74 66 Z" fill="#d97706" />
        <path d="M52 51 L55 58 L58 51 Z" fill="#f8fafc" />

        {/* Head */}
        <circle cx="55" cy="36" r="12" fill="#fed7aa" />
        {/* Hair */}
        <path d="M44 32 C 44 22 66 22 66 32 C 64 25 50 25 44 32 Z" fill="#1c1917" />
        {/* Glasses */}
        <rect x="47" y="33" width="7" height="6" rx="1.5" stroke="#0f172a" strokeWidth="1.2" fill="#ffffff" fillOpacity="0.3" />
        <rect x="56" y="33" width="7" height="6" rx="1.5" stroke="#0f172a" strokeWidth="1.2" fill="#ffffff" fillOpacity="0.3" />
        <line x1="54" y1="36" x2="56" y2="36" stroke="#0f172a" strokeWidth="1.2" />
        {/* Eyes behind glasses */}
        <circle cx="50" cy="36" r="1.2" fill="#0f172a" />
        <circle cx="59" cy="36" r="1.2" fill="#0f172a" />
        {/* Smile */}
        <path d="M52 42 Q 55 45 58 42" stroke="#b45309" strokeWidth="1" strokeLinecap="round" fill="none" />

        {/* Book being held */}
        <rect x="36" y="55" width="20" height="15" rx="2" fill="#1e3a8a" transform="rotate(-15 46 62)" />
        <line x1="39" y1="58" x2="49" y2="55" stroke="#93c5fd" strokeWidth="1" transform="rotate(-15 46 62)" />
      </svg>
    </div>
  );
};

// Mindjoy logo SVG icon
export const MindjoyLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
        {/* Smooth gradient rounded M shape */}
        <path
          d="M6 26V14C6 9.58 9.58 6 14 6C16.3 6 18.37 6.97 19.83 8.52C21.29 6.97 23.36 6 25.66 6C30.08 6 33.66 9.58 33.66 14V26"
          stroke="url(#mindjoyGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="18" r="2.5" fill="#3b82f6" />
        <circle cx="26" cy="18" r="2.5" fill="#6366f1" />
        <defs>
          <linearGradient id="mindjoyGrad" x1="6" y1="6" x2="33" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="0.5" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
