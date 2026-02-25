import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const [
      todayLeads,
      todayBookings,
      totalRevenue,
      totalUsers,
      topDestinations,
    ] = await Promise.all([
      this.prisma.lead.count({ where: { createdAt: { gte: today } } }),
      this.prisma.booking.count({ where: { createdAt: { gte: today } } }),
      this.prisma.booking.aggregate({
        where: { status: { in: ['PAID', 'COMPLETED'] } },
        _sum: { totalAmount: true },
      }),
      this.prisma.user.count({ where: { role: 'USER' } }),
      this.prisma.destination.findMany({
        take: 5,
        include: {
          _count: { select: { packages: true } },
        },
        orderBy: { isFeatured: 'desc' },
      }),
    ]);

    // Get revenue by month (last 6 months)
    const revenueByMonth = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date();
      start.setMonth(start.getMonth() - i);
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      const monthRevenue = await this.prisma.booking.aggregate({
        where: {
          createdAt: { gte: start, lt: end },
          status: { in: ['PAID', 'COMPLETED'] },
        },
        _sum: { totalAmount: true },
      });

      revenueByMonth.push({
        month: start.toLocaleString('default', { month: 'short' }),
        revenue: monthRevenue._sum.totalAmount || 0,
      });
    }

    return {
      todayLeads,
      todayBookings,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalUsers,
      topDestinations,
      revenueByMonth,
    };
  }

  async trackEvent(data: { event: string; userId?: string; metadata?: any }) {
    // In production, send to GA4 Measurement Protocol
    console.log('Analytics event:', data);
    return { tracked: true };
  }
}
