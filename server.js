const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const { normalizePlayerState } = require("./server-state");

function createRoomStateStore() {
  const rooms = new Map();

  return {
    update(room, state) {
      const previous = rooms.get(room);
      const version = (previous?.version || 0) + 1;
      const entry = { version, state: { ...state } };
      rooms.set(room, entry);
      return entry;
    },

    get(room) {
      return rooms.get(room) || null;
    }
  };
}

function createServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);
  const roomStates = createRoomStateStore();

  app.use(express.static(path.join(__dirname)));

  io.on("connection", socket => {
    console.log("User connected:", socket.id);

    socket.on("join-room", rawRoom => {
      if (typeof rawRoom !== "string") return;

      const room = rawRoom.trim().toUpperCase();
      if (!room) return;

      if (socket.data.room && socket.data.room !== room) {
        socket.leave(socket.data.room);
      }

      socket.join(room);
      socket.data.room = room;
      console.log(`${socket.id} joined ${room}`);

      const savedState = roomStates.get(room);
      if (savedState) {
        socket.emit("player-state", {
          room,
          version: savedState.version,
          sourceId: "server",
          ...savedState.state
        });
      }
    });

    socket.on("player-state", data => {
      if (!data || typeof data.room !== "string") return;

      const room = data.room.trim().toUpperCase();
      if (!room || socket.data.room !== room) return;

      const normalizedState = normalizePlayerState(data);
      if (!normalizedState) return;

      const saved = roomStates.update(room, normalizedState);

      const stateToSend = {
        room,
        version: saved.version,
        sourceId: socket.id,
        ...saved.state
      };

      console.log("PLAYER STATE:", stateToSend);
      io.to(room).emit("player-state", stateToSend);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return server;
}

module.exports = { createServer, createRoomStateStore };

if (require.main === module) {
  const server = createServer();
  const PORT = process.env.PORT || 3000;

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Nova Music running at http://localhost:${PORT}`);
  });
}
