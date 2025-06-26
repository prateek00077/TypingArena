import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  roomId : {type: mongoose.Schema.Types.ObjectId, ref: 'Race', default: null},
  wpm: Number,
  accuracy: Number,
  charsTyped: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Result', resultSchema);
