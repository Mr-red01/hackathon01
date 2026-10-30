import React from 'react';

// Geometric Avatar matching Smartie's profile avatar
export const SmartieAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size = 'md' }) => {
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
          
          {/* Geometric angular facets */}
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

// Smartie logo SVG icon
export const SmartieLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 36 36" className="w-full h-full" fill="none">
        <rect width="36" height="36" rx="9" fill="url(#smartieGrad)" />
        <path
          d="M23 12C21.5 10.5 19 10 16.5 10.5C13.5 11.2 11.5 13.5 11.5 16.2C11.5 19.5 14.5 20.8 17.5 21.6C21 22.5 24 23.5 24 26.5C24 29.5 21.5 31 18 31C14.5 31 12.2 29.5 11 28"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="11" r="2.5" fill="#fde047" />
        <defs>
          <linearGradient id="smartieGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="0.5" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Chemistry (Che) Beaker / Flask 3D-styled Illustration
export const BeakerIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chemGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="liquidGrad" x1="40" y1="50" x2="80" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.95" />
        </linearGradient>
        <filter id="chemGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#10b981" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#chemGlow)">
        {/* Flask Glass Outline */}
        <path
          d="M50 20 H70 V42 L92 88 C95 95 90 102 82 102 H38 C30 102 25 95 28 88 L50 42 V20 Z"
          fill="#f0fdf4"
          fillOpacity="0.7"
          stroke="#059669"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Liquid Inside */}
        <path
          d="M38 82 L48 62 C55 64 65 60 72 63 L82 82 C86 90 82 98 75 98 H45 C38 98 34 90 38 82 Z"
          fill="url(#liquidGrad)"
        />

        {/* Measuring ticks */}
        <line x1="46" y1="72" x2="54" y2="72" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="80" x2="52" y2="80" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <line x1="39" y1="88" x2="50" y2="88" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

        {/* Floating chemical bubbles */}
        <circle cx="58" cy="74" r="3.5" fill="#a7f3d0" fillOpacity="0.8" />
        <circle cx="68" cy="82" r="2.5" fill="#a7f3d0" fillOpacity="0.8" />
        <circle cx="60" cy="48" r="3" fill="#34d399" />
        <circle cx="56" cy="34" r="2.5" fill="#10b981" />
        <circle cx="64" cy="22" r="2" fill="#059669" />
      </g>
    </svg>
  );
};

// Mathematics (Maths) Calculus & Geometry 3D-styled Illustration
export const MathIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mathGrad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <filter id="mathGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#mathGlow)">
        {/* Modern geometric cubic prism / grid backdrop */}
        <rect x="22" y="24" width="76" height="76" rx="18" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
        
        {/* Sine wave curve */}
        <path
          d="M 28 62 C 40 40, 52 84, 64 62 C 76 40, 88 84, 94 62"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Sigma (Σ) symbol badge */}
        <rect x="30" y="30" width="22" height="22" rx="6" fill="#3b82f6" />
        <text x="41" y="46" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">∑</text>

        {/* Pi (π) symbol badge */}
        <rect x="68" y="70" width="22" height="22" rx="6" fill="#1d4ed8" />
        <text x="79" y="86" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">π</text>

        {/* Square Root symbol √x */}
        <text x="76" y="44" fill="#0284c7" fontSize="13" fontWeight="bold" fontFamily="sans-serif">√x</text>
      </g>
    </svg>
  );
};

