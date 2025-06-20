// import React from 'react';

// const RoomModel = ({ children, onClose, onSubmit }) => {
// return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="w-1/2 h-2/3 bg-white rounded-lg shadow-lg p-6 space-y-4">
//         <h3 className="text-4xl font-semibold text-gray-900 text-center">
//             Create Room
//         </h3>
//         <div>{children}</div>
        
//         <div className="flex justify-end space-x-4">
//             <button
//             className="px-6 py-2 bg-red-500 text-white rounded-lg  transition font-medium"
//             onClick={onClose}
//         >
//             Cancel
//         </button>
//         <button
//             className="px-6 py-2  text-white rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 transition font-medium"
//             onClick={onSubmit}
//         >
//             Create Room
//         </button>
//         </div>
//     </div>
//     </div>
// );
// };

// export default RoomModel;



import React from 'react';

const RoomModel = ({ children, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 h-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h3 className="text-3xl font-semibold text-gray-900 text-center">Create Room</h3>
        <div>{children}</div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg transition font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 text-white rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 transition font-medium"
            onClick={onSubmit}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomModel;
