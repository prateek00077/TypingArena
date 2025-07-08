import React, { useState } from 'react';
import RoomModel from './RoomModel';
import { Link } from 'react-router';
import { DurationChange } from './DurationSelect';
import JoinRoomModal from './JoinRoomModal';

const RoomPage = ({setParagraph ,duration,setDuration}) => {
  const [showModal, setShowModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [localParagraph, setLocalParagraph] = useState(''); 
  const [startTime, setStartTime] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [roomIdInput, setRoomIdInput] = useState(null);

  const [rooms, setRooms] = useState([
    { id: '1234', duration: 2, status: 'Upcoming', startTime: '12:30 PM' },
    { id: '5678', duration: 5, status: 'Ongoing', startTime: 'Now' }
    ]);

    const handleSubmit = () => {
    const newRoom = {
        id: Math.floor(1000 + Math.random() * 9000).toString(),
        duration,
        status: 'Upcoming',
        startTime: 'Scheduled',
    };

    setRooms([...rooms, newRoom]);
    setParagraph(localParagraph);
    setShowModal(false);
    };

    return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
        <div className="w-full max-w-3xl bg-white p-4 rounded-xl shadow-md space-y-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Room Management
        </h2>

        {/* Create Room Section */}
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-white  border-2 border-gray-700  font-medium rounded-lg"
            onClick={() => setJoinModal(true)}
          >
            Join Room
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg transition font-medium"
            onClick={() => setShowModal(true)}
        >
            + Create Room
        </button>
        </div>

        {/* Room List */}
        <section className="space-y-4 overflow-y-auto max-h-64 px-2">
          <h3 className="text-xl font-medium text-gray-800 text-center">Available Rooms</h3>
          {rooms.length === 0 ? (
            <p className="text-center text-gray-500">No rooms available.</p>
        ) : (
            rooms.map((room, idx) => (
            <div
                key={idx}
                className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
            >
                <div>
                <p className="text-lg font-semibold text-gray-700">Room ID: #{room.id}</p>
                <p className="text-sm text-gray-600">Duration: {room.duration} min</p>
                <p className="text-sm text-gray-600">Status: {room.status}</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    <Link to="/typeRoom" >Join</Link> 
                </button>
            </div>
            ))
        )}
        </section>
    </div>

      {/* Room Modal */}
    {showModal && (
        <RoomModel
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
        >
        <div className="flex justify-center mt-4">
            <DurationChange
                duration={duration}
                setDuration={setDuration}
                startTime={startTime}
                showResult={showResult}
                setShowResult={setShowResult}
                setStartTime={setStartTime}
            />
        </div>

        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-800">
                Paste Paragraph:
            </label>
            <textarea
                value={localParagraph}
                onChange={(e) => setLocalParagraph(e.target.value)}
                className="w-full h-40 px-4 py-2 rounded-lg border bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Enter the paragraph users will type in the race..."
            ></textarea>
        </div>
        </RoomModel>
      )}

      {/* Join Modal hai ye  */}
      {joinModal && (
        <JoinRoomModal
          onClose={() => {
            setJoinModal(false);
            setRoomIdInput('');
          }}
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
          onSubmit={() => {
            const found = rooms.find((room) => room.id === roomIdInput); // yha jo rooms.find hai ye backend se ayega 
            if (found) {
              alert(`Joining Room ID: ${found.id}`);
              // Navigate to room or load room content here
              setJoinModal(false); // page nhi dikhga fir join wala
            } else {
              alert('Room ID not found!');
            }
          }}
        />
      )}


    </div>
);
};

export default RoomPage;
