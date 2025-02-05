import { send } from "node:process";
import prisma from "../prismaClient.js";

const ConversationRepository = {

  async createConversation (name: string) {
    const conversation = await prisma.conversations.create({
      data: {
        name
      }
    });
    return conversation
  },

  async createConversationParticipants (conversationId: number, sender: number, recipient: number) {
    const participants = await prisma.conversationParticipants.createMany({
      data: [
        { conversationId, userId: sender },
        { conversationId, userId: recipient },
      ],
      skipDuplicates: true,
    });
    return participants
  },

  async createMessage (message: string, userId: number, conversationId: number) {
    const messageRespose = await prisma.messages.create({
      data: {
        message,
        userId,
        conversationId
      }
    })
    return messageRespose
  },



}





export default ConversationRepository