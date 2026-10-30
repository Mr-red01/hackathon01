import type { Flashcard } from '../types';

/**
 * Intelligent Flashcard Generator from Syllabus Notes
 * Converts raw syllabus lines, lecture bullet points, and formulas into
 * clean Question/Concept (Front) and Answer/Explanation (Back) flashcards.
 */
export function generateFlashcardsFromSyllabus(
  subject: string,
  title: string,
  syllabusText: string,
  targetCount: number = 6
): Flashcard[] {
  // Normalize and extract meaningful lines
  const rawLines = syllabusText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 5 && !l.startsWith('#'));

  // Clean bullet markers
  const cleanPoints = rawLines.map((line) =>
    line.replace(/^[-•*]|\d+\.|\([a-z0-9]+\)/i, '').trim()
  ).filter((line) => line.length > 8);

  const cards: Flashcard[] = [];
  const startId = Date.now();

  const availablePoints = cleanPoints.length > 0 ? cleanPoints : [
    `${title} foundational terminology and principles`,
    `${title} core reaction/derivation mechanisms`,
    `${title} boundary constraints and critical conditions`,
    `${title} practical calculations and real-world applications`
  ];

  const count = Math.min(targetCount, Math.max(3, availablePoints.length));

  for (let i = 0; i < count; i++) {
    const point = availablePoints[i % availablePoints.length];

    // Check if point has definition structure "Concept: Explanation" or "Concept - Explanation"
    const splitColon = point.split(/[:–—\-]/);
    let front = '';
    let back = '';

    if (splitColon.length >= 2 && splitColon[0].trim().length > 2) {
      const term = splitColon[0].trim();
      const def = splitColon.slice(1).join(':').trim();

      // Variations in front prompt phrasing for natural learning
      const promptStyle = i % 3;
      if (promptStyle === 0) {
        front = `What is ${term}?`;
      } else if (promptStyle === 1) {
        front = `Define and explain the significance of: ${term}`;
      } else {
        front = `${term} (${subject})`;
      }
      back = def;
    } else {
      // General concept sentence
      const words = point.split(' ');
      const keySnippet = words.slice(0, 4).join(' ');
      front = `Key Concept in ${title}: ${keySnippet}...`;
      back = point;
    }

    cards.push({
      id: `card-${startId}-${i}`,
      subject,
      topic: title,
      front,
      back,
      isMastered: false,
    });
  }

  return cards;
}

