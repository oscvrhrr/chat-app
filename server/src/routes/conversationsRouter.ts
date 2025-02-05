import { Router } from "express";
import { createConversation, getConversationMessages } from "../controllers/conversationController.js";

const conversationsRouter = Router();

conversationsRouter.post("/", createConversation);

conversationsRouter.get("/messages", getConversationMessages)





export default conversationsRouter;