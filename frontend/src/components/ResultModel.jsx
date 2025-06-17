
const ResultModal = ({ wpm, accuracy, finalScore, onRestart }) => 
    (
    <div className="fixed inset-0 flex items-center mt-11 justify-center bg-black bg-opacity-80 z-50">
    <div className="bg-white rounded-2xl shadow-2xl px-12 py-10 text-center min-w-[350px] min-h-[260px] max-w-[90vw] max-h-[90vh] flex flex-col justify-center">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-700">Congratulations Test Complete!</h2>
    <div className="mb-3 text-2xl font-semibold text-gray-800">
        WPM: <span className="font-mono text-blue-600">{wpm}</span>
    </div>
    <div className="mb-3 text-2xl font-semibold text-gray-800">
        Accuracy: <span className="font-mono text-green-600">{accuracy}%</span>
    </div>
    <div className="mb-8 text-2xl font-semibold text-gray-800">
        Score: <span className="font-mono text-purple-600">{finalScore}</span>
    </div>
    <button
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow"
        onClick={onRestart}
    >
        Restart
    </button>
    <button
        className="bg-gray-500 text-white mt-2 px-8 py-3 rounded-lg hover:bg-blue-700 transition font-bold text-lg shadow"
        onClick={onRestart}
    >
        Cancel
    </button>
    </div>
</div>
);

export default ResultModal;