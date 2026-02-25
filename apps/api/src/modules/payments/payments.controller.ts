import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Razorpay order' })
  async createOrder(@Body() body: { bookingId: string; amount: number }) {
    return this.paymentsService.createOrder(body.bookingId, body.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify Razorpay payment' })
  async verifyPayment(@Body() body: any) {
    return this.paymentsService.verifyPayment(body);
  }

  @Public()
  @Post('webhook')
  @ApiOperation({ summary: 'Razorpay webhook handler' })
  async handleWebhook(@Body() body: any) {
    // Handle webhook events
    console.log('Razorpay webhook:', body.event);
    return { received: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('booking/:bookingId')
  @ApiBearerAuth()
  async getPaymentsByBooking(@Param('bookingId') bookingId: string) {
    return this.paymentsService.getPaymentsByBooking(bookingId);
  }
}
