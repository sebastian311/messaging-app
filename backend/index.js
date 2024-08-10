const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const sequelize = require("./config/database");
const User = require("./models/User");
const { ChatRoom, Message } = require("./models/ChatRoom");
const authRoutes = require("./routes/auth");
const chatRoomRoutes = require("./routes/chatroom");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.sync();
        console.log("Database synced");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);  // Exit with error code 1 due to database connection failure
    }
});

app.use("/api/auth", authRoutes);
app.use("/api/chatrooms", chatRoomRoutes);

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", async ({ roomName, username }) => {
      console.log("Entered server side's `joinRoom` event with: ", roomName, ", ", username);
        try {
            if (!roomName || !username) {
                socket.emit("error", "Room name and username are required.");
                return;
            }

            socket.join(roomName);
            let room = await ChatRoom.findOne({ where: { name: roomName } });

            if (!room) {
                room = await ChatRoom.create({ name: roomName });
            }

            io.to(roomName).emit("message", {
                user: "admin",
                text: `${username} has joined the room.`,
            });

            console.log(`${username} joined room: ${roomName}`);
        } catch (error) {
            console.error("Error joining room:", error);
            socket.emit("error", "Error joining room.");
        }
    });

    socket.on("sendMessage", async ({ roomName, user, text }) => {
        try {
            const room = await ChatRoom.findOne({ where: { name: roomName } });

            if (room) {
                const message = await Message.create({
                    user,
                    text,
                    ChatRoomId: room.id
                });
                io.to(roomName).emit("message", message);
                console.log("Message sent:", message);
            } else {
                socket.emit("error", "Room not found.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            socket.emit("error", "Error sending message.");
        }
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

process.once("SIGINT", () => {
    console.log("SIGINT signal received: closing HTTP server");
    server.close(async () => {
        console.log("HTTP server closed");
        try {
            await sequelize.close();  // Make sure to close your database connection
            console.log("Database connection closed");
            process.exit(0);  // Exit cleanly with status code 0
        } catch (error) {
            console.error("Failed to close all resources:", error);
            process.exit(1);  // Exit with error code 1 due to failing to close resources properly
        }
    });
});
