export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
}

export async function initiatePayment(options: RazorpayOptions): Promise<void> {
  const loaded = await loadRazorpayScript();
  if (!loaded) throw new Error('Failed to load Razorpay');
  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}
