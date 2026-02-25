export default function HowItWorks() {
  const steps = [
    { num: '01', icon: '🗺️', title: 'Choose Your Dream Destination', desc: 'Browse 100+ handpicked Indian destinations. Filter by budget, duration, category, and travel style.' },
    { num: '02', icon: '🎨', title: 'Customize Your Experience', desc: 'Build your FIT package with activities, stays, and experiences. Our AI suggests the best combinations for your budget.' },
    { num: '03', icon: '✅', title: 'Book & Travel Stress-Free', desc: 'Secure instant booking with Razorpay. Get 24/7 WhatsApp support and a dedicated travel expert.' },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How GoTravel Works</h2>
          <p className="mt-2 text-gray-600">Your perfect trip in 3 simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-orange-200 to-orange-200 via-orange-400" />
          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl text-3xl mb-4 border-2 border-orange-100">
                {step.icon}
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {i + 1}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
