import React, { useEffect, useState } from 'react';
import { generateRandomText } from '../utils/textGenerator';

const TypingBox = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setText(generateRandomText(100));
  }, []);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="flex flex-col items-center min-h-[50vh] justify-center bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="w-full max-w-5xl rounded-xl shadow-lg bg-white/90 p-8 mb-8">
        <div className="font-mono text-xl leading-relaxed tracking-wide min-h-32 text-gray-900 selection:bg-gray-300 selection:text-black break-words whitespace-pre-wrap">
          {text.split('').map((char, idx) => {
            let color = 'text-gray-800';
            if (userInput.length > 0) {
              if (userInput[idx] === undefined) {
                color = 'text-gray-800';
              } else if (userInput[idx] === char) {
                color = 'text-green-600';
              } else {
                color = 'text-red-500';
              }
            }
            return (
              <span
                key={idx}
                className={`transition-colors duration-150 ${color}`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
      <input
        type="text"
        className="w-full max-w-5xl font-mono text-xl rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 shadow"
        value={userInput}
        onChange={handleChange}
        placeholder="Start typing here..."
        autoFocus
        spellCheck={false}
      />
    </div>
  );
};

export default TypingBox;