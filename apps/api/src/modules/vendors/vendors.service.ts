import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { destinationId?: string; type?: string; page?: number; limit?: number }) {
    const { destinationId, type, page = 1, limit = 20 } = params || {};
    const skip = (page - 1) * limit;
    const where: any = {};
    if (destinationId) where.destinationId = destinationId;
    if (type) where.type = type;

    const [vendors, total] = await Promise.all([
      this.prisma.vendor.findMany({
        where,
        skip,
        take: limit,
        include: { destination: { select: { name: true, state: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.vendor.count({ where }),
    ]);

    return { data: vendors, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    return this.prisma.vendor.findUnique({
      where: { id },
      include: { destination: true },
    });
  }

  async create(data: any) {
    return this.prisma.vendor.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.vendor.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.vendor.delete({ where: { id } });
  }
}
