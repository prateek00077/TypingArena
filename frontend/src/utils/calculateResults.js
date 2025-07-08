export function calculateResults(userInput, originalText, timeSpentSeconds) {
  // Count correct characters
  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === originalText[i]) correctChars++;
  }

  // Time spent in minutes
  const timeSpentMinutes = timeSpentSeconds / 60;

  // WPM calculation (Monkeytype style: only correct chars)
  const wpm = timeSpentMinutes > 0
    ? (correctChars / 5) / timeSpentMinutes
    : 0;

  // Accuracy calculation
  const accuracy = userInput.length === 0
    ? 0
    : Math.round((correctChars / userInput.length) * 100);

  // Final score (example: wpm * accuracy)
  const finalScore = Math.round(wpm * (accuracy / 100));

  return {
    wpm: Math.max(0, Math.round(wpm)),
    accuracy,
    finalScore
  };
}
  