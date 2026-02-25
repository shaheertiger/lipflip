'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, AlertCircle, Info, CheckCircle2, DollarSign, Share2, ShieldCheck, ChevronRight, HelpCircle, User, AlertTriangle } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';

export default function LipFlipAftercare() {
    return (
        <div className="relative min-h-screen text-slate-200 font-sans flex flex-col overflow-x-hidden pt-20">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[128px] animate-pulse delay-1000" />
            </div>

            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
                    <Link href="/" className="scale-90 md:scale-100 origin-left">
                        <Logo />
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="px-5 py-2 overflow-hidden relative group bg-white/5 rounded-full transition-all border border-white/10">
                            <span className="relative z-10 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Back to Visualizer</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-20 w-full">
                <div className="mb-8 flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Link href="/" className="hover:text-pink-400 transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-slate-300 font-semibold tracking-wide">Guides</span>
                </div>

                <header className="mb-16 animate-fade-in text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/10 text-[10px] font-bold tracking-wider uppercase text-rose-300 mb-6 font-mono shadow-[0_0_15px_rgba(244,63,94,0.1)]">
                        <AlertTriangle size={12} className="text-rose-400" />
                        Crucial Aftercare
                    </div>
                    <h1 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] mb-8">
                        The Lip Flip Survival Guide: <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-red-400 to-rose-500">
                            What NOT To Do
                        </span>
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-10 justify-center md:justify-start">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-rose-500" />
                            <span>By Aesthetic Science Team</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-rose-500" />
                            <span>Safety & Protocol</span>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed italic border-l-4 border-rose-600/40 pl-8 md:pl-10 max-w-3xl">
                        "Neurotoxins are liquid art. Once injected, they need time to bind. If you move them before they set, you risk unintended consequences. Patience isn't just a virtue here—it's safety."
                    </p>
                </header>

                <div className="prose prose-invert max-w-none space-y-16">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-serif text-white">The Danger of Migration</h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            You just got injected, and you're feeling great. But what you do in the next 24 hours determines whether you get the perfect pout, or a crooked smile. The key to aftercare is understanding <strong>migration</strong>.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            When Botox or Dysport is placed into the *orbicularis oris* (the mouth muscle), it needs a few hours to bind to the nerve receptors. If you rub your lips, you physically push the liquid toxin into surrounding muscles—like the *depressor anguli oris*—which can cause an asymmetrical smile or make talking difficult.
                        </p>
                    </section>

                    {/* Golden Rules Checklist */}
                    <section className="bg-slate-900 border border-white/5 rounded-[2rem] p-8 md:p-12 space-y-10 shadow-2xl">
                        <h3 className="text-3xl font-serif text-white text-center">The Next 24 Hours</h3>
                        <ul className="grid md:grid-cols-2 gap-8 text-lg font-light text-slate-300">
                            <li className="flex items-start gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex-shrink-0 flex items-center justify-center text-rose-500 transition-colors group-hover:bg-rose-500 group-hover:text-white mt-1 border border-rose-500/30">
                                    <span className="font-bold text-sm">1</span>
                                </div>
                                <div>
                                    <strong className="block text-white mb-2 font-medium">No Rubbing or Massaging</strong>
                                    Do not touch the injection points. Do not press your lips together tightly.
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex-shrink-0 flex items-center justify-center text-rose-500 transition-colors group-hover:bg-rose-500 group-hover:text-white mt-1 border border-rose-500/30">
                                    <span className="font-bold text-sm">2</span>
                                </div>
                                <div>
                                    <strong className="block text-white mb-2 font-medium">Stay Upright</strong>
                                    Do not lie down flat on your bed or couch for at least 4-6 hours to prevent settling issues.
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex-shrink-0 flex items-center justify-center text-rose-500 transition-colors group-hover:bg-rose-500 group-hover:text-white mt-1 border border-rose-500/30">
                                    <span className="font-bold text-sm">3</span>
                                </div>
                                <div>
                                    <strong className="block text-white mb-2 font-medium">No Straws</strong>
                                    The suction forces the muscle to contract extremely hard right after injection.
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex-shrink-0 flex items-center justify-center text-rose-500 transition-colors group-hover:bg-rose-500 group-hover:text-white mt-1 border border-rose-500/30">
                                    <span className="font-bold text-sm">4</span>
                                </div>
                                <div>
                                    <strong className="block text-white mb-2 font-medium">Skip the Gym</strong>
                                    Heavy sweating and increased blood flow can "flush" the toxin before it binds.
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* Direct FAQ Answers */}
                    <section className="space-y-8">
                        <h2 className="text-3xl font-serif text-white flex items-center gap-3">
                            <HelpCircle size={28} className="text-pink-400" />
                            Immediate Post-Care Answers
                        </h2>

                        <div className="p-8 border-l-4 border-rose-500 bg-white/5 rounded-2xl shadow-lg space-y-4 transition-all hover:bg-white/10">
                            <h4 className="text-2xl font-bold text-white flex gap-2">Can I eat after a lip flip?</h4>
                            <p className="text-slate-300 text-lg leading-relaxed font-light">
                                Yes, you can eat immediately. However, you must be incredibly gentle. Avoid foods that require massive bites (like a huge burger) or intense chewing. Instead, opt for easy-to-eat foods like sushi, small bites, or yogurt for the first 12 hours. Do not vigorously wipe your mouth with a napkin.
                            </p>
                        </div>

                        <div className="p-8 border-l-4 border-purple-500 bg-white/5 rounded-2xl shadow-lg space-y-4 transition-all hover:bg-white/10 mt-6 md:mt-8">
                            <h4 className="text-2xl font-bold text-white flex gap-2">Can you kiss after lip flip?</h4>
                            <p className="text-slate-300 text-lg leading-relaxed font-light">
                                Puckering is the sworn enemy of a fresh lip flip. A light peck on the cheek won't hurt, but any intense pressure or forceful muscle puckering in the first 24 hours is highly risky. Wait until tomorrow for the romance.
                            </p>
                        </div>

                        <div className="p-8 border-l-4 border-emerald-500 bg-white/5 rounded-2xl shadow-lg space-y-4 transition-all hover:bg-white/10 mt-6 md:mt-8">
                            <h4 className="text-2xl font-bold text-white flex gap-2">How long until the results actually show?</h4>
                            <p className="text-slate-300 text-lg leading-relaxed font-light">
                                Do not look in the mirror after 6 hours and expect a change. The binding process takes time! In fact, most people don't see anything for a few days. For a detailed guide on what to expect, read our <Link href="/blog/how-long-does-it-take-for-lip-flip-to-work" className="text-emerald-400 hover:text-emerald-300 font-bold underline transition-colors">Complete Timeline Guide</Link> which explains exactly when your new smile will appear.
                            </p>
                        </div>

                    </section>

                    <section className="relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/30 via-rose-600/30 to-purple-600/30 blur-3xl opacity-50 transition-opacity group-hover:opacity-75" />
                        <div className="relative z-10 bg-black/60 backdrop-blur-3xl border border-pink-500/20 rounded-[3rem] p-10 text-center space-y-8 shadow-2xl">
                            <h2 className="text-4xl font-serif text-white tracking-tight">
                                Curious about adding volume instead?
                            </h2>
                            <p className="text-slate-300 text-lg max-w-xl mx-auto font-light">
                                Sometimes, a flip isn't enough, and filler is a better choice. Discover which procedure suits your anatomy by reading our <Link href="/blog/lip-flip-vs-filler" className="text-pink-400 font-bold hover:text-pink-300 underline">Filler versus Flip Breakdown</Link>.
                            </p>
                            <br />
                            <p className="text-slate-400 text-sm italic">Or, <Link href="/" className="text-pink-400 hover:text-pink-300 transition-colors uppercase font-bold text-xs tracking-widest border border-pink-500/50 rounded-full px-3 py-1 bg-pink-500/10">Try the AI Visualizer</Link> on your own photo.</p>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}
