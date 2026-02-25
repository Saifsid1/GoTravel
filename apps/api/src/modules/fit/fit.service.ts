import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class FitService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async getAddOnsByDestination(destinationId: string, category?: string) {
    const where: any = { destinationId, isAvailable: true };
    if (category) where.category = category;

    return this.prisma.fITAddOn.findMany({
      where,
      orderBy: [{ isPopular: 'desc' }, { createdAt: 'asc' }],
    });
  }

  async calculatePrice(params: {
    packageId: string;
    selectedAddonIds: string[];
    adults: number;
    children: number;
  }) {
    const { packageId, selectedAddonIds, adults, children } = params;

    const pkg = await this.prisma.package.findUnique({ where: { id: packageId } });
    if (!pkg) throw new Error('Package not found');

    const basePrice = (pkg.discountedPrice || pkg.basePrice) * (adults + children * 0.5);

    let addonsTotal = 0;
    const addonDetails = [];

    if (selectedAddonIds.length > 0) {
      const addons = await this.prisma.fITAddOn.findMany({
        where: { id: { in: selectedAddonIds } },
      });

      for (const addon of addons) {
        const addonPrice = addon.pricePerPerson * (adults + children * 0.5);
        addonsTotal += addonPrice;
        addonDetails.push({
          id: addon.id,
          name: addon.name,
          pricePerPerson: addon.pricePerPerson,
          totalPrice: addonPrice,
        });
      }
    }

    return {
      basePrice,
      addonsTotal,
      totalAmount: basePrice + addonsTotal,
      breakdown: addonDetails,
    };
  }

  async getAiRecommendations(destinationId: string, selectedAddonIds: string[]) {
    const allAddons = await this.prisma.fITAddOn.findMany({
      where: { destinationId, isAvailable: true },
    });

    const selectedAddons = allAddons.filter((a) => selectedAddonIds.includes(a.id));
    const unselectedAddons = allAddons.filter((a) => !selectedAddonIds.includes(a.id));

    try {
      const recommendations = await this.aiService.getFITRecommendations(
        destinationId,
        selectedAddons,
        unselectedAddons,
      );
      return recommendations;
    } catch {
      // Fallback: return popular add-ons
      return unselectedAddons.filter((a) => a.isPopular).slice(0, 3);
    }
  }
}
