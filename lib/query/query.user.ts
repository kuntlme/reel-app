import { CreateUserInput, updateUserInput } from "../type";
import { hashPassword } from "../hash";
import { prismaClient } from "../prisma";


// Create a new user
export const createUser = async (data: CreateUserInput) => {

    const hashedPassword = await hashPassword(data.password);

    const user = await prismaClient.user.create({
        data: {
            ...data,
            password: hashedPassword
        }

    });
    return user;
}


// Read user by ID (with profile, creator & viewer info)
export const getUserById = async (userid: string) =>
    await prismaClient.user.findUnique({
        where: { userid },
        include: { creator: true, viewer: true, videos: { include : {uploader : true}} },
    });

// Read user by username
export const getUserByEmail = async (email: string) =>
    await prismaClient.user.findUnique({ where: { email } });


// Read user by username
export const getUserByUsername = async (username: string) =>
    await prismaClient.user.findUnique({ where: { username } });


// Update user
export const updateUser = async (userid: string, data: updateUserInput) =>
    await prismaClient.user.update({ where: { userid }, data });


// Delete user
export const deleteUser = async (userid: string) =>
    await prismaClient.user.delete({ where: { userid } });

// get user list
export const getUserList = async () =>
    await prismaClient.user.findMany();