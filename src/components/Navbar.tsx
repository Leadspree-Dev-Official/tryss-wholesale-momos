import React, { useState } from 'react';
import { Phone, Star, Menu, X, ArrowRight, Sparkles, Clock, Palette } from 'lucide-react';
import { useApp } from '../AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { 
    visitorProfile, 
    siteSettings, 
    setIsOnboardingOpen, 
    remainingTimeFormatted,
    hasActiveSession,
    setIsAdminOpen 
  } = useApp();

  const displayName = visitorProfile.businessName || siteSettings.companyName;

  return (
    <header className="w-full relative z-50">
      {/* Top Banner Bar */}
      <div className="bg-[#0f172a] text-white py-2 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
          
          {/* Rating or Customized Branding Pill */}
          <div className="flex items-center gap-2 flex-wrap">
            {visitorProfile.businessName ? (
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-amber-400 font-bold text-[11px]">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>Personalized for: <strong className="text-white">{visitorProfile.businessName}</strong></span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="flex text-yellow-400">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </span>
                <span className="font-bold text-gray-200">200+ FOOD PARTNERS IN KOLKATA</span>
              </div>
            )}

            {/* Live 3-Hour Auto-Reset Timer Pill */}
            {hasActiveSession && remainingTimeFormatted && (
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full text-[10px] text-gray-300 font-mono">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>Resets in {remainingTimeFormatted}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse">
              FLASH DEAL
            </span>
            <span className="font-semibold text-gray-300">Flat 10% OFF + Free Delivery on Bulk Orders</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300 font-medium">
            <a href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`} className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <Phone className="h-3.5 w-3.5 text-amber-500" />
              <span>{siteSettings.phone}</span>
            </a>
            <a 
              href={`https://wa.me/${siteSettings.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(displayName)},%20I%20am%20interested%20in%20ordering%20wholesale%20momos.`}
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 rounded-full text-[11px] flex items-center gap-1 transition-colors"
            >
              ORDER NOW
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-100 py-3 shadow-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2">
              <div 
                className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md border-2 border-amber-400 relative overflow-hidden transition-colors"
                style={{ backgroundColor: visitorProfile.brandColor || '#dc2626' }}
              >
                <span className="font-display">{(displayName || 'T').charAt(0).toUpperCase()}</span>
                <div className="absolute -bottom-1 right-0 text-[10px]">🔥</div>
              </div>
              <div>
                <div className="flex items-baseline">
                  <span className="font-display font-black text-gray-900 text-2xl tracking-tight leading-none">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-red-600 font-bold ml-1 px-1.5 py-0.5 bg-red-50 rounded uppercase tracking-wider">
                    MOMOS
                  </span>
                </div>
                <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase block -mt-0.5">Wholesale India</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-red-600 text-sm font-bold transition-colors">
                Home
              </a>
              <a href="#menu-varieties" className="text-gray-600 hover:text-red-600 text-sm font-bold transition-colors">
                Menu Varieties
              </a>
              <a href="#margin-calculator" className="text-gray-600 hover:text-red-600 text-sm font-bold transition-colors">
                Margin Calculator
              </a>
              <a href="#why-us" className="text-gray-600 hover:text-red-600 text-sm font-bold transition-colors">
                Why Us
              </a>
              <a href="#faqs" className="text-gray-600 hover:text-red-600 text-sm font-bold transition-colors">
                FAQs
              </a>
              <a href="#reviews" className="text-gray-600 hover:text-red-600 text-sm font-bold transition-colors">
                Reviews
              </a>
            </div>

            {/* Brand Demo Button & CTA Widget */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/30 text-amber-700 hover:text-amber-900 text-xs font-black transition-all hover:scale-105 shadow-sm"
                title="Design Your Brand Demo Engine"
              >
                <Palette className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                <span>Design Brand Demo</span>
              </button>

              <a 
                href={`https://wa.me/${siteSettings.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(displayName)},%20I%20want%20to%20get%20a%20wholesale%20price%20list.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-1.5 text-left hover:bg-green-100/50 transition-colors"
              >
                <div className="h-7 w-7 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                  💬
                </div>
                <div>
                  <span className="text-[9px] text-gray-500 font-bold block leading-none uppercase">WHATSAPP</span>
                  <span className="text-xs text-gray-800 font-extrabold">{siteSettings.phone}</span>
                </div>
              </a>

              <a 
                href="#quote-form" 
                className="text-white px-4 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all shadow-md hover:shadow-lg flex items-center gap-1.5"
                style={{ backgroundColor: visitorProfile.brandColor || '#0f172a' }}
              >
                Get Quote
                <ArrowRight className="h-3.5 w-3.5 text-amber-400" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsOnboardingOpen(true)}
                className="p-2 bg-amber-100 text-amber-700 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Palette className="w-4 h-4" />
                <span>Demo</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-red-600 p-2 rounded-xl border border-gray-100"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-5 space-y-2 shadow-inner">
            <button
              onClick={() => { setIsOnboardingOpen(true); setMobileMenuOpen(false); }}
              className="w-full bg-amber-500/10 border border-amber-500/30 text-amber-800 p-3 rounded-xl text-left text-xs font-bold flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-600" />
                <span>Design Your Brand Demo</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </button>

            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-xl text-sm font-bold"
            >
              Home
            </a>
            <a
              href="#menu-varieties"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-xl text-sm font-bold"
            >
              Menu Varieties
            </a>
            <a
              href="#margin-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-xl text-sm font-bold"
            >
              Margin Calculator
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-xl text-sm font-bold"
            >
              Why Us
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-xl text-sm font-bold"
            >
              FAQs
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-xl text-sm font-bold"
            >
              Reviews
            </a>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={`https://wa.me/${siteSettings.phone.replace(/[^0-9]/g, '')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2"
              >
                💬 Chat on WhatsApp
              </a>
              <button
                onClick={() => { setIsAdminOpen(true); setMobileMenuOpen(false); }}
                className="w-full bg-gray-900 text-gray-200 py-3 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2"
              >
                🔑 Admin Console
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

