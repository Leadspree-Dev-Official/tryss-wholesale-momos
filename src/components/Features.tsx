import React from 'react';
import { ShieldAlert, Award, Truck, Heart, Check, Flame, ClipboardCheck, Sparkles } from 'lucide-react';

export default function Features() {
  const capabilities = [
    {
      icon: <Award className="h-6 w-6 text-red-500" />,
      title: 'FSSAI Certified Hygiene Standards',
      description: 'Manufactured in a state-of-the-art automated food unit following strict sanitization guidelines. No hand touching in molding, completely cleanroom processed.'
    },
    {
      icon: <Flame className="h-6 w-6 text-amber-500" />,
      title: 'Daily Fresh Raw Production',
      description: 'We prepare fresh batches of chicken and vegetable momos every morning. Never stale, never stored for weeks. Delivered raw and uncooked, ready to steam or fry.'
    },
    {
      icon: <Truck className="h-6 w-6 text-emerald-500" />,
      title: 'Free Insulated Morning Delivery',
      description: 'Our specialized cold chain insulated delivery fleet covers Kolkata and Howrah daily, bringing your stock straight to your freezer before your shop doors open.'
    },
    {
      icon: <ClipboardCheck className="h-6 w-6 text-blue-500" />,
      title: 'Zero Market Fluctuation Risk',
      description: 'Cabbage and chicken rates go up and down every day. With TrySS, you enjoy fixed wholesale contracts, shielding your restaurant budget from market inflation.'
    }
  ];

  const qualityStatements = [
    '100% Fresh Breast Chicken & Farm-Fresh Vegetables',
    'FSSAI Certified food safety protocols & sanitized packaging',
    'No artificial colors, MSG, or high chemical preservatives',
    'Standardized weights (20g - 25g per pc) for consistent cook times',
    'Stays perfect in standard deep freezers for up to 30 days',
    'Easy to cook: Steams in 5 minutes, deep fries in 3 minutes'
  ];

  return (
    <section className="py-20 lg:py-28 bg-black border-t border-white/5 relative" id="why-us">
      {/* Visual neon accents */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-white/5">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-red-500 text-xs font-bold tracking-widest uppercase bg-red-500/10 px-3 py-1 rounded-full font-mono border border-red-500/20">
              The TrySS Advantage
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Uncompromising Quality for Your Food Business
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[#64748b] text-xs sm:text-sm leading-relaxed lg:text-right">
              We manage the hard prep work so you can focus entirely on cooking, selling, and expanding your franchise.
            </p>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((c, i) => (
            <div
              key={i}
              className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-white/20 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="bg-black/40 border border-white/10 p-3.5 rounded-2xl shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  {c.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                    {c.title}
                  </h3>
                  <p className="text-[#64748b] text-xs leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Factory highlights bar */}
        <div className="mt-16 bg-[#0f172a] border border-white/10 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left panel */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Standardized Quality Control
            </h3>
            <p className="text-[#64748b] text-xs leading-relaxed">
              Every momo prepared in our central factory is uniform in dimensions, skin thickness, and filling ratio. This ensures standard steaming/frying times, so your customers get the exact same premium flavor every single time.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Capacity: <strong>50,000+ pieces/day</strong> | 100% Reliable Supply</span>
            </div>
          </div>

          {/* Right Checklist */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {qualityStatements.map((statement, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5 bg-emerald-500/10 rounded-full p-0.5" />
                <span className="text-gray-300 text-xs leading-tight font-medium">
                  {statement}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
