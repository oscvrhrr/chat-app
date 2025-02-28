import { Request, Response, NextFunction } from "express"
import ConversationRepository from "../db/queries/conversations.js"


export const readConversations = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  if(req.user) {
    const allConversations = await ConversationRepository.getAllConversaions(req.user?.id)
    res.status(200).json({conversations: allConversations})
  }
}


export const createConversation = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { message, recipientId } = req.body;
  if(req.user){
    const { id } = req.user
    let conversation = await ConversationRepository.findConversationByParticipants(req.user?.id, recipientId);
    console.log(conversation)
    if(!conversation) {
      conversation = await ConversationRepository.createConversation("test");
      await ConversationRepository.createConversationParticipants(conversation.id, id, recipientId )
    } 
    const messageRespose = await ConversationRepository.createMessage(message, id, conversation.id);
    res.status(200).json("conversation created")
  }
}

export const getConversationMessages = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  if(req.user) {
    const { id } = req.user;
    const recipientId = Number(req.query.recipientId); // Extract recipientId from query parameters
    console.log(recipientId)
    const conversation = await ConversationRepository.findConversationByParticipants(id, Number(recipientId));

    if(conversation) {
      const messages = await ConversationRepository.getMessages(id, Number(recipientId), conversation.id)
      res.status(200).json({ messages })
    }
  }

}


