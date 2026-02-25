import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params?: {
    query?: string;
    state?: string;
    isFeatured?: boolean;
    page?: number;
    limit?: number;
  }) {
    const { query, state, isFeatured, page = 1, limit = 12 } = params || {};
    const skip = (page - 1) * limit;

    const where: any = { isActive: true };
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { state: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
      ];
    }
    if (state) where.state = state;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;

    const [destinations, total] = await Promise.all([
      this.prisma.destination.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        include: {
          _count: { select: { packages: true, fitAddOns: true } },
        },
      }),
      this.prisma.destination.count({ where }),
    ]);

    return {
      data: destinations,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findFeatured() {
    return this.prisma.destination.findMany({
      where: { isActive: true, isFeatured: true },
      take: 6,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const destination = await this.prisma.destination.findUnique({
      where: { slug },
      include: {
        packages: {
          where: { isActive: true },
          include: {
            itineraries: { orderBy: { dayNumber: 'asc' } },
          },
        },
        fitAddOns: {
          where: { isAvailable: true },
          orderBy: [{ isPopular: 'desc' }, { createdAt: 'asc' }],
        },
      },
    });

    if (!destination) {
      throw new NotFoundException(`Destination '${slug}' not found`);
    }

    return destination;
  }

  async create(data: any) {
    return this.prisma.destination.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.destination.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.destination.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async search(query: string) {
    return this.prisma.destination.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { state: { contains: query, mode: 'insensitive' } },
          { city: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 10,
      select: {
        id: true,
        slug: true,
        name: true,
        state: true,
        heroImage: true,
        basePricePerPerson: true,
      },
    });
  }
}
