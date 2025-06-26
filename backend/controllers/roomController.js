/*
1. Create a new room
2. Join a room
3. start a room if host
4. Finish a room if host
5. Leave a room
6. Get the room details
 */
import Room from '../models/roomModel.js';

// Create a new room
export const createRoom = async (req, res) => {
    const userId = req.user?._id;
    const { paragraph, duration } = req.body;

    if (!userId) return res.status(401).json({ message: "Please login first" });
    if (!paragraph) return res.status(400).json({ message: "TextArea cannot be empty" });

    const newRoom = await Room.create({
        host: userId,
        participants: [],
        paragraph,
        duration: duration || 1, // default to 1 minute if not provided
        status: "pending"
    });

    if (!newRoom) return res.status(500).json({ message: "Error while creating new room" });

    return res.status(200).json({
        newRoom,
        message: "Room created successfully"
    });
};

// join a room
export const joinRoom = async (req, res) => {
    const user = req.user;
    const roomId = req.body.roomId;

    if (!user) return res.status(401).json({ message: "Please login to join the room" });
    if (!roomId) return res.status(400).json({ message: "Invalid room credentials" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room does not exist" });

    // Only allow join if status is pending or running
    if (room.status !== "pending" && room.status !== "running") {
        return res.status(400).json({ message: "This room is already finished" });
    }

    // Prevent duplicate join
    if (room.participants.some(p => String(p.userId) === String(user._id))) {
        return res.status(400).json({ message: "User already joined the room" });
    }

    room.participants.push({
        userId: user._id,
        rank: 0,
        username: user.username,
        wpm: 0,
        accuracy: 0
    });

    await room.save();
    return res.status(200).json({ message: "Room joined successfully", room });
};

// Start a room (host only)
export const startRoom = async (req, res) => {
    const userId = req.user?._id;
    const roomId = req.body.roomId;

    if (!userId) return res.status(401).json({ message: "User not found, please login" });
    if (!roomId) return res.status(400).json({ message: "Invalid room" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room does not exist" });

    if (String(room.host) !== String(userId)) {
        return res.status(403).json({ message: "Only the host can start the room" });
    }

    if (room.status === "running") {
        return res.status(400).json({ message: "Room already started" });
    }

    room.status = "running";
    room.startedAt = new Date();
    await room.save();

    return res.status(200).json({ message: "Room started successfully", room });
};

// Finish a room (host or time over)
export const finishRoom = async (req, res) => {
    const userId = req.user?._id;
    const roomId = req.body.roomId;

    if (!userId) return res.status(401).json({ message: "User not found, please login" });
    if (!roomId) return res.status(400).json({ message: "Invalid room" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room does not exist" });

    const isHost = String(room.host) === String(userId);
    const now = new Date();
    let timeOver = false;

    if (room.startedAt && room.duration) {
        const endTime = new Date(room.startedAt.getTime() + room.duration * 60000);
        timeOver = now >= endTime;
    }

    if (!isHost && !timeOver) {
        return res.status(403).json({ message: "Only the host can finish the room before time is over" });
    }

    if (room.status === "finished") {
        return res.status(400).json({ message: "Room already finished" });
    }

    room.status = "finished";
    room.finishedAt = now;
    await room.save();

    return res.status(200).json({ message: "Room finished successfully", room });
};

// Leave a room
export const leaveRoom = async (req, res) => {
    const userId = req.user?._id;
    const roomId = req.body.roomId;

    if (!userId) return res.status(401).json({ message: "User not found, please login" });
    if (!roomId) return res.status(400).json({ message: "Invalid room" });

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room does not exist" });

    // Remove participant
    room.participants = room.participants.filter(
        p => String(p.userId) !== String(userId)
    );

    await room.save();
    return res.status(200).json({ message: "Left the room successfully", room });
};

// get the room deatails
export const getRoomDetails = async (req,res) => {
    const roomId = req.body.roomId;

    if(!roomId) return res.status(400).json({message : "Invalid roomId"});

    const room = await Room.findById(roomId);

    if(!room) return res.status(404).json({message : "Room does not exist"});

    return res.status(200).json({
        room,
        message : "Room details fetched successfully"
    })
}