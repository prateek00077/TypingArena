
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import resultRouter from './routes/resultRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import roomSocketHandler from './sockets/roomSocketHandler.js';

dotenv.config();
connectDB(); 

const app = express();
const server = http.createServer(app);
const FRONTEND_URL = process.env.FRONTEND_URL;
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

io.on('connection', (socket) => {
  console.log(`New socket connection: ${socket.id}`);
  roomSocketHandler(io, socket);
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/result', resultRouter);
app.use('/api/room', roomRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

