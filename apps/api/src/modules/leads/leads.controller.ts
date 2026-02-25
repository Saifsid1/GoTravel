import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('leads')
@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  async create(@Body() body: any) {
    return this.leadsService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all leads (Admin)' })
  async findAll(
    @Query('status') status?: string,
    @Query('destinationId') destinationId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.leadsService.findAll({
      status,
      destinationId,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get('kanban')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get leads in kanban format (Admin)' })
  async getKanban() {
    return this.leadsService.getKanbanData();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get('stats')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get lead stats (Admin)' })
  async getStats() {
    return this.leadsService.getDashboardStats();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.leadsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Put(':id/status')
  @ApiBearerAuth()
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string; assignedTo?: string },
  ) {
    return this.leadsService.updateStatus(id, body.status, body.assignedTo);
  }
}
