// import { Connection } from "mongoose"

// declare global {
//     var mongoose: {
//         conn: Connection | null
//         promise: Promise<Connection> | null
//     }
// }

// export {}

// types.d.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

export {};