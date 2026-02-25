'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: Array<{ month: string; revenue: number }>;
}

export default function RevenueChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">Revenue Trend (Last 6 Months)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
          <Tooltip formatter={(v: any) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
          <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
