import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { page?: number; limit?: number }) {
    const { page = 1, limit = 20 } = params || {};
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          avatar: true,
          utmSource: true,
          createdAt: true,
          _count: { select: { bookings: true, leads: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(),
    ]);

    return { data: users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            package: { include: { destination: { select: { name: true } } } },
            payments: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        leads: {
          include: { destination: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const { password, ...safeUser } = user as any;
    return safeUser;
  }

  async update(id: string, data: { name?: string; phone?: string; preferences?: any }) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        preferences: true,
      },
    });
  }
}
