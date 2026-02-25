'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Sun, Utensils } from 'lucide-react';
import type { Itinerary } from '@gotravel/types';

interface Props {
  itineraries: Itinerary[];
}

export default function ItineraryTimeline({ itineraries }: Props) {
  const [open, setOpen] = useState<string | null>(itineraries[0]?.id || null);

  return (
    <div className="space-y-3">
      {itineraries.map(day => (
        <div key={day.id} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === day.id ? null : day.id)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {day.dayNumber}
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Day {day.dayNumber}: {day.title}</p>
                {day.accommodationType && <p className="text-xs text-gray-500">Stay: {day.accommodationType}</p>}
              </div>
            </div>
            {open === day.id ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
          </button>
          {open === day.id && (
            <div className="p-4 bg-white">
              <p className="text-gray-600 text-sm mb-3">{day.description}</p>
              {Array.isArray((day.activities as any)?.items) && (
                <ul className="space-y-1 mb-3">
                  {((day.activities as any).items as string[]).map((act, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <Sun className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" /> {act}
                    </li>
                  ))}
                </ul>
              )}
              {day.mealsIncluded?.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Utensils className="h-4 w-4 text-teal-500" />
                  Meals: {day.mealsIncluded.join(', ')}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
