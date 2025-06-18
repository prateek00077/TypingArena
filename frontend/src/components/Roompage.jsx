import React, { useState } from 'react';
import Modal from './Modal';
import { DurationChange } from './DurationSelect';
const RoomPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [paragraph, setParagraph] = useState('');
    const [duration, setDuration] = useState(1); 
    const [startTime, setStartTime] = useState(null);
    const [showResult, setShowResult] = useState(false); 
    const handleSubmit = () => {
        // Logic for new Race start according to this paragraph
    setShowModal(false);
    };

return (
    <div className="h-screen bg-gray-200 dark:bg-gray-900 flex justify-center items-center">
        <div className="w-1/2  p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-6">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center">
            Room Management
        </h2>

        {/* Create Room Section */}
        <section className="space-y-4">
            <div className="flex justify-center">
            <button
                className="px-6  py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                onClick={() => {setShowModal(true)}}
            > Create Room
            </button>
        </div>
        </section>

    </div>

      {/* Modal */}
    {showModal && (
        <Modal
            title="Create Room"
            onClose={() => { setShowModal(false) }}
        onSubmit={handleSubmit}
        >
        <div className="flex justify-center mt-4">
            <DurationChange 
            duration={duration}
            setDuration={setDuration}
            startTime={startTime}
            showResult={showResult}
            setShowResult = {setShowResult}
            setStartTime = {setStartTime}
    />
</div>
        <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Paste Paragraph:
            </label>
            <textarea
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                className="w-full h-60 px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
            ></textarea>
        </div>
        </Modal>
    )}
    </div>
);
};

export default RoomPage;