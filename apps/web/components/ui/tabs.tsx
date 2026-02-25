'use client';
import { cn } from '@/lib/utils';
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext<{ activeTab: string; setTab: (v: string) => void } | null>(null);

export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) {
  const [activeTab, setTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex border-b border-gray-200', className)}>{children}</div>;
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)!;
  const active = ctx.activeTab === value;
  return (
    <button
      onClick={() => ctx.setTab(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
        active ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-600 hover:text-gray-900',
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)!;
  if (ctx.activeTab !== value) return null;
  return <div className={cn('py-4', className)}>{children}</div>;
}
