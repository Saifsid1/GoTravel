import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FitService } from './fit.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('fit')
@Controller('fit')
export class FitController {
  constructor(private fitService: FitService) {}

  @Public()
  @Get(':destinationId/addons')
  @ApiOperation({ summary: 'Get FIT add-ons for a destination' })
  async getAddOns(
    @Param('destinationId') destinationId: string,
    @Query('category') category?: string,
  ) {
    return this.fitService.getAddOnsByDestination(destinationId, category);
  }

  @Public()
  @Post('calculate')
  @ApiOperation({ summary: 'Calculate price for FIT customization' })
  async calculatePrice(
    @Body() body: {
      packageId: string;
      selectedAddonIds: string[];
      adults: number;
      children: number;
    },
  ) {
    return this.fitService.calculatePrice(body);
  }

  @Public()
  @Post(':destinationId/recommendations')
  @ApiOperation({ summary: 'Get AI-powered FIT recommendations' })
  async getRecommendations(
    @Param('destinationId') destinationId: string,
    @Body() body: { selectedAddonIds: string[] },
  ) {
    return this.fitService.getAiRecommendations(destinationId, body.selectedAddonIds);
  }
}
