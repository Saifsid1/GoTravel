import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where: { isPublished: true },
        skip,
        take: limit,
        include: { author: { select: { name: true, avatar: true } } },
        orderBy: { publishedAt: 'desc' },
      }),
      this.prisma.blogPost.count({ where: { isPublished: true } }),
    ]);
    return { data: posts, total, page, limit };
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { name: true, avatar: true } } },
    });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async create(data: any) {
    return this.prisma.blogPost.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.blogPost.update({ where: { id }, data });
  }
}
