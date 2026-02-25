import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { VendorsService } from './vendors.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('vendors')
@Controller('vendors')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
@ApiBearerAuth()
export class VendorsController {
  constructor(private vendorsService: VendorsService) {}

  @Get()
  async findAll(
    @Query('destinationId') destinationId?: string,
    @Query('type') type?: string,
    @Query('page') page?: string,
  ) {
    return this.vendorsService.findAll({ destinationId, type, page: page ? parseInt(page) : 1 });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.vendorsService.findById(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.vendorsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.vendorsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.vendorsService.remove(id);
  }
}
