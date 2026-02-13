'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const ACTIVITIES = [
  { name: "Sarah M.", location: "Los Angeles, CA", action: "just visualized her lip flip" },
  { name: "Jessica R.", location: "Miami, FL", action: "saved her result" },
  { name: "Emma T.", location: "New York, NY", action: "just uploaded a selfie" },
  { name: "Olivia K.", location: "Austin, TX", action: "just visualized her lip flip" },
  { name: "Sophia L.", location: "Chicago, IL", action: "saved her result" },
  { name: "Ava P.", location: "San Diego, CA", action: "just uploaded a selfie" },
  { name: "Isabella W.", location: "Denver, CO", action: "just visualized her lip flip" },
  { name: "Mia C.", location: "Seattle, WA", action: "saved her result" },
  { name: "Dr. Kim N.", location: "Beverly Hills, CA", action: "recommended to a patient" },
  { name: "Charlotte B.", location: "Nashville, TN", action: "just visualized her lip flip" },
];

export const ActivityToast: React.FC = () => {
  const [currentActivity, setCurrentActivity] = useState<typeof ACTIVITIES[0] | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let activityIndex = 0;

    const showToast = () => {
      const activity = ACTIVITIES[activityIndex % ACTIVITIES.length];
      setCurrentActivity(activity);
      setVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setVisible(false);
      }, 4000);

      activityIndex++;
    };

    // First toast after 8 seconds
    const initialTimeout = setTimeout(showToast, 8000);

    // Then every 15-25 seconds
    const interval = setInterval(showToast, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!currentActivity) return null;

  return (
    <div
      className={`
        fixed bottom-20 md:bottom-6 left-4 z-40 max-w-xs
        transition-all duration-500 ease-out
        ${visible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
      `}
    >
      <div className="bg-[#111318]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-2xl shadow-black/50 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center shrink-0">
          <Sparkles size={14} className="text-pink-400" />
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs font-medium truncate">
            {currentActivity.name} <span className="text-slate-400 font-normal">{currentActivity.action}</span>
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">{currentActivity.location} · just now</p>
        </div>
      </div>
    </div>
  );
};
