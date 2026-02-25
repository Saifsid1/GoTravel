import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DestinationsService } from './destinations.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('destinations')
@Controller('destinations')
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all destinations with filters' })
  async findAll(
    @Query('query') query?: string,
    @Query('state') state?: string,
    @Query('featured') featured?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.destinationsService.findAll({
      query,
      state,
      isFeatured: featured === 'true' ? true : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 12,
    });
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured destinations' })
  async findFeatured() {
    return this.destinationsService.findFeatured();
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Search destinations' })
  async search(@Query('q') query: string) {
    return this.destinationsService.search(query);
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Get destination by slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.destinationsService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create destination (Admin)' })
  async create(@Body() body: any) {
    return this.destinationsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update destination (Admin)' })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.destinationsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete destination (Admin)' })
  async remove(@Param('id') id: string) {
    return this.destinationsService.remove(id);
  }
}
