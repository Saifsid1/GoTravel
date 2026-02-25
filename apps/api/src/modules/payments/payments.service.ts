import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private razorpay: any;

  constructor(private prisma: PrismaService) {
    // Initialize Razorpay only if keys are available
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      try {
        const Razorpay = require('razorpay');
        this.razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
      } catch (e) {
        console.warn('Razorpay not initialized:', e.message);
      }
    }
  }

  async createOrder(bookingId: string, amount: number) {
    if (!this.razorpay) {
      // Return mock order for development
      return {
        id: `mock_order_${Date.now()}`,
        amount: amount * 100,
        currency: 'INR',
        receipt: bookingId,
      };
    }

    const order = await this.razorpay.orders.create({
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: bookingId,
    });

    await this.prisma.payment.create({
      data: {
        bookingId,
        razorpayOrderId: order.id,
        amount,
        currency: 'INR',
        status: 'PENDING',
      },
    });

    return order;
  }

  async verifyPayment(data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    bookingId: string;
  }) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = data;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      throw new BadRequestException('Invalid payment signature');
    }

    // Update payment record
    await this.prisma.payment.updateMany({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        status: 'CAPTURED',
      },
    });

    // Update booking status to PAID
    const booking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'PAID', paidAmount: { increment: 1 } },
    });

    return { success: true, booking };
  }

  async getPaymentsByBooking(bookingId: string) {
    return this.prisma.payment.findMany({
      where: { bookingId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
