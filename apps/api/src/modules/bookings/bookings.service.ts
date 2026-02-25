import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(userId: string, data: {
    packageId: string;
    travelDate: Date;
    returnDate?: Date;
    numAdults: number;
    numChildren: number;
    totalAmount: number;
    selectedFitAddons?: any;
    specialRequests?: string;
  }) {
    const booking = await this.prisma.booking.create({
      data: {
        userId,
        ...data,
        status: 'ENQUIRY',
      },
      include: {
        package: { include: { destination: true } },
        user: { select: { name: true, email: true, phone: true } },
      },
    });

    await this.notificationsService.createNotification({
      type: 'BOOKING',
      title: `New Booking: ${booking.package.name}`,
      message: `${booking.user.name} created a booking for ${booking.package.destination.name}`,
      data: { bookingId: booking.id },
      relatedBookingId: booking.id,
    });

    return booking;
  }

  async findByUser(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        package: {
          include: {
            destination: { select: { name: true, slug: true, heroImage: true } },
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        package: {
          include: {
            destination: true,
            itineraries: { orderBy: { dayNumber: 'asc' } },
          },
        },
        user: { select: { id: true, name: true, email: true, phone: true } },
        payments: true,
      },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findByRef(ref: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingRef: ref },
      include: {
        package: { include: { destination: true } },
        user: { select: { name: true, email: true } },
        payments: true,
      },
    });

    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  async findAll(params?: { status?: string; page?: number; limit?: number }) {
    const { status, page = 1, limit = 20 } = params || {};
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        include: {
          package: { include: { destination: { select: { name: true } } } },
          user: { select: { name: true, email: true, phone: true } },
          payments: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return { data: bookings, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayCount, totalCount, paidCount, totalRevenue] = await Promise.all([
      this.prisma.booking.count({ where: { createdAt: { gte: today } } }),
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: 'PAID' } }),
      this.prisma.booking.aggregate({
        where: { status: { in: ['PAID', 'CONFIRMED', 'COMPLETED'] } },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      todayCount,
      totalCount,
      paidCount,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
    };
  }
}
