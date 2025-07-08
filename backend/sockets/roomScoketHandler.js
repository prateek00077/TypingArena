import Room from '../models/roomModel.js';
import Result from '../models/resultModel.js';

const roomSocketHandler = (io, socket) => {

  // Join a room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Live score updates from users
  socket.on('updateScore', (data) => {
    const { roomId, userId, username, wpm, accuracy } = data;

    if (!roomId || !userId) return;

    // Optional default values
    const safeUsername = username || "Unknown";
    const safeWpm = wpm || 0;
    const safeAccuracy = accuracy || 0;

    io.to(roomId).emit('leaderboardUpdate', {
        userId,
        username: safeUsername,
        wpm: safeWpm,
        accuracy: safeAccuracy
    });
});


  // End of race: update DB
  socket.on('submitFinalResult', async (data) => {
    const { roomId, userId, username, wpm, accuracy, charsTyped, rank } = data;

    // Update Room
    await Room.findByIdAndUpdate(roomId, {
      $push: {
        participants: {
          userId,
          username,
          wpm,
          accuracy,
          rank
        }
      }
    });

    // Save individual Result
    const result = new Result({
      userId,
      roomId,
      wpm,
      accuracy,
      charsTyped
    });
    await result.save();

    // Optionally emit final leaderboard
    const room = await Room.findById(roomId);
    io.to(roomId).emit('finalLeaderboard', room.participants);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
  });
};

export default roomSocketHandler;