import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Đang thử kết nối database...')
    await prisma.$connect()
    console.log('✅ Kết nối DATABASE thành công!')
    
    // Thử query nhẹ 1 cái xem db có table nào không hoặc đơn giản là check connection
    const result = await prisma.$queryRaw`SELECT 1`
    console.log('✅ Query test thành công:', result)
  } catch (err) {
    console.error('❌ Kết nối DATABASE thất bại!')
    console.error('Lỗi:', err.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
