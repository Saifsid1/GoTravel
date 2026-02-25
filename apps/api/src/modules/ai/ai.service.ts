import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  private openai: any;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = require('openai');
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      } catch (e) {
        console.warn('OpenAI not initialized:', e.message);
      }
    }
  }

  async generateItinerary(destination: string, days: number, preferences: string[]) {
    if (!this.openai) {
      return this.getMockItinerary(destination, days);
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Indian travel planner. Generate detailed day-by-day itineraries in JSON format.',
        },
        {
          role: 'user',
          content: `Generate a ${days}-day itinerary for ${destination}, India. Preferences: ${preferences.join(', ')}. Return JSON array with dayNumber, title, description, activities array.`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  }

  async getFITRecommendations(destinationId: string, selectedAddons: any[], availableAddons: any[]) {
    if (!this.openai || availableAddons.length === 0) {
      return availableAddons.filter(a => a.isPopular).slice(0, 3);
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a travel recommendation AI. Based on selected add-ons, recommend complementary ones.',
        },
        {
          role: 'user',
          content: `Selected: ${JSON.stringify(selectedAddons.map(a => ({ name: a.name, category: a.category, tags: a.aiTags })))}. 
Available: ${JSON.stringify(availableAddons.map(a => ({ id: a.id, name: a.name, category: a.category, tags: a.aiTags })))}. 
Return JSON: { "recommendations": [array of addon IDs in order of relevance] }`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content);
    const recommendedIds = result.recommendations || [];
    
    return availableAddons
      .filter(a => recommendedIds.includes(a.id))
      .slice(0, 3);
  }

  async travelAssistant(message: string, context: string) {
    if (!this.openai) {
      return { reply: 'AI assistant is currently unavailable. Please contact our team directly for personalized recommendations.' };
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are GoTravel's AI travel assistant. Help users plan their trips in India. Context: ${context}`,
        },
        { role: 'user', content: message },
      ],
    });

    return { reply: response.choices[0].message.content };
  }

  private getMockItinerary(destination: string, days: number) {
    const itinerary = [];
    for (let i = 1; i <= days; i++) {
      itinerary.push({
        dayNumber: i,
        title: `Day ${i}: Exploring ${destination}`,
        description: `Day ${i} of your ${destination} adventure with amazing experiences.`,
        activities: [`Morning: Explore local attractions`, `Afternoon: Cultural experiences`, `Evening: Local cuisine`],
      });
    }
    return { itinerary };
  }
}
