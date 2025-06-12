const time = 1;
const totalCharacters = 100;
const correctCharacters = 50;
const typedCharacters = 60;

const accuracy = correctCharacters / typedCharacters * 100;
const wpm = (totalCharacters / 5) / time;
const finalScore = wpm * accuracy;

const typingSpeedCalculator = ()=>{
    return finalScore;
}