// Physics (Phy) Quantum & Magnetism 3D-styled Illustration
export const AtomIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="atomGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="atomGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#818cf8" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#atomGlow)" transform="translate(60 60)">
        {/* Orbital 1 */}
        <ellipse rx="46" ry="18" stroke="#818cf8" strokeWidth="2.5" transform="rotate(30)" fill="none" strokeDasharray="3 2" opacity="0.8" />
        <circle cx="36" cy="12" r="4.5" fill="#a855f7" />

        {/* Orbital 2 */}
        <ellipse rx="46" ry="18" stroke="#38bdf8" strokeWidth="2.5" transform="rotate(-30)" fill="none" />
        <circle cx="-38" cy="14" r="4.5" fill="#38bdf8" />

        {/* Orbital 3 (Vertical) */}
        <ellipse rx="46" ry="18" stroke="#c084fc" strokeWidth="2.5" transform="rotate(90)" fill="none" />
        <circle cx="0" cy="-44" r="4.5" fill="#ec4899" />

        {/* Nucleus core */}
        <circle cx="0" cy="0" r="13" fill="url(#atomGrad)" />
        <circle cx="-3" cy="-3" r="4" fill="#ffffff" fillOpacity="0.8" />
      </g>
    </svg>
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

      <g filter="url(#magnetGlow)">
        <path
          d="M32 75 V 45 C 32 29.5 44.5 17 60 17 C 75.5 17 88 29.5 88 45 V 75"
          stroke="url(#magnetRed)"
          strokeWidth="16"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        <path
          d="M36 45 C 36 32 46.5 22 60 22 C 73.5 22 84 32 84 45"
          stroke="#ffa8a8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>

      <rect x="24" y="72" width="16" height="15" rx="3" fill="url(#silverPole)" />
      <line x1="26" y1="79" x2="38" y2="79" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <text x="32" y="84" fill="#374151" fontSize="7" fontWeight="bold" textAnchor="middle">N</text>

      <rect x="80" y="72" width="16" height="15" rx="3" fill="url(#silverPole)" />
      <line x1="82" y1="79" x2="94" y2="79" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      <text x="88" y="84" fill="#374151" fontSize="7" fontWeight="bold" textAnchor="middle">S</text>
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
        <polygon
          points="25,95 95,95 25,25"
          fill="url(#triangleGrad)"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <polygon
          points="35,85 75,85 35,45"
          fill="#f0f9ff"
          stroke="#60a5fa"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line x1="32" y1="95" x2="32" y2="90" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="42" y1="95" x2="42" y2="88" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="52" y1="95" x2="52" y2="90" stroke="#1e40af" strokeWidth="1.5" />
        <line x1="62" y1="95" x2="62" y2="88" stroke="#1e40af" strokeWidth="1.5" />
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
      </defs>

      <g transform="rotate(45 60 60)">
        <line x1="45" y1="35" x2="75" y2="35" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="50" x2="70" y2="50" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <line x1="45" y1="65" x2="75" y2="65" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
        <circle cx="45" cy="35" r="7" fill="url(#dnaBlue)" />
        <circle cx="75" cy="35" r="7" fill="url(#dnaPink)" />
        <circle cx="50" cy="50" r="6" fill="url(#dnaPink)" />
        <circle cx="70" cy="50" r="6" fill="url(#dnaBlue)" />
      </g>
    </svg>
  );
};

// Coder Tutor Illustration
export const CoderTutorAvatar: React.FC<{ className?: string }> = ({ className = "w-14 h-14" }) => {
  return (
    <div className={`${className} rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-900 flex-shrink-0 flex items-center justify-center relative p-1 shadow-md group-hover:scale-105 transition-transform duration-300`}>
      <svg viewBox="0 0 80 80" className="w-full h-full rounded-xl">
        <rect width="80" height="80" fill="#0f172a" />
        <circle cx="54" cy="38" r="13" fill="#fed7aa" />
        <path d="M42 35 C 42 22 66 22 66 35 C 66 40 64 45 61 46 C 58 43 55 43 53 45 C 50 42 47 43 45 46 Z" fill="#78350f" />
        <circle cx="48" cy="38" r="1.8" fill="#1e293b" />
        <path d="M38 65 C 38 52 46 50 56 50 C 66 50 72 52 74 65 Z" fill="#ea580c" />
      </svg>
    </div>
  );
};

// Physics Mentor Illustration
export const PhysicsTutorAvatar: React.FC<{ className?: string }> = ({ className = "w-14 h-14" }) => {
  return (
    <div className={`${className} rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-900 flex-shrink-0 flex items-center justify-center relative p-1 shadow-md group-hover:scale-105 transition-transform duration-300`}>
      <svg viewBox="0 0 80 80" className="w-full h-full rounded-xl">
        <rect width="80" height="80" fill="#064e3b" />
        <text x="10" y="22" fill="#6ee7b7" fontSize="8" fontFamily="monospace" opacity="0.6">E=mc²</text>
        <path d="M38 66 C 38 54 46 51 55 51 C 65 51 72 54 74 66 Z" fill="#d97706" />
        <circle cx="55" cy="36" r="12" fill="#fed7aa" />
        <path d="M44 32 C 44 22 66 22 66 32 C 64 25 50 25 44 32 Z" fill="#1c1917" />
        <circle cx="50" cy="36" r="1.2" fill="#0f172a" />
        <circle cx="59" cy="36" r="1.2" fill="#0f172a" />
      </svg>
    </div>
  );
};
