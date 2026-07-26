import React, { useState } from 'react';
import { MomoVariety } from '../types';
import { Calculator, Smartphone } from 'lucide-react';
import { useApp } from '../AppContext';

export default function Simulator() {
  const { momoVarieties, visitorProfile, siteSettings } = useApp();

  const [selectedMomo, setSelectedMomo] = useState<MomoVariety>(() => momoVarieties[1] || momoVarieties[0]);
  const [dailyQuantity, setDailyQuantity] = useState<number>(300);
  const [sellingPricePerPlate, setSellingPricePerPlate] = useState<number>(60);
  const [operatingDays, setOperatingDays] = useState<number>(26);

  const brandName = visitorProfile.businessName || siteSettings.companyName;

  // Helper calculation details
  const wholesalePricePerPc = selectedMomo ? selectedMomo.pricePerPcWholesale : 5;
  const platesCountDaily = dailyQuantity / 5;
  const retailPricePerPiece = sellingPricePerPlate / 5;
  
  // Daily Metrics
  const dailyCostWholesale = dailyQuantity * wholesalePricePerPc;
  const dailySalsaGasBuffer = dailyQuantity * 0.6;
  const dailyTotalInvestment = dailyCostWholesale + dailySalsaGasBuffer;
  const dailyRevenue = dailyQuantity * retailPricePerPiece;
  const dailyNetProfit = dailyRevenue - dailyTotalInvestment;

  // Monthly Metrics
  const monthlyCostWholesale = dailyCostWholesale * operatingDays;
  const monthlyRevenue = dailyRevenue * operatingDays;
  const monthlyNetProfit = dailyNetProfit * operatingDays;
  const profitMarginPercent = Math.round((monthlyNetProfit / (monthlyRevenue || 1)) * 100);

  // Comparison with self-manufacturing
  const selfMfgCostPerPc = selectedMomo?.category === 'Chicken' ? 6.2 : 5.1;
  const monthlySelfMfgCost = (dailyQuantity * selfMfgCostPerPc * operatingDays) + 6000;
  const monthlySavingsWithTrySS = Math.max(0, Math.round(monthlySelfMfgCost - monthlyCostWholesale));

  const handleWhatsAppInquiry = () => {
    const waText = encodeURIComponent(
      `Hi ${brandName} Team!\n\n` +
      `I used your Profit Margin Calculator and am interested in partnering.\n\n` +
      `*Variety:* ${selectedMomo?.name || 'Selected Variety'}\n` +
      `*Expected Daily Sales:* ${dailyQuantity} pcs (${platesCountDaily} plates)\n` +
      `*My Retail Price:* ₹${sellingPricePerPlate} per plate\n` +
      `*Calculated Monthly Profit:* ₹${monthlyNetProfit.toLocaleString('en-IN')}\n\n` +
      `Please contact me to discuss wholesale rates and delivery schedules.`
    );
    const targetPhone = siteSettings.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${targetPhone}?text=${waText}`, '_blank');
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0a0f1d] text-white border-t border-white/5 relative" id="margin-calculator">
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full font-mono border border-amber-500/20">
            Interactive Business Tool
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate Retail Profit Margins for {visitorProfile.businessName || 'Your Outlet'}
          </h2>
          <p className="text-[#64748b] text-base">
            See exactly how much profit your cafe, stall, or restaurant can make daily & monthly by partnering with {brandName}.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Inputs Panel */}
          <div className="lg:col-span-5 bg-[#0f172a] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold flex items-center gap-2 border-b border-white/5 pb-4">
              <Calculator className="h-5 w-5 text-amber-500" />
              Adjust Sales Parameters
            </h3>

            {/* Step 1: Select Momo Variety */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 block uppercase tracking-wider">
                1. Select Momo Variety
              </label>
              <div className="grid grid-cols-2 gap-2">
                {momoVarieties.map((momo) => (
                  <button
                    key={momo.id}
                    onClick={() => setSelectedMomo(momo)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedMomo?.id === momo.id
                        ? 'bg-amber-500/10 border-amber-400 text-white'
                        : 'bg-black/40 border-white/5 hover:border-white/10 text-gray-400'
                    }`}
                  >
                    <span className="text-xs font-extrabold block truncate">{momo.name}</span>
                    <span className="text-[10px] font-mono text-amber-400 font-bold block mt-1">
                      ₹{momo.pricePerPcWholesale.toFixed(2)}/pc wholesale
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Daily Quantity Sold */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  2. Daily Pieces Sold
                </label>
                <span className="text-sm font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded">
                  {dailyQuantity} Pcs ({platesCountDaily} Plates)
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={dailyQuantity}
                onChange={(e) => setDailyQuantity(Number(e.target.value))}
                className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                <span>100 Pcs</span>
                <span>1,000 Pcs</span>
                <span>2,000 Pcs</span>
              </div>
            </div>

            {/* Step 3: Selling Price per Plate */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  3. Retail Selling Price per Plate
                </label>
                <span className="text-sm font-mono font-bold text-amber-400 bg-amber-400/5 px-2.5 py-1 rounded">
                  ₹{sellingPricePerPlate} / Plate (5 Pcs)
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={150}
                step={5}
                value={sellingPricePerPlate}
                onChange={(e) => setSellingPricePerPlate(Number(e.target.value))}
                className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                <span>₹30 (Budget Stall)</span>
                <span>₹80 (Standard Cafe)</span>
                <span>₹150 (Premium Restaurant)</span>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">
                Equivalent to <strong className="text-white">₹{(sellingPricePerPlate / 5).toFixed(1)}/piece</strong>. Your wholesale cost is only <strong className="text-white">₹{wholesalePricePerPc.toFixed(2)}/piece</strong>!
              </p>
            </div>

            {/* Step 4: Operating Days */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  4. Working Days a Month
                </label>
                <span className="text-sm font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded">
                  {operatingDays} Days
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={30}
                step={1}
                value={operatingDays}
                onChange={(e) => setOperatingDays(Number(e.target.value))}
                className="w-full h-1 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                <span>15 Days</span>
                <span>26 Days (Sundays Off)</span>
                <span>30 Days (Full Month)</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Profit Metrics Display */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Main stats boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Monthly Sales Revenue</span>
                <span className="text-2xl font-black text-white block mt-2 font-mono">
                  ₹{monthlyRevenue.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-emerald-500 font-bold mt-1 block">
                  ₹{dailyRevenue.toLocaleString('en-IN')} Daily turnover
                </span>
              </div>

              <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Monthly Raw Cost</span>
                <span className="text-2xl font-black text-white block mt-2 font-mono">
                  ₹{monthlyCostWholesale.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-gray-500 font-bold mt-1 block font-mono">
                  ₹{wholesalePricePerPc.toFixed(2)}/pc wholesale
                </span>
              </div>

              <div className="bg-red-950/40 border border-red-500/20 rounded-2xl p-5 relative overflow-hidden">
                <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider">Net Monthly Profit</span>
                <span className="text-2xl font-black text-amber-400 block mt-2 font-mono">
                  ₹{monthlyNetProfit.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-red-400 font-bold mt-1 block">
                  ⚡ Margins: {profitMarginPercent}% Net
                </span>
              </div>

            </div>

            {/* Savings & Production Comparisons */}
            <div className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Why Buying From {brandName} beats Self-Manufacturing:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Self manufacturing breakdown */}
                  <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-2">
                    <span className="text-[11px] font-bold text-gray-400 block">Self-Making (Stall / Kitchen)</span>
                    <ul className="text-[10.5px] text-gray-500 space-y-1">
                      <li>• High helper salaries (~₹8,000/mo)</li>
                      <li>• Raw chicken/veg fluctuating rates</li>
                      <li>• Huge ingredient wastage (cabbage/fat)</li>
                      <li>• Average cost: <strong className="text-red-400">₹6.20 - ₹6.80 per pc</strong></li>
                    </ul>
                  </div>

                  {/* TrySS advantage breakdown */}
                  <div className="bg-red-950/20 p-4 rounded-2xl border border-red-500/10 space-y-2">
                    <span className="text-[11px] font-bold text-amber-500 block">With {brandName} Partnership</span>
                    <ul className="text-[10.5px] text-gray-300 space-y-1">
                      <li>• Zero prep time (Just steam and sell!)</li>
                      <li>• Flat fixed price (<strong className="text-amber-500">starts at ₹4.00</strong>)</li>
                      <li>• Zero wastage or inventory leakage</li>
                      <li>• Consistent taste, shape, and weight</li>
                    </ul>
                  </div>

                </div>

                {/* Savings Banner */}
                {monthlySavingsWithTrySS > 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase block tracking-wider">Partner Saving Index</span>
                      <span className="text-xs text-gray-200 mt-1 block leading-tight">
                        You save approx <strong className="text-white font-extrabold">₹{monthlySavingsWithTrySS.toLocaleString('en-IN')}/mo</strong> in labor, wastage, and gas overheads.
                      </span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg shrink-0">
                      💰
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Form */}
              <div className="pt-6 border-t border-white/5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-white text-sm font-bold block">Ready to increase your profit margins?</span>
                  <span className="text-[#64748b] text-[11px] block">Test a wholesale sample pack at your kitchen.</span>
                </div>
                
                <button
                  onClick={handleWhatsAppInquiry}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Smartphone className="h-4 w-4" />
                  Order Wholesale Samples
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

