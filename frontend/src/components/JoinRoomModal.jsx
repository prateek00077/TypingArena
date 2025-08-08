const JoinRoomModal = ({ onClose, onSubmit, value, onChange }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 space-y-4">
      <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Join Room</h3>
      <input
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        placeholder="Enter Room ID"
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Join
        </button>
      </div>
    </div>
  </div>
);

export default JoinRoomModal;
