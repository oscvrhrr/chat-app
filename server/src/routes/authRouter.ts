import { Router } from "express";
import { signup, login, getMe } from "../controllers/userController.js";
import passport from "../auth/passportConfig.js";

const authRouter = Router();



authRouter.post("/signup", signup);

authRouter.post("/login", passport.authenticate("local", { session: false }), login);

authRouter.get("/me", passport.authenticate("jwt", { session: false }), getMe);


export default authRouter;