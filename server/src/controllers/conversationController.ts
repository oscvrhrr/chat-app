import { Request, Response, NextFunction } from "express"
import ConversationRepository from "../db/queries/conversations.js"


export const createConversation = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { message, recipientId } = req.body;
  const conversation = await ConversationRepository.createConversation("test");
  if(req.user){
    const { id } = req.user
    const messageRespose = await ConversationRepository.createMessage(message, id, conversation.id);
    const participants = await ConversationRepository.createConversationParticipants(conversation.id, id, recipientId )
  }


}


