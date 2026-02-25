import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private gateway: NotificationsGateway,
  ) {}

  async createNotification(data: {
    type: 'LEAD' | 'BOOKING' | 'PAYMENT' | 'ENQUIRY';
    title: string;
    message: string;
    data?: any;
    relatedUserId?: string;
    relatedBookingId?: string;
  }) {
    const notification = await this.prisma.adminNotification.create({
      data: {
        type: data.type,
        title: data.title,
        message: data.message,
        data: data.data,
        relatedUserId: data.relatedUserId,
        relatedBookingId: data.relatedBookingId,
      },
    });

    this.gateway.emitNotification(notification);
    return notification;
  }

  emitNewLead(lead: any) {
    this.gateway.emitNewLead(lead);
  }

  async sendWhatsAppToAdmin(message: string) {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
      console.log('Twilio not configured. WhatsApp message:', message);
      return;
    }

    try {
      const twilio = require('twilio');
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      await client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: process.env.ADMIN_WHATSAPP_NUMBER,
        body: message,
      });
    } catch (error) {
      console.error('WhatsApp notification failed:', error.message);
    }
  }

  async sendEmailToAdmin(subject: string, html: string) {
    if (!process.env.RESEND_API_KEY) {
      console.log('Resend not configured. Email subject:', subject);
      return;
    }

    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'GoTravel <noreply@gotravel.com>',
        to: process.env.ADMIN_EMAIL || 'admin@gotravel.com',
        subject,
        html,
      });
    } catch (error) {
      console.error('Email notification failed:', error.message);
    }
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [notifications, total] = await Promise.all([
      this.prisma.adminNotification.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.adminNotification.count(),
    ]);

    return { data: notifications, total, page, limit };
  }

  async markAsRead(id: string) {
    return this.prisma.adminNotification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead() {
    return this.prisma.adminNotification.updateMany({
      where: { isRead: false },
      data: { isRead: true },
    });
  }

  async getUnreadCount() {
    return this.prisma.adminNotification.count({ where: { isRead: false } });
  }
}
