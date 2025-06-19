import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: String,
  password: String, // hashed
  joinedAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);