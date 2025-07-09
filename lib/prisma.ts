import { PrismaClient } from "@/prisma/generated/client"

declare global {
  var prismaClient: PrismaClient | undefined
}

const prismaClient =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : global.prismaClient || new PrismaClient({
      datasourceUrl: process.env.POSTGRES_PRISMA_URL
    })

if (process.env.NODE_ENV !== 'production') {
  global.prismaClient = prismaClient
}

export default prismaClient
