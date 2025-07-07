import bcrypt from "bcryptjs"

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
};

export async function verifyPassword(input:string, hashed: string){
    return await bcrypt.compare(input, hashed);
};