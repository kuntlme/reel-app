import { PrismaClient } from "@prisma/client"

declare global {
  var prismaClient: PrismaClient | undefined
}

const prismaClient =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : global.prismaClient || new PrismaClient({
      datasourceUrl: process.env.POSTGRES_URL
    })

if (process.env.NODE_ENV !== 'production') {
  global.prismaClient = prismaClient
}

export default prismaClient
