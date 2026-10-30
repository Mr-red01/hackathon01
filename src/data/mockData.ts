import type {
  StudentProfile,
  LearningPreference,
  LearningValue,
  LearningCourse,
  Tutor,
  TaskItem,
  QuizQuestion,
  SyllabusModule,
  StudyDay,
  FlashcardDeck
} from '../types';

export const initialProfile: StudentProfile = {
  name: 'Smartie',
  email: 'smartie@smartie.ai',
  avatarUrl: '', // Generated dynamically via SVG geometric avatar
  title: 'PROBLEM SOLVER',
  gamePlan: "I'm aiming to do well academically by mastering the basics."
};

export const learningPreferences: LearningPreference[] = [
  { name: 'Seeing & Drawing', percentage: 75, color: '#3b82f6' }, // blue
  { name: 'Reading & Writing', percentage: 38, color: '#8b5cf6' }, // purple
  { name: 'Speaking & Listening', percentage: 22, color: '#f97316' } // orange
];

export const learningValues: LearningValue[] = [
  { label: 'Growth', emoji: '🌱' },
  { label: 'Creativity', emoji: '🎨' },
  { label: 'Courage', emoji: '🦁' },
  { label: 'Learning', emoji: '📚' },
  { label: 'Excellence', emoji: '⭐' }
];

export const continueLearningCourses: LearningCourse[] = [
  {
    id: 'course-1',
    title: 'Electricity & Magnetism',
    subject: 'Physics 12A',
    progress: 86,
    duration: '30 min',
    dueDate: 'Due Tomorrow, 9:00',
    dueSoon: true,
    theme: 'pink',
    iconType: 'magnet',
    description: 'Explore electromagnetic induction, Faraday’s Law, magnetic flux density, and Lorentz force applications with guided simulations.',
    modulesCompleted: 12,
    totalModules: 14
  },
  {
    id: 'course-2',
    title: 'Forces & Motion Essentials',
    subject: 'Physics 12A',
    progress: 57,
    duration: '45 min',
    dueDate: 'Due 12 June',
    dueSoon: false,
    theme: 'cyan',
    avatars: ['E', 'A'],
    iconType: 'ruler',
    description: 'Master Newton’s three laws, free-body diagrams, coefficient of friction, and rotational kinetic energy calculations.',
    modulesCompleted: 8,
    totalModules: 14
  },
  {
    id: 'course-3',
    title: 'Forces & Motion Essentials',
    subject: 'Smartie Physics',
    progress: 42,
    duration: '2 hrs',
    theme: 'purple',
    iconType: 'dna',
    description: 'Connect classical mechanics with molecular dynamics, atomic motion, and biological fluid drag equations.',
    modulesCompleted: 5,
    totalModules: 12
  }
];

export const tutorsList: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Coding Tutor',
    courseTag: 'CS500',
    lastActive: '4 weeks ago',
    description: 'Learn coding step-by-step with a patient guide focused on clear logic, algorithms, and practical debugging.',
    avatarType: 'coder',
    specialty: 'Python & Data Structures',
    color: '#0284c7'
  },
  {
    id: 'tutor-2',
    name: 'Physics Mentor',
    courseTag: 'Physics 101',
    lastActive: '2 weeks ago',
    description: 'Make physics clear! Learn how equations connect to your everyday physical world through intuitive analogies.',
    avatarType: 'physicist',
    specialty: 'Classical Mechanics & Optics',
    color: '#d97706'
  }
];

