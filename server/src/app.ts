import express, { Express } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { config } from "dotenv";
import passport from "./auth/passportConfig.js"
import  cors  from "cors";
import baserUrl from "./config/config.js";
import authRouter from "./routes/authRouter.js";
import usersRouter from "./routes/usersRouter.js";
import conversationRouter from "./routes/conversationRouter.js";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: baserUrl }})




config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: baserUrl }));



app.use("/auth", authRouter);
app.use("/users", passport.authenticate("jwt", { session: false }), usersRouter);
app.use("/conversations", passport.authenticate("jwt", { session: false}), conversationRouter)





io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message);
  })

  socket.on("disconnect", () => {
    console.log("server disconnected")
    io.emit("server disconnected", socket.id)
  })

})





httpServer.listen(4001, () => {
  console.log("app running on port 4001")
});