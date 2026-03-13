import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv"

// const prisma = new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
// })
config()
console.log("DATABASE_URL:", process.env.DATABASE_URL)
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})
const prisma = new PrismaClient({adapter})
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('DB connected via prisma')
    }
    catch (error) {
        console.error(`Database connection error: ${error.message}`)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect();

}

export {prisma, connectDB, disconnectDB}