import React from 'react';

const TypingArea = ({ paragraph, userInput, onInputChange, disabled }) => (
<div className="w-full rounded-xl shadow-lg bg-white dark:bg-gray-800 p-8 mb-8">
    <div className="font-mono text-xl leading-relaxed tracking-wide min-h-32 max-h-80 overflow-y-auto text-gray-900 dark:text-gray-100 selection:bg-gray-300 dark:selection:bg-gray-600 break-words whitespace-pre-wrap">
        {paragraph.split('').map((char, idx) => {
        const typedChar = userInput[idx];
        let color = 'text-gray-800 dark:text-gray-100';
        if (typedChar !== undefined) {
            color = typedChar === char ? 'text-green-600' : 'text-red-500';
        }
        return (
            <span key={idx} className={`transition-colors duration-150 ${color}`}>
            {char}
            </span>
        );
    })}
    </div>
    <input
        type="text"
        className="w-full mt-4 font-mono text-xl rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-300 shadow"
        value={userInput}
        onChange={onInputChange}
        placeholder="Start typing here..."
        autoFocus
        spellCheck={false}
        disabled={disabled}
    />
    </div>
);

export default TypingArea;
