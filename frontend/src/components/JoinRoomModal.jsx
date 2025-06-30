import { Link } from "react-router";
const JoinRoomModal = ({ onClose, onSubmit, value, onChange }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96 space-y-4">
      <h3 className="text-2xl font-semibold text-center">Join Room</h3>
      <input
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        placeholder="Enter Room ID"
      />
      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">
          Cancel
        </button>
        <button onClick={onSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
          <Link to="/typeRoom" >Join</Link> 
        </button>
      </div>
    </div>
  </div>
);


export default JoinRoomModal