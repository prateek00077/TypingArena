export function calculateResults(userInput, text, timer) {
  const timeInMinutes = Math.max(timer, 1) / 60;
  const correctChars = userInput
    .split('')
    .filter((char, idx) => char === text[idx]).length;

  const grossWPM = (userInput.length / 5) / timeInMinutes;
  const accuracy = (correctChars / userInput.length) * 100 || 0;
  const finalScore = Math.round(grossWPM * (accuracy / 100));

  return {
    wpm: Math.round(grossWPM),
    accuracy: Math.round(accuracy),
    finalScore,
  };
}
  