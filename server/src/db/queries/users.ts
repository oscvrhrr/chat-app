import prisma from "../prismaClient.js";




export const UserRepository = {

  // async function getUserById(id:number) {

    
  // },

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




};

