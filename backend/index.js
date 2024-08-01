const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');
const sequelize = require('./config/database');
const User = require('./models/User');
const { ChatRoom, Message } = require('./models/ChatRoom');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.sync({ force: true }); // Reset database for testing; remove `force` in production
    console.log('Database synced');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
});

// Routes
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a chat room
  socket.on('joinRoom', async ({ roomName, username }) => {
    socket.join(roomName);
    let room = await ChatRoom.findOne({ where: { name: roomName } });
    if (!room) {
      room = await ChatRoom.create({ name: roomName });
    }
    io.to(roomName).emit('message', { user: 'admin', text: `${username} has joined the room.` });
  });

  // Listen for messages
  socket.on('sendMessage', async ({ roomName, user, text }) => {
    const room = await ChatRoom.findOne({ where: { name: roomName } });
    if (room) {
      const message = await Message.create({ user, text, ChatRoomId: room.id });
      io.to(roomName).emit('message', message);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
