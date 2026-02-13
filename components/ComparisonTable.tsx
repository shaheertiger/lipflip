import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

export const ComparisonTable: React.FC<{ onScrollToUploader: () => void }> = ({ onScrollToUploader }) => {
  const features = [
    { feature: "See results before committing", lipflip: true, consultation: false, filters: false },
    { feature: "Realistic, anatomy-aware output", lipflip: true, consultation: true, filters: false },
    { feature: "100% private & instant", lipflip: true, consultation: false, filters: true },
    { feature: "No appointment needed", lipflip: true, consultation: false, filters: true },
    { feature: "Clinically calibrated AI", lipflip: true, consultation: true, filters: false },
    { feature: "Under $1", lipflip: true, consultation: false, filters: true },
  ];

  const IconYes = () => <Check size={16} className="text-emerald-400" />;
  const IconNo = () => <X size={16} className="text-slate-600" />;

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-2xl md:text-4xl font-serif text-white">Why choose us?</h2>
        <p className="text-slate-400 font-light text-sm md:text-base">See how we compare to traditional options.</p>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs text-slate-500 uppercase tracking-wider font-medium pb-4 pr-4 w-2/5"></th>
              <th className="text-center pb-4 px-3">
                <div className="inline-flex flex-col items-center gap-1 px-3 py-2 bg-pink-500/10 border border-pink-500/20 rounded-xl">
                  <span className="text-pink-300 text-xs font-bold uppercase tracking-wider">LipFlip AI</span>
                </div>
              </th>
              <th className="text-center pb-4 px-3">
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Consultation</span>
              </th>
              <th className="text-center pb-4 px-3">
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Filters</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((row, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-4 pr-4 text-sm text-slate-300 font-light">{row.feature}</td>
                <td className="py-4 text-center"><div className="flex justify-center"><IconYes /></div></td>
                <td className="py-4 text-center"><div className="flex justify-center">{row.consultation ? <IconYes /> : <IconNo />}</div></td>
                <td className="py-4 text-center"><div className="flex justify-center">{row.filters ? <IconYes /> : <IconNo />}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onScrollToUploader}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/30 rounded-full text-white text-sm font-medium transition-all"
        >
          Try it yourself
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
