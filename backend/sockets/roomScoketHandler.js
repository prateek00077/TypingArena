import Room from '../models/roomModel.js';
import Result from '../models/resultModel.js';

// In-memory state for LIVE games only. Cleared after game ends.
// Structure: { roomId: { socketId: { userId, username, wpm, accuracy } } }
const liveGames = {};

const roomSocketHandler = (io, socket) => {
    // Helper function to update and emit leaderboard
    const updateLeaderboard = (roomId) => {
        if (!liveGames[roomId]) return;

        // Sort players by WPM (or another metric)
        const leaderboard = Object.values(liveGames[roomId]).sort((a, b) => b.wpm - a.wpm);
        
        // Emit the complete, sorted leaderboard to the room
        io.to(roomId).emit('leaderboardUpdate', leaderboard);
    };

    // User joins a room
    socket.on('joinRoom', ({ roomId, userId, username }) => {
        socket.join(roomId);
        // Store room and user info on the socket for easy access
        socket.roomId = roomId;
        socket.userId = userId;

        // Initialize room in our live state if it doesn't exist
        if (!liveGames[roomId]) {
            liveGames[roomId] = {};
        }

        // Add user to the live game state
        liveGames[roomId][socket.id] = { userId, username, wpm: 0, accuracy: 0 };
        console.log(`🙋 ${username} (${socket.id}) joined room ${roomId}`);
        
        // Announce the new user and update the leaderboard
        updateLeaderboard(roomId);
    });

    // Player updates their progress during the race
    socket.on('updateProgress', ({ wpm, accuracy }) => {
        const { roomId } = socket;
        
        // Ensure the player and room exist in the live state
        if (!roomId || !liveGames[roomId] || !liveGames[roomId][socket.id]) return;

        // Update the player's state on the server
        liveGames[roomId][socket.id].wpm = wpm;
        liveGames[roomId][socket.id].accuracy = accuracy;
        
        // Recalculate and broadcast the new leaderboard
        updateLeaderboard(roomId);
    });

    // Player finishes the race and submits their final score
    socket.on('submitFinalResult', async (data) => {
        const { roomId } = socket;
        const finalStats = liveGames[roomId]?.[socket.id];

        if (!finalStats) return; // Ignore if user/room not in live state

        try {
            // 1. Save individual result to the 'results' collection
            const result = new Result({
                userId: finalStats.userId,
                roomId,
                wpm: finalStats.wpm,
                accuracy: finalStats.accuracy,
            });
            await result.save();

            // 2. Add participant's final score to the 'rooms' collection
            await Room.findByIdAndUpdate(roomId, {
                $push: {
                    participants: {
                        userId: finalStats.userId,
                        username: finalStats.username,
                        wpm: finalStats.wpm,
                        accuracy: finalStats.accuracy,
                    }
                }
            });

            console.log(`💾 Final result for ${finalStats.username} in room ${roomId} saved.`);
            
            // Optional: When all players finish, you could clear the live state
            // delete liveGames[roomId];

        } catch (error) {
            console.error('Error saving final result:', error);
            // Optionally emit an error to the client
            socket.emit('error', 'Could not save your result.');
        }
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        const { roomId, userId } = socket;
        
        // Check if the user was in a live game
        if (roomId && liveGames[roomId] && liveGames[roomId][socket.id]) {
            const username = liveGames[roomId][socket.id].username;
            
            // Remove user from the live game state
            delete liveGames[roomId][socket.id];
            
            // If the room is now empty, remove it from memory
            if (Object.keys(liveGames[roomId]).length === 0) {
                delete liveGames[roomId];
            } else {
                // If others are still in the room, update the leaderboard
                updateLeaderboard(roomId);
            }
            
            console.log(`🛑 ${username} disconnected from room ${roomId}`);
        } else {
            console.log(`🛑 Socket ${socket.id} disconnected.`);
        }
    });
};

export default roomSocketHandler;