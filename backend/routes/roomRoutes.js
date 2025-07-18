import express from 'express';
import { createRoom, deleteRoom, finishRoom, getAllRooms, getRoomDetails, joinRoom, leaveRoom, startRoom } from '../controllers/roomController.js';
import { protect } from '../middlewares/authMiddleware.js';

const roomRouter = express.Router();

roomRouter.use(protect);
roomRouter.post('/create',createRoom);
roomRouter.post('/join',joinRoom);
roomRouter.post('/start',startRoom);
roomRouter.post('/finish',finishRoom);
roomRouter.delete('/leave',leaveRoom);
roomRouter.post('/getdetails',getRoomDetails);
roomRouter.get('/getallrooms',getAllRooms);
roomRouter.delete('/delete/:roomId',deleteRoom);

export default roomRouter;