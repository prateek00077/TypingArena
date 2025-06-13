import React from 'react';

export function DurationChange({ duration, setDuration, startTime, showResult }) {
return (
    <div className="flex items-center gap-2 mt-2">
    <label className="font-mono text-lg">Duration:</label>
    <select
        className="font-mono px-2 py-1 rounded border"
        value={duration}
        onChange={e => setDuration(Number(e.target.value))}
        disabled={startTime !== null && !showResult}
    >
        <option value={0.5}>30 sec</option>
        <option value={1}>1 min</option>
        <option value={2}>2 min</option>
        <option value={3}>3 min</option>
        <option value={4}>4 min</option>
        <option value={5}>5 min</option>
        <option value={10}>10 min</option>
    </select>
    </div>
);
}
