import React, { useEffect, useState } from 'react';
import { generateRandomText } from '../utils/textGenerator';

const TypingBox = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    setText(generateRandomText(100));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[40vh] bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="w-full max-w-4xl rounded-xl shadow-lg bg-white/90 p-8">
        <div className="font-mono text-xl leading-relaxed tracking-wide min-h-32 text-gray-900 selection:bg-gray-300 selection:text-black break-words whitespace-pre-wrap">
          {text && text.split("").map((char, index) => (
            <span
              key={index}
              className="transition-colors duration-150 text-gray-800 hover:text-black"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingBox;