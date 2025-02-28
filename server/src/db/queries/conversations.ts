import { send } from "node:process";
import prisma from "../prismaClient.js";
import { tr } from "@faker-js/faker";

const ConversationRepository = {


  async getAllConversaions (userId: number) {
    const allConversations = await prisma.conversations.findMany({
      where: {
        conversationparticipants: {
          some: {
            userId
          }
        },
      },
      include: {
        conversationparticipants: true,
      }
    })
    return allConversations
  },

  async findConversationByParticipants (sender: number, recipient: number) {
    const conversation = await prisma.conversations.findFirst({
      where: {
        conversationparticipants: {
          every: {
            userId: {
              in: [sender, recipient]
            }
          }
        }
      }
    })
    return conversation
  },

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

  async getMessages (sender: number, recipient: number, conversationId: number) {
    const messages = await prisma.messages.findMany({
      where: {
       conversationId,
       OR: [
        { userId: sender },
        { userId: recipient }
       ],
      },
    });
    return messages
  }


}





export default ConversationRepository