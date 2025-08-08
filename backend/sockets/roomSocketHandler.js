import Room from '../models/roomModel.js';

const liveGames = {};

const roomSocketHandler = (io, socket) => {
    const updateLeaderboard = (roomId) => {
        if (!liveGames[roomId]) return;

        const leaderboard = Object.values(liveGames[roomId])
            .sort((a, b) => {
                if (b.wpm !== a.wpm) {
                    return b.wpm - a.wpm;
                }
                return b.accuracy - a.accuracy;
            })
            .map((user, index) => ({
                ...user,
                rank: index + 1,
            }));
        
        io.to(roomId).emit('leaderboardUpdate', leaderboard);
    };

    socket.on('joinRoom', async ({ roomId, userId, username }) => {
        socket.join(roomId);
        socket.roomId = roomId;
        socket.userId = userId;

        if (!liveGames[roomId]) {
            liveGames[roomId] = {};
        }

        liveGames[roomId][userId] = { socketId: socket.id, userId, username, wpm: 0, accuracy: 100 };
        console.log(`🙋‍♂️ ${username} (User: ${userId}) joined room ${roomId}`);
        
        updateLeaderboard(roomId);
    });

    socket.on('updateProgress', ({ wpm, accuracy }) => {
        const { roomId, userId } = socket;

        const validWPM = Number.isFinite(wpm) ? Math.round(wpm) : 0;
        const validAccuracy = Number.isFinite(accuracy) ? Math.round(accuracy) : 0;

        if (!roomId || !liveGames[roomId] || !liveGames[roomId][userId]) {
            return;
        }

        liveGames[roomId][userId].wpm = validWPM;
        liveGames[roomId][userId].accuracy = validAccuracy;
        
        updateLeaderboard(roomId);
    });

    socket.on('startGame', async ({ roomId }) => {
        try {
            const room = await Room.findById(roomId);
            if (!room) return;
            const startTime = Date.now() + 30000;
            
            await Room.findByIdAndUpdate(roomId, { status: 'running' });

            io.to(roomId).emit('gameStart', { startTime });
            console.log(`🚀 Game starting in room ${roomId} in 5 seconds`);
        } catch (error) {
            console.error('Error starting game:', error);
        }
    });
    
    socket.on('endGame', async ({ roomId }) => {
        try {
            const room = await Room.findByIdAndUpdate(roomId, { status: 'finished' }, { new: true });
            if (!room) return;
            
            io.to(roomId).emit('gameEnd');
            console.log(`🏁 Game ended in room ${roomId}.`);

            setTimeout(() => {
                delete liveGames[roomId];
                console.log(`🧹 Cleaned up live game state for room ${roomId}.`);
            }, 30000);

        } catch (err) {
            console.error(`❌ Error ending game for room ${roomId}:`, err);
        }
    });

    socket.on('submitFinalResult', async ({ roomId, userId, username, wpm, accuracy }) => {
        if (!liveGames[roomId] || !liveGames[roomId][userId]) return;
        
        const finalWPM = Number.isFinite(wpm) ? wpm : 0;
        const finalAccuracy = Number.isFinite(accuracy) ? accuracy : 0;

        try {
            const room = await Room.findById(roomId);
            if (!room) return;

            const participantExists = room.participants.some(p => String(p.userId) === String(userId));

            if (participantExists) {
                await Room.updateOne(
                    { _id: roomId, 'participants.userId': userId },
                    { $set: { 'participants.$.wpm': finalWPM, 'participants.$.accuracy': finalAccuracy } }
                );
            } else {
                await Room.updateOne(
                    { _id: roomId },
                    { $push: { participants: { userId, username, wpm: finalWPM, accuracy: finalAccuracy } } }
                );
            }
            console.log(`💾 Final result for ${username} in room ${roomId} saved.`);
        } catch (error) {
            console.error('Error saving final result:', error);
        }
    });

    socket.on('disconnect', () => {
        const { roomId, userId } = socket;
        if (!roomId || !userId || !liveGames[roomId] || !liveGames[roomId][userId]) return;

        const username = liveGames[roomId][userId].username;
        delete liveGames[roomId][userId];

        if (Object.keys(liveGames[roomId]).length === 0) {
            delete liveGames[roomId];
        } else {
            updateLeaderboard(roomId);
        }
        console.log(`👋 ${username} (User: ${userId}) disconnected from room ${roomId}`);
    });
};

export default roomSocketHandler;