import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export function WhyHLCC() {
    const differentiators = [
        "Culture-first approach — aligning people and strategy for measurable growth.",
        "Global expertise with African insight, blending world-class tools with deep local understanding.",
        "Personal and agile, always relationship-driven, never bureaucratic.",
        "Evidence-based practice, grounded in behavioral science and human insight.",
        "End-to-end partnership, from diagnostics to leadership, coaching, and HR systems.",
        "Transformation that lasts, sustained through values, rituals, and daily behaviors.",
    ];

    return (
        <section
            id="why-hlcc"
            className="py-32 bg-[#050505] text-white relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.05] pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    {/* Text Side */}
                    <div>
                        <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
                            The HLCC Advantage
                        </p>

                        <h2 className="text-4xl md:text-5xl font-heading font-light mb-10 leading-tight">
                            Big Enough to Compete.
                            <span className="block italic text-[#D4AF37] mt-2">
                                Personal Enough to Care.
                            </span>
                        </h2>

                        <p className="text-lg text-white/50 mb-12 font-light leading-relaxed">
                            We combine the scale and discipline of global firms with the empathy, agility, and cultural intelligence that unique local contexts demand.
                        </p>

                        {/* What Sets Us Apart */}
                        <div className="space-y-8 mb-16">
                            {differentiators.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center mt-1 group-hover:border-[#D4AF37] transition-colors duration-300">
                                        <Check className="h-3 w-3 text-[#D4AF37]" strokeWidth={3} />
                                    </div>
                                    <span className="text-white/60 font-light group-hover:text-white transition-colors duration-300 leading-snug">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] transition-all duration-500 rounded-none px-10 py-7 text-sm uppercase tracking-widest font-semibold"
                        >
                            Elevate Your Team
                        </Button>
                    </div>

                    {/* Visual Side */}
                    <div className="relative">
                        <div className="absolute -inset-10 bg-[#D4AF37]/5 rounded-full blur-3xl opacity-50" />
                        <div className="relative aspect-square overflow-hidden grayscale-[0.5] hover:grayscale-0 transition-all duration-1000">
                            <img
                                src="/assets/img/connections.png"
                                alt="HLCC Culture Collaboration"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            {/* Sophisticated Overlay Info */}
                            <div className="absolute bottom-10 left-10 space-y-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1">Standard of Excellence</p>
                                    <p className="text-3xl font-heading">97% <span className="text-sm font-light italic">Retention</span></p>
                                </div>
                                <div className="pt-4 border-t border-white/10">
                                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1">Impact Delivered</p>
                                    <p className="text-3xl font-heading">200+ <span className="text-sm font-light italic">Engagements</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
