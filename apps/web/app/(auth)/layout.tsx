import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Globe className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-orange-500">GoTravel</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
