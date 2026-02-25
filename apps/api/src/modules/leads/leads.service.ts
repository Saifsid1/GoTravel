import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(data: {
    userName: string;
    userEmail: string;
    userPhone?: string;
    destinationId?: string;
    sourcePage?: string;
    utmSource?: string;
    utmMedium?: string;
    message?: string;
    userId?: string;
  }) {
    const lead = await this.prisma.lead.create({ data });

    // Create admin notification
    await this.notificationsService.createNotification({
      type: 'LEAD',
      title: `New Lead: ${data.userName}`,
      message: `${data.userName} (${data.userEmail}) submitted an enquiry`,
      data: { leadId: lead.id, phone: data.userPhone },
    });

    // Emit socket event
    this.notificationsService.emitNewLead(lead);

    // Send WhatsApp to admin (non-blocking)
    this.notificationsService.sendWhatsAppToAdmin(
      `🔔 New Lead!\n👤 Name: ${data.userName}\n📧 Email: ${data.userEmail}\n📱 Phone: ${data.userPhone || 'N/A'}\n📍 Source: ${data.sourcePage || 'Website'}`,
    ).catch(console.error);

    return lead;
  }

  async findAll(params?: {
    status?: string;
    destinationId?: string;
    page?: number;
    limit?: number;
  }) {
    const { status, destinationId, page = 1, limit = 20 } = params || {};
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;
    if (destinationId) where.destinationId = destinationId;

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        skip,
        take: limit,
        include: { destination: { select: { name: true, slug: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.lead.count({ where }),
    ]);

    return { data: leads, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: {
        destination: true,
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });
  }

  async updateStatus(id: string, status: string, assignedTo?: string) {
    const data: any = { status };
    if (assignedTo) data.assignedTo = assignedTo;
    if (status === 'CONTACTED') data.contactedAt = new Date();
    return this.prisma.lead.update({ where: { id }, data });
  }

  async getKanbanData() {
    const statuses = ['NEW', 'CONTACTED', 'CONVERTED', 'LOST'];
    const result: any = {};

    for (const status of statuses) {
      result[status] = await this.prisma.lead.findMany({
        where: { status: status as any },
        include: { destination: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        take: 20,
      });
    }

    return result;
  }

  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayCount, totalCount, convertedCount] = await Promise.all([
      this.prisma.lead.count({ where: { createdAt: { gte: today } } }),
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { status: 'CONVERTED' } }),
    ]);

    return { todayCount, totalCount, convertedCount };
  }
}
