'use client';

import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter: React.FC<{ target: number; suffix?: string; prefix?: string; decimals?: number }> = ({ target, suffix = '', prefix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-serif text-white mb-2 group-hover:text-pink-200 transition-colors tabular-nums">
      {prefix}{display}{suffix}
    </div>
  );
};

export const StatsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 py-6 max-w-5xl mx-auto border-b border-white/5 mb-16 md:mb-20 px-4">
      <div className="text-center group cursor-default">
        <AnimatedCounter target={50000} suffix="+" />
        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Lips Flipped</div>
      </div>
      <div className="text-center group cursor-default">
        <AnimatedCounter target={4.9} decimals={1} />
        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Avg. Rating</div>
      </div>
      <div className="text-center group cursor-default">
        <AnimatedCounter target={100} suffix="%" />
        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Private & Secure</div>
      </div>
      <div className="text-center group cursor-default">
        <div className="text-3xl md:text-4xl font-serif text-white mb-2 group-hover:text-purple-200 transition-colors">24/7</div>
        <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Instant Access</div>
      </div>
    </div>
  );
};
