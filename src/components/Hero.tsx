import React, { useState, useEffect } from 'react';
import { Shield, Truck, Flame, Leaf, Utensils, Menu, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { QuoteRequest } from '../types';
import { useApp } from '../AppContext';

export default function Hero() {
  const { visitorProfile, siteSettings, addOrder, setIsOnboardingOpen } = useApp();

  const [formData, setFormData] = useState<QuoteRequest>({
    name: '',
    whatsapp: '',
    businessName: '',
    location: '',
    shopType: 'Momo Stall',
    requirements: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Pre-fill form from visitor profile
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      name: visitorProfile.contactName || prev.name,
      whatsapp: visitorProfile.phone || prev.whatsapp,
      businessName: visitorProfile.businessName || prev.businessName,
      location: visitorProfile.address || prev.location
    }));
  }, [visitorProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.whatsapp || !formData.location) {
      alert('Please fill in Name, WhatsApp Number and Location to get wholesale prices.');
      return;
    }

    setSubmitted(true);

    // Also record order lead in AppContext Admin Tracker
    addOrder({
      businessName: formData.businessName || formData.name,
      contactName: formData.name,
      phone: formData.whatsapp,
      location: formData.location,
      shopType: formData.shopType,
      requirements: formData.requirements || 'Interested in wholesale price list & samples'
    });

    const supplierName = visitorProfile.businessName || siteSettings.companyName;

    // Format WhatsApp text API message
    const waText = encodeURIComponent(
      `Hello ${supplierName} Team!\n\n` +
      `I would like to get a Wholesale Quote for my business.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*WhatsApp:* ${formData.whatsapp}\n` +
      `*Business Name:* ${formData.businessName || 'N/A'}\n` +
      `*Shop Type:* ${formData.shopType}\n` +
      `*Location/Area:* ${formData.location}\n` +
      `*Requirements:* ${formData.requirements || 'Interested in price list'}\n\n` +
      `Please send me your price list and samples info.`
    );

    const targetPhone = siteSettings.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${targetPhone}?text=${waText}`;
    
    // Open WhatsApp
    window.open(waUrl, '_blank');
  };

  const brandName = visitorProfile.businessName || siteSettings.companyName;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 py-12 lg:py-20 text-gray-900">
      
      {/* Decorative Floating Momos and Light Effects */}
      <div className="absolute top-10 left-10 opacity-10 pointer-events-none select-none animate-bounce" style={{ animationDuration: '4s' }}>
        <span className="text-8xl">🥟</span>
      </div>
      <div className="absolute bottom-20 left-[40%] opacity-15 pointer-events-none select-none animate-pulse" style={{ animationDuration: '5s' }}>
        <span className="text-7xl">🥟</span>
      </div>
      <div className="absolute top-1/3 right-[35%] opacity-10 pointer-events-none select-none rotate-45">
        <span className="text-9xl">🥟</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Title & Key Selling Points */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Custom Brand Welcome Pill */}
            {visitorProfile.businessName ? (
              <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-md">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>Custom Demo Active: <strong className="text-white underline">{visitorProfile.businessName}</strong></span>
                <button 
                  onClick={() => setIsOnboardingOpen(true)}
                  className="ml-2 bg-amber-400 text-gray-950 px-2 py-0.5 rounded text-[10px] font-black uppercase hover:bg-white"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 bg-red-600/10 border border-red-600/20 px-3 py-1 rounded-full text-xs font-bold text-red-700 tracking-wider uppercase font-mono">
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                Hygiene • Free Delivery
              </div>
            )}

            {/* Title styled like screenshot */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-gray-950">
              #1 Wholesale <br />
              <span 
                className="text-white px-3 py-1 rounded-2xl inline-block my-1 filter drop-shadow-md transition-colors"
                style={{ backgroundColor: visitorProfile.brandColor || '#b91c1c' }}
              >
                Momos Supplier
              </span> <br />
              in Kolkata
            </h1>

            {/* Subtext */}
            <p className="text-gray-900/80 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
              Looking for <span className="font-extrabold text-gray-950">readymade momos</span> for <strong className="text-gray-950">{brandName}</strong>? We are Kolkata's most trusted momo wholesaler supplying momos price starting at just <span className="font-black text-red-700 text-lg bg-white/40 px-1.5 py-0.5 rounded">₹4</span>. Get <span className="font-extrabold text-gray-950">Free Delivery</span> anywhere in Kolkata & Howrah.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#menu-varieties" 
                className="text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2"
                style={{ backgroundColor: visitorProfile.brandColor || '#b91c1c' }}
              >
                <Utensils className="h-4 w-4" />
                Price List 🍴
              </a>
              <a 
                href="#margin-calculator" 
                className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <Menu className="h-4 w-4 text-amber-400" />
                Calculate Margins 📈
              </a>
            </div>

            {/* Features badges bar at bottom of hero content */}
            <div className="grid grid-cols-3 gap-3 max-w-md pt-6 border-t border-gray-950/10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
                <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow">
                  <Truck className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-black block text-gray-950">Free</span>
                  <span className="text-[10px] text-gray-900 block font-bold leading-none">DELIVERY</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
                <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center text-white shrink-0 shadow">
                  <Flame className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-black block text-gray-950">₹5 Only</span>
                  <span className="text-[10px] text-gray-900 block font-bold leading-none">CHICKEN MOMO</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30">
                <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow">
                  <Leaf className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs font-black block text-gray-950">₹4 Only</span>
                  <span className="text-[10px] text-gray-900 block font-bold leading-none">VEG MOMO</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Wholesale Quote Form Card */}
          <div className="lg:col-span-5" id="quote-form">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 transition-colors"
                style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
              />
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Get Wholesale Quote</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                  🔥 {brandName.toUpperCase()} WHOLESALE PORTAL
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="h-14 w-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl mx-auto shadow-md">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Request Sent & Logged!</h4>
                  <p className="text-sm text-gray-600">
                    Your inquiry has been logged in our partner system. Click below to chat directly with our dispatch manager on WhatsApp.
                  </p>
                  <a
                    href={`https://wa.me/${siteSettings.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${brandName}! I just submitted the form. My name is ${formData.name} from ${formData.location}. Please share the wholesale price list.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
                  >
                    💬 Direct WhatsApp Chat
                  </a>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="block text-xs text-gray-400 underline mx-auto mt-4"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="sr-only">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-bold focus:outline-none transition-all text-gray-900 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="sr-only">WhatsApp Number</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      placeholder="WhatsApp Number *"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-bold focus:outline-none transition-all text-gray-900 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="sr-only">Business Name (Cafe/Stall)</label>
                    <input
                      type="text"
                      name="businessName"
                      placeholder="Business Name (Cafe/Stall)"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-bold focus:outline-none transition-all text-gray-900 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="sr-only">Location / Area</label>
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="Location / Area (e.g. Salt Lake, Garia) *"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-bold focus:outline-none transition-all text-gray-900 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="sr-only">Shop Type</label>
                    <select
                      name="shopType"
                      value={formData.shopType}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none transition-all text-gray-900 cursor-pointer shadow-sm"
                    >
                      <option value="Momo Stall">Momo Stall / Cart</option>
                      <option value="Cafe">Cafe / QSR</option>
                      <option value="Restaurant">Fine Dining / Family Restaurant</option>
                      <option value="Cloud Kitchen">Cloud Kitchen</option>
                      <option value="Catering">Catering / Events</option>
                      <option value="Other">Other Retailer</option>
                    </select>
                  </div>

                  <div>
                    <label className="sr-only">Requirements</label>
                    <textarea
                      name="requirements"
                      rows={3}
                      placeholder="Requirements (e.g. Quantity/Type, Chicken Steamed daily 300pcs)"
                      value={formData.requirements}
                      onChange={handleChange}
                      className="w-full bg-white border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-xs placeholder-gray-400 font-bold focus:outline-none transition-all text-gray-900 resize-none shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white font-extrabold text-sm py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
                  >
                    <span>Get Price List & Samples</span>
                    <span className="text-base">💬</span>
                  </button>

                  <div className="pt-2 flex justify-center items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    <Shield className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Official Partner Quality Protection</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Horizontal Scrolling Banner of Slogans */}
      <div className="bg-gray-950 text-white py-4 mt-16 overflow-hidden relative select-none border-y border-white/5">
        <motion.div 
          className="flex whitespace-nowrap gap-12 text-xs font-bold tracking-widest uppercase"
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {/* First sequence */}
          <div className="flex shrink-0 items-center gap-12 justify-around min-w-full">
            <span className="flex items-center gap-2 text-amber-400">⚡ FREE DELIVERY IN KOLKATA & HOWRAH</span>
            <span className="flex items-center gap-2 text-white">🥟 PREMIUM CHICKEN MOMOS WHOLESALE</span>
            <span className="flex items-center gap-2 text-emerald-400">🏭 AUTOMATED HYGIENIC MOMO FACTORY</span>
            <span className="flex items-center gap-2 text-white">💰 FROZEN VEG MOMOS AT ₹4 ONLY</span>
            <span className="flex items-center gap-2 text-amber-400">🔥 READYMADE UNCOOKED RAW MOMOS</span>
          </div>
          {/* Second duplicate sequence for seamless scrolling */}
          <div className="flex shrink-0 items-center gap-12 justify-around min-w-full">
            <span className="flex items-center gap-2 text-amber-400">⚡ FREE DELIVERY IN KOLKATA & HOWRAH</span>
            <span className="flex items-center gap-2 text-white">🥟 PREMIUM CHICKEN MOMOS WHOLESALE</span>
            <span className="flex items-center gap-2 text-emerald-400">🏭 AUTOMATED HYGIENIC MOMO FACTORY</span>
            <span className="flex items-center gap-2 text-white">💰 FROZEN VEG MOMOS AT ₹4 ONLY</span>
            <span className="flex items-center gap-2 text-amber-400">🔥 READYMADE UNCOOKED RAW MOMOS</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

