import { Target, Heart, Users, Award } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { name: 'Priya Nair', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=200' },
    { name: 'Arjun Singh', role: 'Lead Travel Curator', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
    { name: 'Meera Pillai', role: 'Customer Experience', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  ];
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">About GoTravel</h1>
        <p className="text-orange-100 max-w-2xl mx-auto text-lg">We believe every journey should be as unique as the traveler. That's why we built India's first AI-powered FIT travel platform.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">GoTravel was founded with a single mission: to make incredible India travel accessible, personalized, and unforgettable for every traveler. We combine cutting-edge technology with deep local expertise to create journeys that go beyond the ordinary.</p>
            <p className="text-gray-600 leading-relaxed">Whether you're a solo adventurer, a family on vacation, or honeymooners seeking romance, our AI-powered platform builds the perfect itinerary matched to your interests, budget, and travel style.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ icon: Target, label: 'Mission', text: 'Make travel personal' }, { icon: Heart, label: 'Values', text: 'Passion for India' }, { icon: Users, label: 'Community', text: '50,000+ travelers' }, { icon: Award, label: 'Quality', text: '4.8/5 satisfaction' }].map(({ icon: Icon, label, text }) => (
              <div key={label} className="bg-orange-50 rounded-xl p-4 text-center">
                <Icon className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{m.name}</h3>
                <p className="text-xs text-gray-500">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
