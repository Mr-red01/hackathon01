import type { QuizQuestion } from '../types';

/**
 * Intelligent AI Quiz Generator from User Syllabus & Notes
 * Parses lines/concepts/bullets and synthesizes structured multiple-choice questions
 */
export function generateQuizFromSyllabus(
  title: string,
  subject: string,
  syllabusText: string,
  targetCount: number = 4
): QuizQuestion[] {
  // Normalize and split syllabus into meaningful points
  const rawLines = syllabusText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 5 && !line.startsWith('#'));

  // Clean bullet markers like "•", "-", "1.", "a)"
  const cleanPoints = rawLines.map((line) =>
    line.replace(/^[-•*]|\d+\.|\([a-z0-9]+\)/i, '').trim()
  ).filter((line) => line.length > 8);

  const generatedQuestions: QuizQuestion[] = [];
  const startId = Date.now();

  // If user provided fewer points, generate questions based on what they gave
  const availablePoints = cleanPoints.length > 0 ? cleanPoints : [
    `${title} foundational principles and terminology`,
    `${title} core processes and theoretical laws`,
    `${title} practical applications and boundary conditions`,
    `${title} optimization and diagnostic analysis`
  ];

  const questionsToMake = Math.min(targetCount, Math.max(2, availablePoints.length));

  for (let i = 0; i < questionsToMake; i++) {
    const point = availablePoints[i % availablePoints.length];
    
    // Analyze if the point has a definition like "Concept: Description" or "Concept - Description"
    const splitColon = point.split(/[:–—\-]/);
    let concept = '';
    let explanationDetail = '';

    if (splitColon.length >= 2 && splitColon[0].trim().length > 2) {
      concept = splitColon[0].trim();
      explanationDetail = splitColon.slice(1).join(':').trim();
    } else {
      const words = point.split(' ');
      concept = words.slice(0, 3).join(' ');
      explanationDetail = point;
    }

    // Build question stems dynamically based on index & concept
    let questionText = '';
    let correctAnswerText = '';
    let distractors: string[] = [];

    const mode = i % 4;

    if (mode === 0) {
      questionText = `According to the syllabus for ${title}, what is the fundamental principle behind "${concept}"?`;
      correctAnswerText = explanationDetail.length > 15 ? explanationDetail : `It governs how ${concept} operates within ${subject}.`;
      distractors = [
        `It requires an external non-conservative force to remain in equilibrium.`,
        `It operates independently of system temperature and boundary conditions.`,
        `It represents an inverted inverse-square relationship with zero entropy change.`
      ];
    } else if (mode === 1) {
      questionText = `In ${subject} (${title}), which statement accurately reflects "${concept}"?`;
      correctAnswerText = explanationDetail;
      distractors = [
        `It causes an immediate drop in potential energy without any work done.`,
        `It only applies in theoretical vacuum states where drag coefficients are zero.`,
        `It contradicts standard conservation laws under high-frequency conditions.`
      ];
    } else if (mode === 2) {
      questionText = `When applying "${concept}" in real-world ${subject} problem solving, what is the primary consideration?`;
      correctAnswerText = `Accounting for the fact that ${explanationDetail.toLowerCase().replace(/^[a-z]/, (c) => c.toLowerCase())}.`;
      distractors = [
        `Assuming negligible resistance and uniform infinite mass.`,
        `Disregarding initial boundary values during phase transition.`,
        `Replacing variable derivatives with static constants.`
      ];
    } else {
      questionText = `Which of the following best summarizes the key mechanism of "${concept}" as outlined in your notes?`;
      correctAnswerText = explanationDetail;
      distractors = [
        `Thermal dissipation without kinetic transfer.`,
        `Linear scaling with unconstrained exponential feedback.`,
        `Static equilibrium under non-uniform orthogonal fields.`
      ];
    }

    // Truncate or clean answers
    const cleanCorrect = correctAnswerText.length > 140
      ? correctAnswerText.substring(0, 137) + '...'
      : correctAnswerText;

    // Shuffle options so correct answer is at a variable index (0 to 3)
    const correctIndex = (i + 1) % 4;
    const allOptions = [...distractors];
    allOptions.splice(correctIndex, 0, cleanCorrect);

    generatedQuestions.push({
      id: startId + i,
      subject: `${subject}: ${title}`,
      question: questionText,
      options: allOptions,
      correctAnswer: correctIndex,
      explanation: `From your syllabus notes: "${point}". The correct understanding directly stems from this principle.`
    });
  }

  return generatedQuestions;
}
