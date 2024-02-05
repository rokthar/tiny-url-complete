import {PrismaClient} from "@prisma/client";

const prismaClientSinglton = () => {
    return new PrismaClient();
}

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma ?? prismaClientSinglton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;