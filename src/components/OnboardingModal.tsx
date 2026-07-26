import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Palette, Sparkles, Copy, Check, Clock, ShieldCheck, X, Store, User, Phone, MapPin } from 'lucide-react';

const COLOR_PRESETS = [
  { name: 'Crimson Red', hex: '#dc2626' },
  { name: 'Royal Amber', hex: '#f59e0b' },
  { name: 'Emerald Green', hex: '#10b981' },
  { name: 'Deep Indigo', hex: '#6366f1' },
  { name: 'Sunset Rose', hex: '#f43f5e' },
  { name: 'Violet', hex: '#8b5cf6' },
  { name: 'Electric Cyan', hex: '#06b6d4' },
  { name: 'Charcoal Slate', hex: '#334155' }
];

export default function OnboardingModal() {
  const { 
    visitorProfile, 
    updateVisitorProfile, 
    isOnboardingOpen, 
    setIsOnboardingOpen,
    remainingTimeFormatted,
    hasActiveSession,
    getShareableDemoUrl,
    addToast
  } = useApp();

  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    address: '',
    brandColor: '#dc2626'
  });

  const [copied, setCopied] = useState(false);

  // Sync form state when modal opens or visitorProfile changes
  useEffect(() => {
    setFormData({
      businessName: visitorProfile.businessName || '',
      contactName: visitorProfile.contactName || '',
      phone: visitorProfile.phone || '',
      address: visitorProfile.address || '',
      brandColor: visitorProfile.brandColor || '#dc2626'
    });
  }, [visitorProfile, isOnboardingOpen]);

  if (!isOnboardingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateVisitorProfile(formData);
    setIsOnboardingOpen(false);
  };

  const handleCopyLink = () => {
    const shareUrl = getShareableDemoUrl();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    addToast('📋 Personalized Demo Link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden my-auto text-gray-900">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-white border-b border-gray-100 relative">
          <button
            onClick={() => setIsOnboardingOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Design Your Brand Demo Engine
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight mt-1">
                Customize Website for Your Food Brand
              </h2>
            </div>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl">
            Personalize this wholesale momo portal live with your business name, phone, address, and theme colors to visualize your custom brand experience.
          </p>

          {/* 3-Hour Auto-Reset Session Policy Pill */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950">
            <div className="flex items-center gap-2 text-gray-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong className="text-gray-950">Session Policy:</strong> Form opens on visit & auto-resets every 3 hours.</span>
            </div>
            {hasActiveSession && remainingTimeFormatted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/60 border border-amber-300 text-amber-900 font-bold font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Resets in {remainingTimeFormatted}</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Business / Restaurant Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Momo Magic"
                  value={formData.businessName}
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Contact Person Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sen"
                  value={formData.contactName}
                  onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Phone Number / WhatsApp */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Phone Number / WhatsApp
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. +91 98300 12345"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm font-medium"
                />
              </div>
            </div>

            {/* Business Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Business Address / Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Salt Lake Sec 5, Kolkata"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-xl py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-sm font-medium"
                />
              </div>
            </div>

          </div>

          {/* Primary Theme Color Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-600" />
                Custom Primary Brand Theme Color
              </label>
              <span className="font-mono text-xs text-amber-900 font-bold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                {formData.brandColor}
              </span>
            </div>

            {/* Color Presets */}
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
              {COLOR_PRESETS.map(color => (
                <button
                  type="button"
                  key={color.hex}
                  onClick={() => setFormData({ ...formData, brandColor: color.hex })}
                  className={`h-9 rounded-xl border flex items-center justify-center transition-all ${
                    formData.brandColor.toLowerCase() === color.hex.toLowerCase()
                      ? 'border-gray-900 scale-110 shadow-lg ring-2 ring-amber-500 ring-offset-2 ring-offset-white'
                      : 'border-gray-200 hover:scale-105 opacity-80 hover:opacity-100 shadow-sm'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {formData.brandColor.toLowerCase() === color.hex.toLowerCase() && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
              <input
                type="color"
                value={formData.brandColor}
                onChange={e => setFormData({ ...formData, brandColor: e.target.value })}
                className="w-10 h-8 rounded border-0 bg-transparent cursor-pointer"
              />
              <span className="text-xs text-gray-600 font-medium">Or pick any custom HEX color:</span>
              <input
                type="text"
                value={formData.brandColor}
                onChange={e => setFormData({ ...formData, brandColor: e.target.value })}
                className="ml-auto bg-white border border-gray-300 rounded-lg px-3 py-1 font-mono text-xs text-gray-900 font-bold w-28 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">Live Branding Preview:</span>
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm border border-white/20 shadow-sm"
                  style={{ backgroundColor: formData.brandColor }}
                >
                  {(formData.businessName || 'T').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 leading-none">
                    {formData.businessName || 'Your Business Name'}
                  </h4>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    {formData.address || 'Kolkata & Howrah'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all shadow-md"
                style={{ backgroundColor: formData.brandColor }}
              >
                Sample Button
              </button>
            </div>
          </div>

          {/* Buttons Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-600" />}
              <span>{copied ? 'Copied Link!' : 'Share Personalized Demo Link'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsOnboardingOpen(false)}
                className="w-1/2 sm:w-auto px-4 py-3 rounded-xl text-gray-600 hover:text-gray-900 text-xs font-bold hover:bg-gray-100 transition-colors"
              >
                Skip / Close
              </button>
              <button
                type="submit"
                className="w-1/2 sm:w-auto px-6 py-3 rounded-xl text-white text-xs font-extrabold shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ backgroundColor: formData.brandColor }}
              >
                <Sparkles className="w-4 h-4" />
                <span>Apply Custom Branding</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