// 16 weeks of realistic study heatmap activity (Jan to Apr)
export const generateHeatmapData = (): StudyDay[][] => {
  // 16 columns (weeks), each with 7 rows (Sunday to Saturday)
  const weeks: StudyDay[][] = [];
  const baseDate = new Date(2026, 0, 4); // Start near early Jan

  // Specific high activity pattern matching the reference image layout:
  // Jan has lighter activity, Feb and Mar have dense blocks (especially mid-week), Apr starts filling
  for (let w = 0; w < 16; w++) {
    const weekDays: StudyDay[] = [];
    for (let d = 0; d < 7; d++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + (w * 7) + d);
      const dateString = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });

      // Deterministic realistic density pattern
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      let count = 0;

      // Higher chance on weekdays (d between 1 and 5)
      const isWeekday = d >= 1 && d <= 5;
      const weekPhase = w;

      if (weekPhase < 3) {
        // Early Jan: lighter
        if (isWeekday && (w + d) % 2 === 0) {
          level = 1;
          count = 1;
        }
      } else if (weekPhase >= 3 && weekPhase <= 7) {
        // Late Jan & Feb: active
        if (isWeekday) {
          level = ((w + d * 2) % 3 === 0) ? 3 : ((w + d) % 2 === 0 ? 2 : 1);
          count = level * 2;
        } else if ((w + d) % 3 === 0) {
          level = 1;
          count = 1;
        }
      } else if (weekPhase >= 8 && weekPhase <= 12) {
        // Late Feb & March: very dense blocks like screenshot
        if (isWeekday) {
          level = ((w * 3 + d) % 4 === 0) ? 4 : (((w + d) % 3 === 0) ? 3 : 2);
          count = level * 2 + 1;
        } else {
          level = (w % 2 === 0) ? 2 : 0;
          count = level;
        }
      } else {
        // April
        if (isWeekday) {
          level = ((w + d) % 3 === 0) ? 4 : 3;
          count = level * 2;
        } else {
          level = 1;
          count = 1;
        }
      }

      // Hardcode a few empty slots to look natural
      if ((w === 1 && d === 2) || (w === 4 && d === 0) || (w === 9 && d === 6) || (w === 13 && d === 0)) {
        level = 0;
        count = 0;
      }

      // Guarantee level 4 spots like the dark blue squares in the screenshot
      if ((w === 9 && d === 3) || (w === 10 && d === 2) || (w === 11 && d === 4) || (w === 12 && d === 1) || (w === 14 && d === 3)) {
        level = 4;
        count = 6;
      }

      weekDays.push({
        date: dateString,
        dayOfWeek: d,
        count,
        level,
        hours: Number((count * 0.75).toFixed(1))
      });
    }
    weeks.push(weekDays);
  }
  return weeks;
};

export const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Review Electromagnetic Induction Notes',
    subject: 'Physics 12A',
    dueDate: 'Tomorrow, 9:00 AM',
    completed: false,
    priority: 'high'
  },
  {
    id: 'task-2',
    title: 'Complete Free-Body Diagrams Worksheet',
    subject: 'Forces & Motion',
    dueDate: 'Today, 5:00 PM',
    completed: false,
    priority: 'high'
  },
  {
    id: 'task-3',
    title: 'Practice Binary Search Trees with Coding Tutor',
    subject: 'CS500 Coding',
    dueDate: 'Friday, 3:00 PM',
    completed: true,
    priority: 'medium'
  },
  {
    id: 'task-4',
    title: 'Structural Load Simulation Lab 3',
    subject: 'Structural Engineering',
    dueDate: 'Next Monday',
    completed: false,
    priority: 'medium'
  },
  {
    id: 'task-5',
    title: 'Review Startup Unit Economics Case Study',
    subject: 'Startup Strategy',
    dueDate: 'Next Wednesday',
    completed: true,
    priority: 'low'
  }
];

export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    subject: 'Physics 12A: Electromagnetism',
    question: 'According to Faraday’s Law of Induction, what induces an electromotive force (EMF) in a closed circuit loop?',
    options: [
      'A constant uniform magnetic field',
      'A time-varying magnetic flux through the loop',
      'The electrical resistance of the wire',
      'A stationary electric charge near the loop'
    ],
    correctAnswer: 1,
    explanation: 'Faraday’s law states that the induced electromotive force (EMF) in any closed circuit is equal to the negative of the time rate of change of the magnetic flux through the circuit.'
  },
  {
    id: 2,
    subject: 'Forces & Motion Essentials',
    question: 'If the net external force acting on an object is zero, what can be concluded about its motion?',
    options: [
      'The object must be completely at rest',
      'The object maintains constant velocity (speed and direction)',
      'The object experiences constant positive acceleration',
      'The object will immediately stop moving'
    ],
    correctAnswer: 1,
    explanation: 'By Newton’s First Law of Motion, an object at rest stays at rest, and an object in motion continues with constant velocity unless acted upon by a nonzero net external force.'
  },
  {
    id: 3,
    subject: 'CS500: Algorithms',
    question: 'What is the average time complexity of searching an element in a balanced Binary Search Tree (BST) of size n?',
    options: [
      'O(1)',
      'O(log n)',
      'O(n)',
      'O(n log n)'
    ],
    correctAnswer: 1,
    explanation: 'In a balanced BST, each comparison halves the remaining search space, resulting in logarithmic O(log n) average time complexity.'
  },
  {
    id: 4,
    subject: 'Physics 12A: Lorentz Force',
    question: 'A positively charged particle moves directly north in a magnetic field directed vertically upward out of the ground. In which direction does the magnetic force act?',
    options: [
      'East',
      'West',
      'South',
      'Downwards into the ground'
    ],
    correctAnswer: 0,
    explanation: 'Using the right-hand rule (F = q * v × B): index finger pointing north (velocity v), middle finger pointing up (magnetic field B), thumb points east (force F).'
  }
];

