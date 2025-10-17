import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Testimonials() {
    const testimonials = [
        {
            quote:
                "HLCC helped us reimagine leadership across our regional offices. The coaching process built confidence, empathy, and accountability at every level.",
            author: "Angela M.",
            role: "Regional HR Director, Pan-African Financial Group",
            rating: 5,
            initials: "AM",
        },
        {
            quote:
                "Their culture-shaping work was eye-opening. For the first time, our values are lived daily — not just printed on the wall.",
            author: "David K.",
            role: "Chief Executive Officer, Energy Solutions Africa",
            rating: 5,
            initials: "DK",
        },
        {
            quote:
                "The leadership labs challenged our senior managers to think differently. Engagement scores have risen sharply since partnering with HLCC.",
            author: "Grace T.",
            role: "Group Learning Manager, FMCG East Africa",
            rating: 5,
            initials: "GT",
        },
        {
            quote:
                "We outsourced our HR operations to HLCC and gained more than compliance — we gained clarity, structure, and a stronger sense of culture.",
            author: "Samuel N.",
            role: "People & Culture Lead, Tech Venture Kenya",
            rating: 5,
            initials: "SN",
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-[var(--navy-medium)] to-[var(--gold-muted)] relative overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />

            <div className="container relative mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl text-white font-semibold mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Voices from leaders and organizations that have partnered with HLCC
                        to shape culture, grow people, and sustain performance.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all"
                        >
                            <CardContent className="p-6">
                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-[var(--gold-accent)] text-[var(--gold-accent)]"
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-gray-200 mb-6 leading-relaxed">
                                    “{testimonial.quote}”
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12 bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)]">
                                        <AvatarFallback className="bg-transparent text-white">
                                            {testimonial.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-white font-medium">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
