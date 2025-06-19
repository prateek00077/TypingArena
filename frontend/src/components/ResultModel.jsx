const ResultModal = ({ wpm, accuracy, finalScore, onRestart }) => 
    (
    <div className="fixed inset-0 flex items-center mt-[55px] justify-center bg-black bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-90 z-50">
    <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-2xl px-12 py-10 text-center min-w-[350px] min-h-[260px] max-w-[90vw] max-h-[90vh] flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-300">Congratulations Test Complete!</h2>
    <div className="mb-3 text-2xl font-semibold text-gray-800 dark:text-gray-100">
        WPM: <span className="font-mono text-blue-600 dark:text-blue-400">{wpm}</span>
    </div>
    <div className="mb-3 text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Accuracy: <span className="font-mono text-green-600 dark:text-green-400">{accuracy}%</span>
    </div>
    <div className="mb-8 text-2xl font-semibold text-gray-800 dark:text-gray-100">
        Score: <span className="font-mono text-purple-600 dark:text-purple-400">{finalScore}</span>
    </div>
    <button
        className=" bg-gradient-to-r from-slate-900 to-slate-700   text-white px-8 py-3 rounded-lg  transition font-bold text-lg shadow"
        onClick={onRestart}
    >
        Restart
    </button>
    <button
        className="bg-red-400 dark:bg-red-400  text-white mt-2 px-8 py-3 rounded-lg  transition font-bold text-lg shadow"
        onClick={onRestart}
    >
        Cancel
    </button>
    </div>
</div>
);

export default ResultModal;