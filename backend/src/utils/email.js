/* ===================================================
 * utils/email.js - Gửi email qua Nodemailer
 * =================================================== */
import nodemailer from 'nodemailer'

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: false, // true với port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Gửi email thông báo có khách hàng đăng ký tư vấn
export const sendContactNotification = async ({ name, email, phone, message }) => {
  if (!process.env.EMAIL_USER) {
    console.log('⚠️  Email chưa cấu hình, bỏ qua gửi email.')
    return
  }

  const transporter = createTransporter()

  // Email gửi cho admin
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `[ERP] Yêu cầu tư vấn mới từ ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #03989e, #034f58); padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">🏠 Yêu cầu tư vấn mới</h2>
          <p style="color: #b2e0e2; margin: 4px 0 0;">Ero Riverside</p>
        </div>
        <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Họ tên:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #111827;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email:</td>
                <td style="padding: 8px 0; color: #111827;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Điện thoại:</td>
                <td style="padding: 8px 0; color: #111827;">${phone}</td></tr>
            ${message ? `<tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Nội dung:</td>
                <td style="padding: 8px 0; color: #111827;">${message}</td></tr>` : ''}
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
            Gửi lúc: ${new Date().toLocaleString('vi-VN')}
          </p>
        </div>
      </div>
    `,
  })

  // Email xác nhận gửi cho khách
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Cảm ơn bạn đã liên hệ - Ero Riverside',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #03989e, #034f58); padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">Cảm ơn ${name}!</h2>
        </div>
        <div style="padding: 24px; background: white; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
          <p>Chúng tôi đã nhận được yêu cầu tư vấn của bạn.</p>
          <p>Đội ngũ chuyên viên sẽ liên hệ với bạn trong <strong>vòng 24 giờ</strong>.</p>
          <p style="margin-top: 20px;">Trân trọng,<br/><strong>Ero Riverside</strong><br/>
          Hotline: 0932 888 008</p>
        </div>
      </div>
    `,
  })
}

// Email chào mừng sau khi đăng ký
export const sendWelcomeEmail = async ({ name, email }) => {
  if (!process.env.EMAIL_USER) return

  const transporter = createTransporter()
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Chào mừng bạn đến với Ero Riverside',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #03989e, #034f58); padding: 24px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0;">Chào mừng ${name}! 🎉</h2>
        </div>
        <div style="padding: 24px; background: white; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
          <p>Tài khoản của bạn đã được tạo thành công.</p>
          <p>Bạn có thể đăng nhập để đặt lịch tư vấn và theo dõi thông tin dự án.</p>
          <p style="margin-top: 20px;">Trân trọng,<br/><strong>Ero Riverside</strong></p>
        </div>
      </div>
    `,
  })
}
