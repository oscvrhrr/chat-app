import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import prisma from "../db/prismaClient.js";
import { profile } from "node:console";


export function createUser () : Omit<User, 'id' >{
  return {
    fullname: faker.person.fullName(),
    email: faker.internet.email(),
    password: "faker",
  }
}

export function createProfile(id: number): { userId: number, bio: string, avatar: string } {
 
  return {
    userId: id ,
    bio: faker.lorem.sentence(9),
    avatar: faker.image.avatar()
  }
}

export async function createManyProfiles (count: number) {
  const profiles = [];
  for(let i = 3; i <= count; i++) {
    profiles.push(createProfile(i))
  };

  await prisma.profile.createMany({
    data: profiles
  });

}

export async function createManyUsers (count: number): Promise<void> {
  const users: Omit<User, "id">[] = [];
  for(let i = 0; i <= count; i++) {
    users.push(createUser());
  }

  await prisma.user.createMany({
    data: users,
  })

  console.log(`${count} users created`)

}

export async function seed() {
  try {
    await createManyProfiles(53);
    console.log("Profiles created successfully");
  } catch (error) {
    console.error("Error creating users:", error);
  } finally {
    process.exit();
  }
}
