import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users (Admin)' })
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  async getMe(@GetUser('id') userId: string) {
    return this.usersService.findById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user' })
  async updateMe(@GetUser('id') userId: string, @Body() body: any) {
    return this.usersService.update(userId, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
