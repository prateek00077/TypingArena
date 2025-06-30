import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rank: Number,
      username: String,
      wpm: Number,
      accuracy: Number,
    },
  ],
  paragraph: {type : String, required : true},
  duration : Number,
  status : {type : String, default : "pending"}, // can have pending, running and finished
  startedAt : Date,
  finishedAt : Date,
},{timestamps : true});

export default mongoose.model('Room', roomSchema);
