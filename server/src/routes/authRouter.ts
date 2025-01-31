import { Router } from "express";
import { signup, login } from "../controllers/userController.js";
import passport from "../auth/passportConfig.js";

const authRouter = Router();



authRouter.post("/signup", signup)

authRouter.post("/login", passport.authenticate("local", { session: false }), login)



export default authRouter;