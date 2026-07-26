import React from 'react';
import { ClipboardList, Smartphone, Truck, CookingPot, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <ClipboardList className="h-6 w-6 text-red-500" />,
      title: 'Select Momo Varieties',
      description: 'Explore our catalog of Premium Chicken, classic Veg, Rich Paneer, or local Gondhoraj lime chicken. Decide your required quantities.'
    },
    {
      num: '02',
      icon: <Smartphone className="h-6 w-6 text-amber-500" />,
      title: 'Request a Sample Pack',
      description: 'Submit our simple quote form or contact us via WhatsApp. We will deliver a wholesale sample pack to your kitchen for tasting.'
    },
    {
      num: '03',
      icon: <Truck className="h-6 w-6 text-emerald-500" />,
      title: 'Free Morning Delivery',
      description: 'Our insulated supply vehicles deliver raw, blast-frozen momos to your restaurant or stall in Kolkata & Howrah before opening hours.'
    },
    {
      num: '04',
      icon: <CookingPot className="h-6 w-6 text-blue-500" />,
      title: 'Steam/Fry & Make Profits',
      description: 'Steam for 5 minutes or deep fry for 3. Serve to your customers and enjoy consistent 60%+ gross profit margins on Swiggy, Zomato, or over the counter!'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0a0f1d] border-t border-white/5 relative" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase bg-red-500/10 px-3 py-1 rounded-full font-mono border border-red-500/20">
            SIMPLE WORKFLOW
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works: 4 Steps to Partner with TrySS
          </h2>
          <p className="text-[#64748b] text-xs sm:text-sm">
            We have designed a frictionless, fast onboarding pipeline for food businesses. No complex registrations, no heavy advance payments.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 opacity-20" />

          {steps.map((s, idx) => (
            <div key={idx} className="relative space-y-6 flex flex-col items-center text-center group">
              
              {/* Step Icon Badge */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="h-16 w-16 rounded-3xl bg-[#0f172a] border border-white/10 flex items-center justify-center relative z-10 group-hover:border-white/20 transition-all group-hover:scale-105 shadow-lg">
                  {s.icon}
                </div>
                {/* Step Number Overlay */}
                <span className="absolute -top-3 -right-3 text-[10px] font-mono font-bold bg-white/10 border border-white/10 text-white px-2 py-0.5 rounded-full z-20 shadow">
                  {s.num}
                </span>
              </div>

              <div className="space-y-3 max-w-xs">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                  {s.title}
                </h3>
                <p className="text-[#64748b] text-xs leading-relaxed">
                  {s.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic CTA box */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#0f172a] border border-white/10 rounded-3xl p-6 max-w-4xl mx-auto shadow-xl">
            <span className="text-white text-xs sm:text-sm font-bold">
              Want to run a real taste test first?
            </span>
            <a
              href="https://wa.me/917003837512?text=Hi%20TrySS,%20I%20want%20to%20order%20a%20commercial%20sample%20pack%20for%20tasting."
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-transform hover:scale-[1.01]"
            >
              Order Trial Tasting Pack
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