export const mockLeaderboard = [
  { rank: 1, name: 'Alex Chen', time: '16.2 hrs', avatar: 'AC', color: '#6366f1', badge: '🏆 Top Learner' },
  { rank: 2, name: 'Smartie (You)', time: '14.5 hrs', avatar: 'S', color: '#3b82f6', badge: '🔥 14-day streak' },
  { rank: 3, name: 'Leo Martinez', time: '12.8 hrs', avatar: 'LM', color: '#10b981', badge: '⚡ Quick Finisher' },
  { rank: 4, name: 'Sarah Jenkins', time: '11.0 hrs', avatar: 'SJ', color: '#f59e0b', badge: '📚 Avid Reader' }
];

export const initialSyllabusModules: SyllabusModule[] = [
  {
    id: 'module-default-physics',
    title: 'Physics 12A & Classical Mechanics',
    subject: 'Physics',
    syllabusText: `1. Faraday's Law of Induction: Time-varying magnetic flux induces EMF in closed loops.
2. Lenz's Law: Induced current opposes original change in flux.
3. Newton's Laws of Motion: Inertia, F=ma, Action-Reaction pairs.
4. Lorentz Force: Force on moving charge in magnetic fields, F = q(v x B).
5. Rotational Dynamics: Torque, angular momentum, and moment of inertia.`,
    createdAt: 'Default Curriculum',
    questionsCount: 4,
    questions: sampleQuizQuestions,
    isCustom: false,
  },
  {
    id: 'module-sample-cs',
    title: 'CS500 Data Structures & Algorithms',
    subject: 'Computer Science',
    syllabusText: `1. Binary Search Trees: In-order traversal yields sorted order; average lookup is O(log n).
2. Hash Tables: Key-value mapping with constant O(1) expected lookup, collision resolution via chaining or open addressing.
3. Graph Algorithms: Breadth-First Search (BFS) for shortest unweighted path; Depth-First Search (DFS) for cycle detection.
4. Dynamic Programming: Memoization and optimal substructure applied to knapsack and Fibonacci problems.`,
    createdAt: 'Curriculum Core',
    questionsCount: 3,
    questions: [
      {
        id: 101,
        subject: 'CS500 Data Structures',
        question: 'Which traversal of a Binary Search Tree produces values in strictly ascending sorted order?',
        options: ['Pre-order traversal', 'In-order traversal', 'Post-order traversal', 'Level-order BFS traversal'],
        correctAnswer: 1,
        explanation: 'In-order traversal visits Left Subtree -> Root Node -> Right Subtree, which directly yields elements in ascending sorted order for any valid BST.'
      },
      {
        id: 102,
        subject: 'CS500 Data Structures',
        question: 'In an open addressing hash table with linear probing, what is the primary drawback when multiple keys hash to adjacent slots?',
        options: ['Primary clustering', 'Memory fragmentation', 'Stack overflow', 'Dangling pointers'],
        correctAnswer: 0,
        explanation: 'Primary clustering occurs when occupied slots cluster together, creating longer probe sequences and degrading search performance.'
      },
      {
        id: 103,
        subject: 'CS500 Algorithms',
        question: 'Which graph traversal algorithm guarantees finding the shortest path between two vertices in an unweighted graph?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Topological Sort', 'Kruskal Algorithm'],
        correctAnswer: 1,
        explanation: 'Breadth-First Search explores vertices level by level, guaranteeing that the first time a target vertex is reached, the path taken has minimum edge count.'
      }
    ],
    isCustom: false,
  }
];

