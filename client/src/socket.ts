import { io } from "socket.io-client";

const URL = import.meta.env.MODE === "production" ? undefined : 'http://localhost:4001';


export const socket = io(URL, {
  autoConnect: false
});




socket.on("connect_error", (err) => {
  console.error("Connection error:", err);
});

