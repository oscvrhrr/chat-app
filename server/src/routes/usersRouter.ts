import { Router } from "express";
import { getUsers } from "../controllers/userController.js";


const usersRouter = Router();


usersRouter.get("/", getUsers);







export default usersRouter;