import React, { useState } from 'react';
import { MomoVariety } from '../types';
import { ShoppingBag, Flame, Leaf } from 'lucide-react';
import { useApp } from '../AppContext';

export default function SupportedStores() {
  const { momoVarieties, visitorProfile, siteSettings } = useApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Veg' | 'Chicken'>('All');

  const filteredVarieties = momoVarieties.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const brandName = visitorProfile.businessName || siteSettings.companyName;

  return (
    <section className="py-20 lg:py-28 bg-white text-gray-900 relative overflow-hidden" id="menu-varieties">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span 
            className="text-white text-xs font-black tracking-widest uppercase px-3.5 py-1 rounded-full font-mono shadow-sm transition-colors"
            style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
          >
            {brandName.toUpperCase()} PRODUCT CATALOG
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            Our Momo Varieties & B2B Pricing
          </h2>
          <p className="text-gray-600 text-sm">
            All our momos are prepared using ultra-fresh raw ingredients, blast frozen at -18°C, and packed in hygienic packets of 50 pieces. Starting at just ₹4!
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {(['All', 'Veg', 'Chicken'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                activeTab === tab
                  ? 'text-white shadow-md scale-[1.02]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: activeTab === tab ? (visitorProfile.brandColor || '#dc2626') : undefined
              }}
            >
              {tab === 'All' ? '🍽️ All Varieties' : tab === 'Veg' ? '🥬 Pure Veg' : '🍗 Chicken Varieties'}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVarieties.map((momo) => (
            <div
              key={momo.id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              
              {/* Product Image Panel */}
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={momo.image}
                  alt={momo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Popularity Badge */}
                {momo.isPopular && (
                  <span 
                    className="absolute top-4 left-4 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider flex items-center gap-1 shadow-md"
                    style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
                  >
                    <Flame className="h-3 w-3 fill-white" /> Popular Demand
                  </span>
                )}

                {/* Category Badge */}
                <span className={`absolute top-4 right-4 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider shadow-md ${
                  momo.category === 'Chicken' 
                    ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                    : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                }`}>
                  {momo.category === 'Chicken' ? '🍗 chicken' : '🥬 veg'}
                </span>

                {/* Wholesale Cost Floating overlay */}
                <div className="absolute bottom-4 left-4 bg-gray-950/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl border border-white/10">
                  <span className="text-[9px] text-amber-400 font-bold block leading-none uppercase">WHOLESALE RATE</span>
                  <span className="text-lg font-black font-mono leading-none">₹{momo.pricePerPcWholesale.toFixed(2)}<span className="text-xs font-normal"> / pc</span></span>
                </div>
              </div>

              {/* Product Info Panel */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display font-black text-gray-950 text-lg leading-snug">
                    {momo.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                    {momo.ingredients}
                  </p>
                </div>

                {/* Packaging & RRP specifications */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-100 my-2">
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">RRP per Plate</span>
                    <span className="text-xs font-black text-gray-800">
                      ₹{momo.recommendedRetailPrice.toFixed(0)} - ₹{(momo.recommendedRetailPrice * 1.5).toFixed(0)} <span className="text-[9px] text-gray-400">(5 pcs)</span>
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Packaging size</span>
                    <span className="text-xs font-black text-gray-800">
                      📦 {momo.packagingSize}
                    </span>
                  </div>
                </div>

                {/* CTA Action Bar inside Card */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-left">
                    <span className="text-[9px] text-emerald-600 font-black block leading-none">GROSS PROFIT MARGIN</span>
                    <span className="text-xs font-black text-emerald-700 font-mono">
                      ~ {Math.round(((momo.recommendedRetailPrice - (momo.pricePerPcWholesale * 5)) / momo.recommendedRetailPrice) * 100)}% margins
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${siteSettings.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hi ${brandName} Team!\n\nI want to inquire about wholesaling the "${momo.name}" (Wholesale Price: ₹${momo.pricePerPcWholesale.toFixed(2)}/pc). Please send me packaging details and minimum order terms.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#0f172a] hover:bg-red-600 text-white hover:text-white p-2.5 rounded-xl transition-all cursor-pointer"
                    title="Inquire about this variety"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Suggest custom recipe banner */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 bg-red-50 border border-red-100 rounded-3xl p-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center text-white text-xl shadow">
              👨‍🍳
            </div>
            <div>
              <h4 className="text-sm font-black text-gray-900">Need Custom Recipes or Custom weights (e.g. 20g/25g)?</h4>
              <p className="text-gray-500 text-xs mt-0.5">
                We manufacture private-label custom formulas for franchise QSR chains and bulk purchasers ordering &gt;2000 pieces daily.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${siteSettings.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(brandName)},%20I%20run%20a%20franchise%20restaurant%20chain%20and%20want%20to%20discuss%20custom%20momo%20manufacturing.`}
            target="_blank"
            rel="noreferrer"
            className="text-white text-xs bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-extrabold cursor-pointer hover:shadow-lg transition-shadow text-nowrap"
            style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
          >
            Contact B2B Specialist
          </a>
        </div>

      </div>
    </section>
  );
}

