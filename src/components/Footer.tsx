import React, { useState } from 'react';
import { SUPPORTED_AREAS } from '../data';
import { Star, Mail, CheckCircle, Heart, MapPin } from 'lucide-react';
import { useApp } from '../AppContext';

export default function Footer() {
  const { siteSettings, visitorProfile } = useApp();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const brandName = visitorProfile.businessName || siteSettings.companyName;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail('');
  };

  return (
    <footer className="bg-black border-t border-white/10 text-white" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top block: Newsletter and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-12 border-b border-white/5">
          {/* Logo & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div 
                className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-black text-lg border border-amber-400"
                style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
              >
                {(brandName || 'T').charAt(0).toUpperCase()}
              </div>
              <span className="font-display font-black text-white text-xl tracking-tight">{brandName}</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              The premier uncooked, raw frozen momo manufacturer supplying premium, high-profit-margin varieties to QSR chains, stalls, cafes, and restaurant operations daily in Kolkata & Howrah.
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                <Star className="h-4 w-4 fill-amber-500" />
                <span>Trusted by 200+ Active Kolkata Eateries</span>
              </div>
              <span className="text-[10px] text-gray-500 block font-mono">FSSAI License No: {siteSettings.fssaiNumber}</span>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 text-xs font-semibold">
            <div className="space-y-3">
              <h4 className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Menu & Tools</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#menu-varieties" className="text-gray-400 hover:text-white transition-colors">
                    Menu Price List 🍴
                  </a>
                </li>
                <li>
                  <a href="#margin-calculator" className="text-gray-400 hover:text-white transition-colors">
                    Margin Calculator 📈
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="text-gray-400 hover:text-white transition-colors">
                    Why Choose {brandName}
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                    Onboarding Guide
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-gray-400 uppercase tracking-widest text-[10px] font-bold">Delivery Hubs</h4>
              <ul className="space-y-1.5 text-[11px] text-gray-500 font-medium">
                {SUPPORTED_AREAS.slice(0, 5).map((area, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-600" /> {area}
                  </li>
                ))}
                <li className="text-[10px] text-amber-500 font-bold italic">+ Daily Delivery Everywhere else</li>
              </ul>
            </div>
          </div>

          {/* Newsletter section */}
          <div className="lg:col-span-4 space-y-4 bg-[#0f172a] border border-white/5 p-6 rounded-3xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-red-500" /> Subscribe to B2B Deals
            </h4>
            <p className="text-gray-400 text-xs leading-relaxed">
              Get notified of seasonal flash discounts, bulk pricing offers, and custom-making availability schedules.
            </p>

            {success ? (
              <div className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>Subscribed! Check email for discount vouchers.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your Email Address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2 text-xs placeholder-gray-500 focus:outline-none focus:border-red-600 text-white"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition-colors"
                  style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright block */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[11px] font-medium">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} {brandName} India (Kolkata & Howrah). All rights reserved.</p>
            <p className="opacity-60 leading-normal max-w-2xl">
              Factory Location: {siteSettings.address}. Support Helpline: <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="text-amber-500 font-bold hover:underline">{siteSettings.phone}</a>. All items FSSAI-compliant.
            </p>
          </div>
          <div className="flex items-center gap-1 text-gray-500 shrink-0">
            <span>Prepared with love in Kolkata with</span>
            <Heart className="h-3.5 w-3.5 text-red-600 fill-red-600 animate-pulse" />
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-[11px] font-medium">
          <p>
            Developer: <span className="font-semibold">Aniruddha Das</span> | Developed by{" "}
            <a href="https://leadspree.in" target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline">
              LeadSpree Business Solutions
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
