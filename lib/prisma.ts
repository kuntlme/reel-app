import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

const prismaClient = new PrismaClient().$extends(withAccelerate())

const globalForPrisma = global as unknown as { prismaClient: typeof prismaClient }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prismaClient = prismaClient

export default prismaClient