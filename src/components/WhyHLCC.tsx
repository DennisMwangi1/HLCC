import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export function WhyHLCC() {
    const differentiators = [
        "Culture-first approach — aligning people and strategy for measurable growth.",
        "Global expertise with African insight , blending world class tools with deep local understanding.\n",
        "Personal and agile , always relationship driven, never bureaucratic.",
        "Evidence based practice , grounded in behavioral science and human insight.",
        "End to end partnership , from diagnostics to leadership, coaching, and HR systems.",
        "Transformation that lasts , sustained through values, rituals, and daily behaviors.",
    ];

    return (
        <section
            id="why-hlcc"
            className="py-20 bg-gradient-to-br from-[var(--navy-dark)] to-[var(--navy-medium)] text-white relative overflow-hidden"
        >
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />

            <div className="container relative mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Side */}
                    <div>
                        <div className="inline-block px-4 py-1 bg-[var(--gold-accent)]/20 rounded-full text-sm text-[var(--gold-accent)] mb-4">
                            Why HLCC
                        </div>

                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                            Big Enough to Compete.
                            <span className="block mt-2 bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent">
                                Personal Enough to Care.
                            </span>
                        </h2>

                        <p className="text-lg text-gray-300 mb-8">
                            HLCC helps organizations shape cultures where people thrive and
                            strategy comes alive. We combine the scale and discipline of global firms
                            with the empathy, agility, and cultural intelligence that local
                            contexts demand.
                        </p>

                        {/* What Sets Us Apart */}
                        <h3 className="text-xl font-semibold mb-4">What Sets Us Apart</h3>
                        <div className="grid sm:grid-cols-1 gap-4 mb-10">
                            {differentiators.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] flex items-center justify-center mt-0.5">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-gray-200">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90"
                        >
                            Book a Consultation
                        </Button>
                    </div>

                    {/* Visual Side */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-accent)] to-[var(--blue-accent)] rounded-2xl blur-2xl opacity-30" />
                        <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 max-w-md mx-auto">
                            <ImageWithFallback
                                src="/assets/img/connections.png"
                                alt="HLCC Culture Collaboration"
                                className="w-full h-full object-center rounded-xl shadow-xl"
                            />

                            {/* Floating Info Cards */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
                                <div className="text-sm text-gray-900 mb-1">Client Retention</div>
                                <div className="text-2xl bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] bg-clip-text text-transparent">
                                    97%
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
                                <div className="text-sm text-gray-900 mb-1">Projects Delivered</div>
                                <div className="text-2xl bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] bg-clip-text text-transparent">
                                    200+
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
