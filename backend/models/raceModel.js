import mongoose from 'mongoose';

const raceSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      username: String,
      wpm: Number,
      accuracy: Number,
    },
  ],
  paragraph: String,
  isActive: { type: Boolean, default: true },
  startedAt: Date,
});

export default mongoose.model('Race', raceSchema);
