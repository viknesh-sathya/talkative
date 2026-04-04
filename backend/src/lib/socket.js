import http from "http";
import { Server } from "socket.io";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

// Create a new Socket.IO server instance
// "io" is the convention for naming the socket server
const io = new Server(server, {
  cors: {
    // Allow requests only from your client URL (frontend)
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // Allow cookies/headers to be sent
  },
});

// Apply authentication middleware to ALL socket connections
// This ensures every socket must pass through your JWT check
io.use(socketAuthMiddleware);

// 🚨we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId]; // this will give the socketID
}
// Store online users in memory
// Structure: { userId: [socketId1, socketId2, ...] }
// Using arrays allows multiple tabs/devices per user
const userSocketMap = {};

io.on("connection", (socket) => {
  // Fires when a client successfully connects
  console.log("A User Connected:", socket.user?.fullName);

  const userId = socket.userId;

  if (userId) {
    // Initialize array if user connects for the first time
    if (!userSocketMap[userId]) userSocketMap[userId] = [];

    // Add this socket.id to the user's list
    userSocketMap[userId].push(socket.id);

    // Broadcast updated list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.user?.fullName);

    if (userId && userSocketMap[userId]) {
      // Remove this socket.id from the user's list
      userSocketMap[userId] = userSocketMap[userId].filter(
        (id) => id !== socket.id,
      );

      // If no sockets left for this user, remove them entirely
      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId];
      }

      // Broadcast updated list of online users
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };
