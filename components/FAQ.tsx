'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "How much does it cost?",
    answer: "We charge a small one-time fee of $0.99 for a high-resolution AI visualization. This covers the significant GPU computing costs required to generate realistic, medical-grade projections. New users also receive a trial of our premium aesthetic engine."
  },
  {
    question: "Do you keep or share my photos?",
    answer: "Never. Your privacy is our #1 priority. All image processing happens in your active browser session. We do not store, save, or use your photos for model training. Once you close the tab, your data is gone."
  },
  {
    question: "How is this different from a filter?",
    answer: "Most filters just inflate the lips uniformly, looking like filler. Our AI is specifically calibrated to visualize the 'muscle relaxation' effect of a neurotoxin lip flip, which gently rolls the top lip outward without adding artificial volume."
  },
  {
    question: "Will this work on my specific lip shape?",
    answer: "The AI adapts to your unique anatomy, preserving your cupid's bow and natural asymmetry. For the best results, use a photo with good lighting where your lips are relaxed (not smiling excessively or puckered)."
  },
  {
    question: "What is a lip flip?",
    answer: "A lip flip is a non-invasive cosmetic procedure that uses a small amount of neurotoxin (like Botox) to relax the orbicularis oris muscle around the upper lip. This gently rolls the lip outward, creating a subtly fuller appearance without adding volume like fillers do. It's one of the most popular and affordable aesthetic treatments available."
  },
  {
    question: "How accurate are the results?",
    answer: "Our AI model is calibrated with input from board-certified aesthetic professionals and trained on thousands of real lip flip before-and-after outcomes. While individual results may vary based on anatomy and practitioner technique, our visualizations give you a realistic preview of what to expect from the actual procedure."
  },
  {
    question: "Can I show the result to my injector?",
    answer: "You can save your visualization and bring it to your consultation. Many injectors appreciate having a visual reference — it helps align expectations and gives them a clear target to work toward. Our tool is designed to complement professional consultations, not replace them."
  },
  {
    question: "Is my data safe?",
    answer: "Your photos never leave your browser during processing. We use end-to-end encrypted connections, never store images on our servers, and never use your photos for AI training. Your selfie is processed in real-time and discarded immediately after generating your result."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-4 ring-1 ring-white/10">
            <HelpCircle size={24} className="text-pink-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-white">Common Questions</h2>
        <p className="text-slate-400 font-light">Everything you need to know before you upload.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`
                border rounded-2xl transition-all duration-300 overflow-hidden
                ${openIndex === index 
                    ? 'bg-white/[0.03] border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.1)]' 
                    : 'bg-transparent border-white/5 hover:bg-white/[0.02]'
                }
            `}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className={`font-medium text-lg ${openIndex === index ? 'text-white' : 'text-slate-300'}`}>
                {faq.question}
              </span>
              <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-pink-500/20 text-pink-300' : 'bg-white/5 text-slate-400'}`}>
                {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            
            <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="px-6 pb-6 text-slate-400 font-light leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};