// ===================================================
// controllers/contact.controller.js
// ===================================================
import { validationResult } from 'express-validator'
import prisma from '../config/db.js'
import { sendContactNotification } from '../utils/email.js'

// POST /api/contact
export const submitContact = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg })
    }

    const { name, email, phone, message } = req.body

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        message: message || '',
        userId: req.user?.id || null,
      },
    })

    sendContactNotification({ name, email, phone, message }).catch(console.error)

    res.status(201).json({
      success: true,
      message: 'Cảm ơn bạn! Chúng tôi sẽ liên hệ trong thời gian sớm nhất.',
      data: { id: contact.id },
    })
  } catch (err) {
    console.error('Contact submit error:', err)
    res.status(500).json({ success: false, message: 'Lỗi server.' })
  }
}

// GET /api/contact  (admin only)
export const getAllContacts = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)   || 1
    const limit  = parseInt(req.query.limit)  || 20
    const skip   = (page - 1) * limit
    const status = req.query.status

    const where = status ? { status } : {}

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } } },
      }),
      prisma.contact.count({ where }),
    ])

    res.json({
      success: true,
      data: contacts,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi server.' })
  }
}

// PATCH /api/contact/:id/status  (admin only)
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body
    if (!['new', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Trạng thái không hợp lệ.' })
    }

    const contact = await prisma.contact.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
    })

    res.json({ success: true, message: 'Cập nhật thành công.', data: contact })
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Không tìm thấy yêu cầu.' })
    }
    res.status(500).json({ success: false, message: 'Lỗi server.' })
  }
}
