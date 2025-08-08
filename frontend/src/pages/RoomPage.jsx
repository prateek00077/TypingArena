import React, { useEffect, useState } from 'react';
import RoomModel from '../components/RoomModel';
import { Link, useNavigate } from 'react-router-dom';
import { DurationChange } from '../components/DurationSelect';
import JoinRoomModal from '../components/JoinRoomModal';
import { useRoomContext } from '../context/RoomContext';
import { useAppContext } from '../context/AppContext';
import RankCard from '../components/RankCard';
import { useLocation } from 'react-router-dom';

const RoomPage = ({ setParagraph, duration, setDuration }) => {
  const [showModal, setShowModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [localParagraph, setLocalParagraph] = useState('');
  const [roomIdInput, setRoomIdInput] = useState('');
  const [showRankCard, setShowRankCard] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const { user } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    room,
    loading,
    createRoom,
    joinRoom,
    getRoomDetails,
    setRoom,
    getAllRooms,
    deleteRoom,
  } = useRoomContext();

  const handleCreateRoom = async () => {
    try {
      const response = await createRoom(localParagraph, duration);
      if (response && response.newRoom) {
        setParagraph(localParagraph);
        setShowModal(false);
        setLocalParagraph(''); 
        const updated = await getAllRooms();
        setRooms(updated);
      }
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room');
    }
  };

  const handleJoinRoom = async (roomId = roomIdInput) => {
    try {
      if (!roomId) {
        alert('Room ID is required');
        return;
      }

      const response = await joinRoom(roomId);
      if (response && response.room) {
        setParagraph(response.room.paragraph);
        setJoinModal(false);
        navigate('/typeRoom');
      }
      return response;
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Failed to join room. Room may not exist.');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this room?');
    if (!confirmDelete) return;

    try {
      await deleteRoom(roomId);
      const updatedRooms = await getAllRooms();
      setRooms(updatedRooms);
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Failed to delete room');
    }
  };

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const allRooms = await getAllRooms();
        setRooms(allRooms);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      }
    };

    fetchRooms();
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md space-y-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">
          Room Management
        </h2>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-white dark:bg-gray-700 dark:text-white border-2 border-gray-700 font-medium rounded-lg"
            onClick={() => setJoinModal(true)}
          >
            {'Join Room'}
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg transition font-medium"
            onClick={() => setShowModal(true)}
          >
            {'+ Create Room'}
          </button>
        </div>

        {/* Room List */}
        <section className="space-y-4 overflow-y-auto max-h-64 px-2">
          <h3 className="text-xl font-medium text-gray-800 dark:text-white text-center">Available Rooms</h3>
          {rooms.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">No rooms available.</p>
          ) : (
            rooms.map((room) => {
              const isHost = room.host === user?._id;
              const isFinished = room.status === 'finished';
              const isRunning = room.status === 'running';

              return (
                <div key={room._id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-700 dark:text-white">Room ID: {room._id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Duration: {room.duration} min</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Status: {room.status}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className={`px-4 py-2 rounded transition ${
                        isFinished
                          ? isHost
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                      onClick={async () => {
                        if (isFinished) {
                          if (isHost) {
                            const response = await getRoomDetails(room._id);
                            if (response && response.room) {
                              setSelectedRoomId(room._id);
                              setShowRankCard(true);
                            }
                          } else {
                            alert('You can only join a room if it’s not finished or running.');
                          }
                        } else if (isRunning) {
                          if (isHost) {
                            const response = await getRoomDetails(room._id);
                            if (response && response.room) {
                              setParagraph(response.room.paragraph);
                              setRoom(response.room);
                              navigate('/typeRoom');
                            }
                          } else {
                            alert('You can only join a room if it’s not finished or running.');
                          }
                        } else {
                          handleJoinRoom(room._id);
                        }
                      }}
                      disabled={isFinished && !isHost}
                    >
                      {isFinished ? 'View Result' : 'Join'}
                    </button>

                    <button
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                      onClick={() => handleDeleteRoom(room._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>

      {/* Rank Card */}
      {showRankCard && selectedRoomId && (
        <div className="mt-4 z-50">
          <RankCard roomId={selectedRoomId} onClose={() => setShowRankCard(false)} />
        </div>
      )}

      {/* Room Modal */}
      {showModal && (
        <RoomModel onClose={() => setShowModal(false)} onSubmit={handleCreateRoom}>
          <div className="flex justify-center mt-4">
            <DurationChange duration={duration} setDuration={setDuration} />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Paste Paragraph:</label>
            <textarea
              value={localParagraph}
              onChange={(e) => setLocalParagraph(e.target.value)}
              className="w-full h-40 px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-600 dark:text-white dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter the paragraph users will type in the race..."
            ></textarea>
          </div>
        </RoomModel>
      )}

      {/* Join Modal */}
      {joinModal && (
        <JoinRoomModal
          onClose={() => {
            setJoinModal(false);
            setRoomIdInput('');
          }}
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
          onSubmit={() => handleJoinRoom(roomIdInput)}
        />
      )}
    </div>
  );
};

export default RoomPage;
