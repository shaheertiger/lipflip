'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, AlertCircle, Info, CheckCircle2, DollarSign, Share2, ShieldCheck, ChevronRight, HelpCircle, User, Activity } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';

export default function LipFlipVsFiller() {
    return (
        <div className="relative min-h-screen text-slate-200 font-sans flex flex-col overflow-x-hidden pt-20">
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[128px] animate-pulse delay-1000" />
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
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/10 text-[10px] font-bold tracking-wider uppercase text-pink-300 mb-6 font-mono shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                        <Activity size={12} className="text-pink-400" />
                        Procedure Comparison Guide
                    </div>
                    <h1 className="text-4xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] mb-8">
                        What's the difference between <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-pink-500">
                            Lip Flip and Lip Filler?
                        </span>
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-10 justify-center md:justify-start">
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-pink-500" />
                            <span>By Aesthetic Science Team</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            <span>Medically Reviewed</span>
                        </div>
                    </div>

                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed italic border-l-4 border-pink-600/40 pl-8 md:pl-10 max-w-3xl">
                        "One creates volume using hyaluronic acid; the other reveals shape by relaxing muscles. Knowing the difference guarantees you won't leave the medspa disappointed."
                    </p>
                </header>

                <div className="prose prose-invert max-w-none space-y-16">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-serif text-white">The Great Debate: Addition vs. Relaxation</h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            When patients ask <strong>"what is a lip flip vs fillers"</strong>, the simplest analogy is this: Filler is like stuffing a pillow, while a lip flip is like removing a tight stitch that was holding the fabric down.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed pt-2">
                            If you’re trying to decide between the two, you need to understand both the <strong>mechanics</strong> and the <strong>aesthetic outcome</strong> of each procedure. Not sure which one is right for you? Our <Link href="/" className="text-pink-400 hover:text-pink-300 underline underline-offset-4 decoration-pink-500/30 transition-all font-medium">AI Lip Flip Visualizer</Link> can help you determine if "relaxing" the muscle gives you enough of a pout before you commit to volume.
                        </p>
                    </section>

                    {/* Deep Dive Tables */}
                    <section className="space-y-10">
                        <h2 className="text-3xl font-serif text-white flex items-center gap-3">
                            <ShieldCheck className="text-pink-500" size={28} />
                            The Medical Mechanics
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-pink-500/20 transition-all shadow-xl">
                                <h4 className="text-2xl font-serif text-pink-400 mb-4 border-b border-white/10 pb-4">The Lip Flip</h4>
                                <ul className="space-y-4 text-slate-300 font-light">
                                    <li><strong>The Product:</strong> Neurotoxin (Botox Cosmetic, Dysport, Xeomin).</li>
                                    <li><strong>The Mechanism:</strong> Blocking chemical signals from the nerve to the orbicularis oris muscle, stopping contraction.</li>
                                    <li><strong>The Effect:</strong> The upper lip gently uncurls outward, showing more of the pink vermilion border.</li>
                                    <li><strong>The Best Candidate:</strong> "Gummy smiles" or lips that disappear when laughing.</li>
                                </ul>
                            </div>

                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-emerald-500/20 transition-all shadow-xl">
                                <h4 className="text-2xl font-serif text-emerald-400 mb-4 border-b border-white/10 pb-4">Dermal Filler</h4>
                                <ul className="space-y-4 text-slate-300 font-light">
                                    <li><strong>The Product:</strong> Hyaluronic Acid Gel (Juvederm, Restylane, Kysse).</li>
                                    <li><strong>The Mechanism:</strong> Physically placing a cross-linked gel substance under the mucosal layer to add volume.</li>
                                    <li><strong>The Effect:</strong> Increased physical size, hydration, and definition of the lips.</li>
                                    <li><strong>The Best Candidate:</strong> Naturally thin lips, asymmetrical lips, or aging lips losing structural volume.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Interlinking Timeline */}
                    <section className="space-y-6 bg-pink-500/5 p-8 rounded-3xl border border-pink-500/20">
                        <h3 className="text-2xl font-serif text-white flex items-center gap-2">
                            <Activity size={24} className="text-pink-400" />
                            The Timing: Instant vs. Delayed
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            If you get filler, you will leave the clinic with bigger lips immediately (though expect swelling). If you get a Lip Flip, you will leave looking exactly the same.
                        </p>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Neurotoxins require time to bind to nerve receptors. If you have an event this weekend, a Lip Flip won't work in time. For a day-by-day breakdown of the 'kicking in' phase, read our comprehensive <Link href="/blog/how-long-does-it-take-for-lip-flip-to-work" className="text-pink-400 hover:text-pink-300 underline underline-offset-4 decoration-pink-500/50 transition-all font-semibold italic flex items-center gap-1 inline-flex">Lip Flip Timeline Guide <ChevronRight size={16} /></Link>.
                        </p>
                    </section>

                    {/* Cost Comparison */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-serif text-white flex items-center gap-3">
                            <DollarSign size={28} className="text-emerald-400" />
                            The Financial Reality
                        </h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Because neurotoxin requires so few units (usually 2-4 units of Botox, or 5-10 units of Dysport), it is incredibly affordable compared to a full syringe of filler.
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 mt-6">
                            <div className="flex-1 p-6 bg-slate-900 border border-white/5 rounded-2xl">
                                <h4 className="text-white font-bold opacity-75 uppercase tracking-widest text-xs mb-2">Lip Flip Cost</h4>
                                <div className="text-3xl font-mono text-pink-400 font-bold">$80 - $200</div>
                                <p className="text-xs text-slate-500 mt-2">Every 3-4 months.</p>
                            </div>
                            <div className="flex-1 p-6 bg-slate-900 border border-white/5 rounded-2xl">
                                <h4 className="text-white font-bold opacity-75 uppercase tracking-widest text-xs mb-2">Lip Filler Cost</h4>
                                <div className="text-3xl font-mono text-emerald-400 font-bold">$600 - $1,200</div>
                                <p className="text-xs text-slate-500 mt-2">Every 8-12 months.</p>
                            </div>
                        </div>
                    </section>

                    {/* Post-Treatment CTA */}
                    <section className="relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/30 via-rose-600/30 to-purple-600/30 blur-3xl opacity-50 transition-opacity group-hover:opacity-75" />
                        <div className="relative z-10 bg-black/60 backdrop-blur-3xl border border-pink-500/20 rounded-[3rem] p-10 text-center space-y-8 shadow-2xl">
                            <h2 className="text-4xl font-serif text-white tracking-tight">
                                Stop debating. <span className="text-pink-400">Visualize it.</span>
                            </h2>
                            <p className="text-slate-300 text-lg max-w-xl mx-auto font-light">
                                Before you choose a procedure, seeing the muscle-relaxing effect on your own face changes everything.
                            </p>
                            <div className="pt-4">
                                <Link href="/" className="inline-flex px-10 py-5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xl rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none">
                                    Try The Visualizer Engine
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Maintenance Segment */}
                    <section className="space-y-6">
                        <h2 className="text-3xl font-serif text-white">Maintenance and Aftercare</h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            Because they involve completely different compounds, the rules for aftercare differ wildly. You can massage filler (if instructed by your injector) to remove lumps. **You must never massage a Lip Flip.**
                        </p>
                        <div className="p-6 border border-rose-500/20 bg-rose-500/5 rounded-2xl">
                            <AlertCircle className="text-rose-400 mb-3" size={24} />
                            <h4 className="text-xl font-bold text-white mb-2">The Golden Rules</h4>
                            <p className="text-slate-300 font-light leading-relaxed mb-4">
                                Rubbing your lips after neurotoxin can force the product into muscles responsible for speech, leading to temporary slurring or a crooked smile. Learn exactly what to avoid in our <Link href="/blog/lip-flip-aftercare-guide-what-not-to-do" className="text-rose-400 hover:text-rose-300 font-bold underline transition-colors">Complete Lip Flip Aftercare Guide</Link>.
                            </p>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}
