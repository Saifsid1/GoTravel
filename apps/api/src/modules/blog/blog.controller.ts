import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Public()
  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.blogService.findAll(page ? parseInt(page) : 1, limit ? parseInt(limit) : 10);
  }

  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Post()
  async create(@Body() body: any) {
    return this.blogService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.blogService.update(id, body);
  }
}
