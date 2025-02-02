import prisma from "../prismaClient.js";




export const UserRepository = {

  async createUser(fullname: string, email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password,
      },
    })
    return user;
  },

  async getAllUsers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullname: true,
        password: false
      }
    });
    return users;
  },




};

