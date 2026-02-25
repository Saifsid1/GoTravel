import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: { destinationId?: string; type?: string; isFeatured?: boolean }) {
    const { destinationId, type, isFeatured } = params || {};
    const where: any = { isActive: true };
    if (destinationId) where.destinationId = destinationId;
    if (type) where.type = type;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;

    return this.prisma.package.findMany({
      where,
      include: {
        destination: true,
        itineraries: { orderBy: { dayNumber: 'asc' } },
      },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findBySlug(slug: string) {
    const pkg = await this.prisma.package.findUnique({
      where: { slug },
      include: {
        destination: {
          include: { fitAddOns: { where: { isAvailable: true } } },
        },
        itineraries: { orderBy: { dayNumber: 'asc' } },
      },
    });

    if (!pkg) throw new NotFoundException(`Package '${slug}' not found`);
    return pkg;
  }

  async findByDestination(destinationId: string) {
    return this.prisma.package.findMany({
      where: { destinationId, isActive: true },
      include: {
        itineraries: { orderBy: { dayNumber: 'asc' } },
      },
    });
  }

  async create(data: any) {
    return this.prisma.package.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.package.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.package.update({ where: { id }, data: { isActive: false } });
  }
}
