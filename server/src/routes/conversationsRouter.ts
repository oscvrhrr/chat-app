import { Router } from "express";
import { createConversation, getConversationMessages, readConversations } from "../controllers/conversationController.js";

const conversationsRouter = Router();

conversationsRouter.get("/", readConversations)

conversationsRouter.post("/", createConversation);

conversationsRouter.get("/messages", getConversationMessages)





export default conversationsRouter;