'use client';
import { FIT_CATEGORIES } from '@/lib/constants';

interface Props {
  selected: string;
  onChange: (cat: string) => void;
}

export default function FITCategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {FIT_CATEGORIES.map(cat => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === cat.value
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
          }`}
        >
          <span>{cat.icon}</span> {cat.label}
        </button>
      ))}
    </div>
  );
}
