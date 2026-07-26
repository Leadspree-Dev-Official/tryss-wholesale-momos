import React from 'react';
import { TESTIMONIALS } from '../data';
import { Star, ShieldAlert, CheckCircle, Quote } from 'lucide-react';

export default function Reviews() {
  return (
    <section className="py-20 lg:py-28 bg-[#0a0f1d] border-t border-white/5 relative" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase bg-red-500/10 px-3 py-1 rounded-full font-mono border border-red-500/20">
            PARTNER SUCCESS STORIES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by 200+ Food Businesses
          </h2>
          <p className="text-[#64748b] text-xs sm:text-sm">
            Read how momo stalls, cafes, cloud kitchens, and caterers across Kolkata and Howrah boosted their profits and reduced preparation stress.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative group"
            >
              
              <div className="space-y-4">
                {/* Rating stars & verified badge */}
                <div className="flex justify-between items-center">
                  <div className="flex text-amber-500">
                    {[...Array(t.rating)].map((_, starIdx) => (
                      <Star key={starIdx} className="h-4 w-4 fill-current text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20">
                    <CheckCircle className="h-3 w-3 fill-emerald-400 text-slate-900" /> VERIFIED PARTNER
                  </span>
                </div>

                {/* Savings Badge */}
                <div className="bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl text-[10px] text-red-400 font-extrabold tracking-wide inline-flex items-center gap-1.5 uppercase">
                  <span>🔥 Savings: approx {t.monthlySavings} / mo</span>
                </div>

                {/* Testimonial Quote */}
                <div className="relative pt-2">
                  <Quote className="h-8 w-8 text-white/5 absolute -top-1 -left-2 rotate-180" />
                  <p className="text-gray-300 text-xs leading-relaxed italic relative z-10">
                    &quot;{t.quote}&quot;
                  </p>
                </div>
              </div>

              {/* Author info */}
              <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-white font-extrabold text-sm block">{t.name}</span>
                  <span className="text-gray-400 text-[10.5px] font-bold block mt-0.5">{t.businessType}</span>
                  <span className="text-red-500 text-[10px] font-mono block mt-1">📍 {t.location}</span>
                </div>
                
                {/* Profile Avatar Placeholder Icon */}
                <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shadow">
                  👨‍🍳
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Call to action at bottom of testimonials */}
        <div className="mt-16 bg-[#0f172a] border border-white/10 rounded-3xl p-6 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-white text-xs font-bold uppercase tracking-wider block text-center sm:text-left">WANT TO BE INCLUDED IN OUR SUCCESS WALL?</span>
            <span className="text-gray-400 text-[11px] block mt-1 text-center sm:text-left">Partner with TrySS today, start selling high-margin momos, and scale your brand!</span>
          </div>
          <a
            href="#quote-form"
            className="bg-white hover:bg-gray-100 text-[#0f172a] px-5 py-2.5 rounded-xl text-xs font-black shrink-0 shadow-md"
          >
            Join TrySS Network 🚀
          </a>
        </div>

      </div>
    </section>
  );
}