export const syllabusPresets = [
  {
    title: 'Cellular Respiration & Bioenergetics',
    subject: 'Biology',
    syllabusText: `• Glycolysis: Glucose breaks down into pyruvate in the cytoplasm, yielding 2 ATP and 2 NADH.
• Krebs Cycle (Citric Acid Cycle): Occurs in mitochondrial matrix; produces NADH, FADH2, and CO2.
• Electron Transport Chain: Proton gradient across inner mitochondrial membrane drives ATP synthase.
• Anaerobic Fermentation: Lactic acid or ethanol regeneration of NAD+ in absence of oxygen.`
  },
  {
    title: 'Thermodynamics & Heat Engines',
    subject: 'Applied Physics',
    syllabusText: `• 0th Law: Thermal equilibrium defines temperature.
• 1st Law: Delta U = Q - W (Conservation of Energy).
• 2nd Law: Total entropy of an isolated system always increases; Carnot engine sets theoretical maximum efficiency.
• 3rd Law: As temperature approaches absolute zero (0 Kelvin), entropy of a pure crystalline substance approaches zero.`
  },
  {
    title: 'React Fundamentals & Component Lifecycle',
    subject: 'Web Development',
    syllabusText: `• Virtual DOM & Reconciliation: React diffs memory representations before touching the real browser DOM.
• useState & State Immutability: State must never be mutated directly; setters trigger scheduled re-renders.
• useEffect Hook: Handles side-effects like data fetching, subscriptions, and DOM updates with dependency arrays.
• Props vs State: Props are read-only inputs passed from parents, whereas state is local managed data.`
  }
];

