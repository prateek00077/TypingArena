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
import roomSocketHandler from './sockets/roomScoketHandler.js';

dotenv.config();
connectDB(); 

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin:  "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

io.on('connection', (socket) => {
  roomSocketHandler(io, socket); // handle socket logic
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/result', resultRouter);
app.use('/api/room', roomRouter);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
