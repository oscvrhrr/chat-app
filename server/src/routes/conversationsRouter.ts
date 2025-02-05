import { Router } from "express";
import { createConversation } from "../controllers/conversationController.js";

const conversationsRouter = Router();

conversationsRouter.post("/", createConversation)





export default conversationsRouter;