export const initialFlashcardDecks: FlashcardDeck[] = [
  {
    id: 'deck-che',
    subject: 'Chemistry',
    shortName: 'Che',
    title: 'Organic Chemistry & Bonding',
    description: 'Reaction mechanisms, hybridizations, Lewis structures, and thermodynamic equilibrium.',
    theme: 'emerald',
    iconType: 'beaker',
    syllabusSource: `• Electronegativity & Dipole Moments: Difference in Pauling electronegativity creates polar covalent bonds.
• Hybridization: sp3 forms tetrahedral (109.5°), sp2 forms trigonal planar (120°), sp forms linear (180°).
• SN1 vs SN2 Reactions: SN2 is bimolecular with concerted backside attack (inversion); SN1 proceeds via carbocation intermediate.
• Le Chatelier's Principle: When a stress is applied to a chemical system at equilibrium, the system shifts to counteract that stress.
• Hydrogen Bonding: Strong intermolecular dipole attraction occurring between hydrogen and N, O, or F atoms.
• Gibbs Free Energy (ΔG = ΔH - TΔS): Spontaneous reactions require negative ΔG under constant temperature and pressure.`,
    lastStudied: 'Today',
    cards: [
      {
        id: 'che-1',
        subject: 'Chemistry',
        topic: 'Chemical Bonding',
        front: 'What is the hybridization and bond angle in a methane (CH₄) molecule?',
        back: 'sp³ hybridization with a tetrahedral geometry and 109.5° bond angles.',
        isMastered: true
      },
      {
        id: 'che-2',
        subject: 'Chemistry',
        topic: 'Organic Mechanisms',
        front: 'Differentiate between SN1 and SN2 reaction kinetics & stereochemistry.',
        back: 'SN2: One-step concerted backside attack resulting in stereochemical inversion (2nd order kinetics: rate = k[substrate][nucleophile]).\nSN1: Two-step with rate-determining carbocation intermediate resulting in racemization (1st order kinetics: rate = k[substrate]).',
        isMastered: true
      },
      {
        id: 'che-3',
        subject: 'Chemistry',
        topic: 'Chemical Equilibrium',
        front: 'What does Le Chatelier’s Principle predict when pressure is increased on a gaseous system?',
        back: 'The equilibrium shifts toward the side of the reaction with fewer moles of gas to relieve the pressure.',
        isMastered: false
      },
      {
        id: 'che-4',
        subject: 'Chemistry',
        topic: 'Thermodynamics',
        front: 'What condition guarantees a chemical reaction is thermodynamically spontaneous?',
        back: 'A negative change in Gibbs Free Energy (ΔG < 0), governed by ΔG = ΔH - TΔS.',
        isMastered: true
      },
      {
        id: 'che-5',
        subject: 'Chemistry',
        topic: 'Intermolecular Forces',
        front: 'What atoms must Hydrogen be covalently bonded with to form true Hydrogen Bonds?',
        back: 'Highly electronegative atoms with lone pairs: Nitrogen (N), Oxygen (O), or Fluorine (F).',
        isMastered: false
      },
      {
        id: 'che-6',
        subject: 'Chemistry',
        topic: 'Acid-Base Equilibria',
        front: 'How is pH related to [H⁺] concentration, and what is Ka?',
        back: 'pH = -log₁₀[H⁺]. Ka is the acid dissociation constant; lower pKa values denote stronger acids.',
        isMastered: false
      }
    ]
  },
  {
    id: 'deck-maths',
    subject: 'Mathematics',
    shortName: 'Maths',
    title: 'Calculus & Linear Algebra',
    description: 'Eigenvalues, differential equations, Fundamental Theorem of Calculus, and Taylor expansions.',
    theme: 'cyan',
    iconType: 'math',
    syllabusSource: `• Fundamental Theorem of Calculus: d/dx ∫[a to x] f(t) dt = f(x), and ∫[a to b] f'(x) dx = f(b) - f(a).
• Chain Rule & Product Rule: d/dx [f(g(x))] = f'(g(x)) * g'(x); (uv)' = u'v + uv'.
• Eigenvalues & Eigenvectors: A * v = λ * v, where det(A - λI) = 0 defines characteristic polynomial.
• Taylor Series: f(x) = ∑ [f^(n)(a) / n!] * (x - a)^n.
• Partial Derivatives & Gradient Vector: ∇f points in the direction of steepest ascent of f.
• Integration by Parts: ∫ u dv = uv - ∫ v du.`,
    lastStudied: 'Yesterday',
    cards: [
      {
        id: 'math-1',
        subject: 'Mathematics',
        topic: 'Calculus',
        front: 'State the Fundamental Theorem of Calculus (Part 1 and Part 2).',
        back: 'Part 1: If F(x) = ∫[a to x] f(t) dt, then F\'(x) = f(x).\nPart 2: If f is continuous on [a, b] and F\' = f, then ∫[a to b] f(x) dx = F(b) - F(a).',
        isMastered: true
      },
      {
        id: 'math-2',
        subject: 'Mathematics',
        topic: 'Linear Algebra',
        front: 'How do you find the eigenvalues (λ) of an n×n square matrix A?',
        back: 'Solve the characteristic equation: det(A - λI) = 0, where I is the n×n identity matrix.',
        isMastered: false
      },
      {
        id: 'math-3',
        subject: 'Mathematics',
        topic: 'Calculus',
        front: 'What is the formula for Integration by Parts?',
        back: '∫ u dv = u·v - ∫ v du (derived from the product rule of differentiation).',
        isMastered: true
      },
      {
        id: 'math-4',
        subject: 'Mathematics',
        topic: 'Multivariable Calculus',
        front: 'What geometrical property does the gradient vector ∇f(x, y) represent?',
        back: 'It points in the direction of greatest rate of increase (steepest ascent) of the function, and its magnitude is the directional derivative in that direction.',
        isMastered: true
      },
      {
        id: 'math-5',
        subject: 'Mathematics',
        topic: 'Series & Sequences',
        front: 'What is the Taylor Series expansion of f(x) centered around x = a?',
        back: 'f(x) = ∑ [f^(n)(a) / n!] · (x - a)ⁿ from n = 0 to infinity.',
        isMastered: false
      },
      {
        id: 'math-6',
        subject: 'Mathematics',
        topic: 'Linear Algebra',
        front: 'What does it mean for a set of vectors to be linearly independent?',
        back: 'No vector in the set can be expressed as a linear combination of the others; c₁v₁ + c₂v₂ + ... + cₖvₖ = 0 only when all scalars cᵢ = 0.',
        isMastered: true
      }
    ]
  },
  {
    id: 'deck-phy',
    subject: 'Physics',
    shortName: 'Phy',
    title: 'Mechanics & Electromagnetism',
    description: 'Faraday’s Law, Lorentz Force, Newton dynamics, and conservation of angular momentum.',
    theme: 'purple',
    iconType: 'atom',
    syllabusSource: `• Faraday's Law of Induction: EMF ε = -dΦ/dt (changing magnetic flux induces electromotive force).
• Lorentz Force Equation: F = q(E + v × B).
• Newton's 2nd Law & Momentum: F_net = dp/dt = m*a (for constant mass).
• Work-Energy Theorem: Total work done on an object equals change in its kinetic energy (W_net = ΔK).
• Conservation of Angular Momentum: If net external torque is zero, L = I*ω is conserved.
• Lenz's Law: The direction of induced current opposes the change in magnetic flux that produced it.`,
    lastStudied: '2 hours ago',
    cards: [
      {
        id: 'phy-1',
        subject: 'Physics',
        topic: 'Electromagnetism',
        front: 'State Faraday’s Law of Electromagnetic Induction and Lenz’s Law.',
        back: 'Faraday’s Law: ε = -dΦ_B / dt. The induced EMF in a loop is proportional to the time rate of change of magnetic flux through it. The negative sign (Lenz’s Law) indicates the induced current opposes the flux change.',
        isMastered: true
      },
      {
        id: 'phy-2',
        subject: 'Physics',
        topic: 'Electromagnetism',
        front: 'What is the Lorentz Force formula and how do you find force direction?',
        back: 'F = q(E + v × B). For magnetic force (q * v × B), use the Right-Hand Rule: fingers point along v, curl toward B, thumb points along F (for positive charge).',
        isMastered: true
      },
      {
        id: 'phy-3',
        subject: 'Physics',
        topic: 'Mechanics',
        front: 'When is Angular Momentum (L) conserved in a rotating physical system?',
        back: 'When the net external torque acting on the system about the axis of rotation is zero (Στ_ext = 0 ⇒ dL/dt = 0).',
        isMastered: false
      },
      {
        id: 'phy-4',
        subject: 'Physics',
        topic: 'Work & Energy',
        front: 'State the Work-Energy Theorem and its mathematical formulation.',
        back: 'The net work done on a particle by all external forces equals the change in its kinetic energy: W_net = ΔK = (1/2)m(v_f² - v_i²).',
        isMastered: true
      },
      {
        id: 'phy-5',
        subject: 'Physics',
        topic: 'Rotational Dynamics',
        front: 'What is Moment of Inertia (I) and what is the rotational analogue of F = m*a?',
        back: 'Moment of Inertia I = ∑ mᵢrᵢ² (resistance to rotational acceleration). Rotational analogue: τ_net = I · α (torque = moment of inertia × angular acceleration).',
        isMastered: false
      },
      {
        id: 'phy-6',
        subject: 'Physics',
        topic: 'Waves & Oscillations',
        front: 'What is the period (T) of a simple harmonic pendulum of length L in gravitational field g?',
        back: 'T = 2π √(L / g) (for small angle approximations where sin(θ) ≈ θ).',
        isMastered: true
      }
    ]
  }
];

