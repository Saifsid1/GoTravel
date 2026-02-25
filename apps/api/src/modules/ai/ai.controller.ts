import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('ai')
@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Public()
  @Post('itinerary')
  @ApiOperation({ summary: 'Generate AI itinerary' })
  async generateItinerary(
    @Body() body: { destination: string; days: number; preferences: string[] },
  ) {
    return this.aiService.generateItinerary(body.destination, body.days, body.preferences);
  }

  @Public()
  @Post('chat')
  @ApiOperation({ summary: 'Chat with AI travel assistant' })
  async chat(@Body() body: { message: string; context?: string }) {
    return this.aiService.travelAssistant(body.message, body.context || '');
  }
}
