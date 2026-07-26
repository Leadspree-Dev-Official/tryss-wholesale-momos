import React, { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0a0f1d] border-t border-white/5 relative" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-red-500 text-xs font-bold tracking-widest uppercase bg-red-500/10 px-3 py-1 rounded-full font-mono border border-red-500/20">
            KNOWLEDGE BASE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-[#64748b] text-xs sm:text-sm">
            Everything you need to know about partnering with TrySS Wholesale, scheduling deliveries, and maintaining safety.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left text-white hover:bg-white/[0.02] transition-colors duration-150 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-xs sm:text-sm leading-tight text-gray-100">
                    {faq.question}
                  </span>
                  <span className="text-red-500 shrink-0 ml-4">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 border-t border-white/5 pt-4 bg-black/20">
                    <p className="text-gray-400 text-xs sm:text-xs leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Further inquiries contact callout */}
        <div className="mt-12 text-center p-6 bg-red-500/5 rounded-3xl border border-red-500/15">
          <p className="text-gray-300 text-xs">
            Have an operational or billing question not listed here? Chat directly with our support team.
          </p>
          <a
            href="https://wa.me/917003837512?text=Hi%20TrySS,%20I%20have%20an%20inquiry%20about%20your%20wholesale%20billing%20and%20deliveries."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-500 font-bold text-xs mt-3 underline"
          >
            💬 Chat with Wholesale Help Desk →
          </a>
        </div>

      </div>
    </section>
  );
}