export const flashcardSyllabusPresets = [
  {
    subject: 'Chemistry',
    title: 'Thermochemistry & Hess’s Law',
    syllabusText: `• Hess's Law: Total enthalpy change of a reaction is independent of the pathway between initial and final states.
• Endothermic vs Exothermic: Endothermic absorbs heat (ΔH > 0, system cools surroundings); Exothermic releases heat (ΔH < 0, system warms surroundings).
• Specific Heat Capacity (q = mcΔT): Energy required to raise temperature of 1g of substance by 1°C.
• Standard Enthalpy of Formation (ΔHf°): Enthalpy change when 1 mole of compound forms from elements in standard states (elements have ΔHf° = 0).
• Calorimetry: Heat lost by hot sample equals heat gained by calorimeter water (-q_sample = q_water).`
  },
  {
    subject: 'Mathematics',
    title: 'Differential Equations & Matrices',
    syllabusText: `• Separable Differential Equations: dy/dx = g(x)h(y) can be integrated by rewriting as (1/h(y)) dy = g(x) dx.
• Integrating Factor Method: For y' + P(x)y = Q(x), multiplying by I(x) = e^(∫ P(x) dx) enables direct integration.
• Determinant Properties: det(AB) = det(A)det(B); det(A^(-1)) = 1/det(A); a matrix is invertible if and only if det(A) ≠ 0.
• Rank-Nullity Theorem: For an m×n matrix, Rank(A) + Nullity(A) = n (number of columns).
• Orthogonal Matrices: Q^T * Q = I, preserving vector lengths and dot products.`
  },
  {
    subject: 'Physics',
    title: 'Quantum Physics & Wave-Particle Duality',
    syllabusText: `• Photoelectric Effect: E = hf - Φ (Einstein showed light consists of photons; electrons only eject if photon energy exceeds work function Φ).
• de Broglie Wavelength: λ = h / p (all matter exhibits wave properties inversely proportional to momentum p = mv).
• Heisenberg Uncertainty Principle: Δx * Δp ≥ h / (4π) (position and momentum cannot both be measured with infinite precision simultaneously).
• Bohr Model of Hydrogen: Angular momentum is quantized: L = n * (h / 2π), explaining discrete spectral lines.
• Wavefunction & Born Rule: |Ψ(x,t)|² dx represents the probability density of locating the particle at position x.`
  }
];


