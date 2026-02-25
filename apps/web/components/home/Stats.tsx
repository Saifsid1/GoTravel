'use client';
import { useEffect, useRef, useState } from 'react';

const statsData = [
  { value: 50000, label: 'Happy Travelers', suffix: '+', icon: '😊' },
  { value: 100, label: 'Destinations', suffix: '+', icon: '📍' },
  { value: 500, label: 'Expert Guides', suffix: '+', icon: '🧭' },
  { value: 10, label: 'Years of Experience', suffix: '+', icon: '🏆' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map(s => (
            <div key={s.label}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-bold text-orange-400">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
