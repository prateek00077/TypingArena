import express from 'express';
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', protect, getUserProfile);
userRouter.post('/logout', protect, logoutUser);

export default userRouter;
