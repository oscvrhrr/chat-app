import express, { Express } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { config } from "dotenv";
import passport from "./auth/passportConfig.js"
import  cors  from "cors";
import baserUrl from "./config/config.js";
import authRouter from "./routes/authRouter.js";
import usersRouter from "./routes/usersRouter.js";
import conversationsRouter from "./routes/conversationsRouter.js";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: baserUrl }})




config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: baserUrl }));



app.use("/auth", authRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), usersRouter);
app.use("/conversations", passport.authenticate("jwt", { session: false}), conversationsRouter)



const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`)

  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(`User registerd: ${userId} to: ${socket.id}`);
  })

  socket.on("private-message", ({message, sender, recipient}) => {
    const recipientSocketId = userSocketMap.get(recipient);
    const senderSocketId = userSocketMap.get(sender);
    if(recipientSocketId) {
      console.log(`Sending message: ${message} to: ${recipientSocketId} sender: ${socket.id}`);
      socket.to(recipientSocketId).emit("private-message", { message, sender });
    }

  })



  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`)
    io.emit("server disconnected", socket.id)
  })

})





httpServer.listen(4001, () => {
  console.log("app running on port 4001")
});