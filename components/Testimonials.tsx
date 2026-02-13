import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Considering Injections",
    text: "I was terrified of the 'duck look'. This tool showed me how subtle a lip flip actually is compared to filler. It gave me the courage to finally book my appointment.",
    rating: 5,
  },
  {
    name: "Dr. K. Chen",
    role: "Aesthetic Dermatologist",
    text: "I recommend this to my patients during consultations. It manages expectations perfectly by showing realistic, non-surgical results rather than exaggerated filters.",
    rating: 5,
    verified: true
  },
  {
    name: "Emily Rodriguez",
    role: "Verified User",
    text: "Honestly, this saved me money. I realized I love my natural shape and just needed a good gloss. Best free tool ever for avoiding buyer's remorse.",
    rating: 5,
  },
  {
    name: "Jessica Miller",
    role: "Recent Patient",
    text: "The result looked exactly like what my injector achieved two weeks later. It's scary accurate about the 'roll out' effect without adding fake volume.",
    rating: 5,
  },
  {
    name: "Amanda L.",
    role: "Beauty Blogger",
    text: "Finally an AI that understands 'subtle'. Other apps make me look like a cartoon. This kept my skin texture and just relaxed the lip muscle visually.",
    rating: 5,
  },
  {
    name: "Courtney B.",
    role: "Verified User",
    text: "I have a gummy smile and wasn't sure if this would help visualize the fix. It did! Seeing the 'after' made me so emotional in a good way.",
    rating: 5,
  },
  {
    name: "Dr. Rachel M.",
    role: "Plastic Surgeon",
    text: "I use this in my practice to set realistic expectations. Patients come in with filter photos that are impossible — this tool gives them an honest preview.",
    rating: 5,
    verified: true
  },
  {
    name: "Taylor H.",
    role: "Bride-to-Be",
    text: "Needed to see if a lip flip would photograph well for my wedding. This confirmed it would look natural and subtle in photos. Booked same day!",
    rating: 5,
  },
  {
    name: "Nicole S.",
    role: "Verified User",
    text: "I showed my injector the result and she said 'that's exactly what I'd aim for.' Now I know we're on the same page before spending a dime.",
    rating: 5,
  },
  {
    name: "Priya K.",
    role: "First-Timer",
    text: "As someone who's never done anything cosmetic, this was the perfect low-pressure way to explore. No one judging you, just your face and the AI.",
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <div className="w-full py-10 overflow-hidden relative">

      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-10 gap-4 px-4">
        <div className="flex items-center gap-2 text-emerald-300 bg-emerald-900/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm animate-fade-in text-center">
          <ShieldCheck size={14} />
          Clinically Calibrated Results
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-white text-center">
          Don&apos;t just take our word for it.
        </h3>
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="ml-2 text-slate-400 font-medium text-sm">4.9/5 Average from 12,000+ sessions</span>
        </div>
      </div>

      {/* Marquee Slider */}
      <div className="relative flex w-full mask-gradient">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee min-w-full shrink-0 gap-4 md:gap-6 pr-6 hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, i) => (
            <div
              key={i}
              className="w-[85vw] max-w-[20rem] md:w-[22rem] flex-shrink-0 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-pink-500/30 hover:bg-white/[0.04] hover:-translate-y-1 transition-all duration-300 group cursor-default"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-0.5">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-pink-500 text-pink-500" />
                  ))}
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                    <CheckCircle2 size={10} /> PRO
                  </div>
                )}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light font-sans tracking-wide">&ldquo;{review.text}&rdquo;</p>

              <div className="flex items-center gap-3 mt-auto border-t border-white/5 pt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs text-white font-semibold block">{review.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wide font-medium">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
