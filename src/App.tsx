import React from 'react';
import { AppProvider } from './AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Simulator from './components/Simulator';
import Features from './components/Features';
import SupportedStores from './components/SupportedStores';
import HowItWorks from './components/HowItWorks';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import AdminConsole from './components/AdminConsole';
import ToastContainer from './components/ToastContainer';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0a0f1d] text-gray-100 selection:bg-red-600 selection:text-white scroll-smooth relative">
        {/* Floating Toast Notification Container */}
        <ToastContainer />

        {/* Custom Brand Design Onboarding Modal */}
        <OnboardingModal />

        {/* Executive Admin Control Console Drawer/Modal */}
        <AdminConsole />

        {/* Main Header & Dual Top Banner Bar */}
        <Navbar />

        {/* Landing Page Content Stream */}
        <main>
          {/* Hero Section & Wholesale Quotation Lead Capture Form */}
          <Hero />

          {/* B2B Partner Interactive Profit & Margin Calculator */}
          <Simulator />

          {/* Our Custom Momo Varieties & Wholesale Prices Grid */}
          <SupportedStores />

          {/* Factory Quality, Hygiene & B2B Partner Contract Guarantees */}
          <Features />

          {/* 4 Simple Onboarding Partnership Steps */}
          <HowItWorks />

          {/* Kolkata and Howrah Cafe/Stall Partner Reviews & Savings Reports */}
          <Reviews />

          {/* FAQ Accordion addressing Delivery, MOQ, and Freezer Storage */}
          <FAQ />
        </main>

        {/* FSSAI Licensed B2B Footer Details */}
        <Footer />
      </div>
    </AppProvider>
  );
}
