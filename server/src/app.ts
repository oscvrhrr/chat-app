import express, { Express } from "express";
import { config } from "dotenv";
import  cors  from "cors";
import passport from "passport";
import prisma from "./db/prismaClient.js";
import authRouter from "./routes/authRouter.js";
import baserUrl from "./config/config.js";

const app: Express = express()




config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: baserUrl }));



app.use("/auth", authRouter);


// app.post("/auth", passport.authenticate("local", { session: false }), (req, res) => {
//   // const token = sign({})
//   console.log("this is the login route")
// });









app.listen(4001, () => {
  console.log("app running on port 4001")
});