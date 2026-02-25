import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  color?: 'orange' | 'teal' | 'blue' | 'green';
}

export default function StatCard({ title, value, icon, trend, color = 'orange' }: Props) {
  const colors = {
    orange: 'bg-orange-50 text-orange-600',
    teal: 'bg-teal-50 text-teal-600',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
  };
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend !== undefined && (
            <div className={cn('flex items-center gap-1 text-xs mt-1', trend >= 0 ? 'text-green-600' : 'text-red-500')}>
              {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(trend)}% vs last month
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', colors[color])}>{icon}</div>
      </div>
    </div>
  );
}
