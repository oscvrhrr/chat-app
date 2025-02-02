import express, { Express } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { config } from "dotenv";
import  cors  from "cors";
import authRouter from "./routes/authRouter.js";
import baserUrl from "./config/config.js";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: baserUrl }})




config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: baserUrl }));



app.use("/auth", authRouter);



io.on("connection", (socket) => {
  console.log("server recieved connection", socket.id)

  socket.on("disconnect", () => {
    console.log("server disconnected")
    io.emit("server disconnected", socket.id)
  })

})





httpServer.listen(4001, () => {
  console.log("app running on port 4001")
});