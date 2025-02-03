import { Router } from "express";
import { getUsers, getProfiles, getProfileByID } from "../controllers/userController.js";


const usersRouter = Router();


usersRouter.get("/", getUsers);

usersRouter.get("/profiles", getProfiles);

usersRouter.get("/:userid/profile", getProfileByID)







export default usersRouter;