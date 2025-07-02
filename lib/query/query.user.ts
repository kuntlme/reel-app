import { PrismaClient } from "@/app/generated/prisma";

const prismaClient = new PrismaClient;


// Create a new user
export const createUser = async (data: {
    profilename: string;
    username: string;
    joining_date: Date;
    location: string;
}) =>
    await prismaClient.user.create({ data });


// Read user by ID (with profile, creator & viewer info)
export const getUserById = async (userid: string) =>
    await prismaClient.user.findUnique({
        where: { userid },
        include: { creator: true, viewer: true },
    });


// Read user by username
export const getUserByUsername = async (username: string) =>
    await prismaClient.user.findUnique({ where: { username } });


// Update user
export const updateUser = async (userid: string, data: Partial<{
    profilename: string;
    username: string;
    joining_date: Date;
    location: string;
}>) =>
    await prismaClient.user.update({ where: { userid }, data });


// Delete user
export const deleteUser = async (userid: string) =>
  await prismaClient.user.delete({ where: { userid } });