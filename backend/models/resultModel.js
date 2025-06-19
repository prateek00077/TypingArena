import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wpm: Number,
  accuracy: Number,
  charsTyped: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Result', resultSchema);
