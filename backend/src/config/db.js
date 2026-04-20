// ===================================================
// config/db.js - Prisma Client (thay thế Mongoose)
// ===================================================
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
