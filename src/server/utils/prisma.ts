import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

export const prisma = global.prisma || new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
// database: t3-first-app-roundest-pokemon
// username: e9f7iwmkkzug7z1xmght
// host: us-west.connect.psdb.cloud
// password: pscale_pw_5V9cGveQ6sSOogAKjqJ2fu90Y1zDTC4UdcdWSOYG2iL
