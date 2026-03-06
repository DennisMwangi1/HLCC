import { Star } from "lucide-react";

export function Testimonials() {
    const testimonials = [
        {
            quote:
                "HLCC helped us reimagine leadership across our regional offices. The coaching process built confidence, empathy, and accountability at every level.",
            author: "Angela M.",
            role: "Regional HR Director, Pan-African Financial Group",
            initials: "AM",
        },
        {
            quote:
                "Their culture-shaping work was eye-opening. For the first time, our values are lived daily — not just printed on the wall.",
            author: "David K.",
            role: "Chief Executive Officer, Energy Solutions Africa",
            initials: "DK",
        },
        {
            quote:
                "The leadership labs challenged our senior managers to think differently. Engagement scores have risen sharply since partnering with HLCC.",
            author: "Grace T.",
            role: "Group Learning Manager, FMCG East Africa",
            initials: "GT",
        },
        {
            quote:
                "We outsourced our HR operations to HLCC and gained more than compliance — we gained clarity, structure, and a stronger sense of culture.",
            author: "Samuel N.",
            role: "People & Culture Lead, Tech Venture Kenya",
            initials: "SN",
        },
    ];

    return (
        <section className="py-32 bg-[#050505] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.05] pointer-events-none" />

            <div className="container relative mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-24">
                    <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
                        Voices of Impact
                    </p>
                    <h2 className="text-4xl md:text-5xl font-heading font-light mb-8">
                        The Client <span className="italic">Perspective</span>
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="relative p-12 border border-white/5 bg-white/[0.02] flex flex-col group hover:border-[#D4AF37]/30 transition-all duration-700"
                        >
                            <Star className="h-4 w-4 text-[#D4AF37] mb-8" fill="#D4AF37" />

                            <p className="text-xl md:text-2xl font-heading font-light leading-relaxed text-white/80 mb-12 italic">
                                "{testimonial.quote}"
                            </p>

                            <div className="mt-auto flex items-center gap-5">
                                <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold tracking-widest text-[#D4AF37]">
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold uppercase tracking-widest text-white">
                                        {testimonial.author}
                                    </div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/50 mt-1">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
