export function ImpactAtScale() {
    const metrics = [
        {
            value: "15+",
            label: "Organizations",
            description:
                "Across Africa and the Middle East—building cultures that align people with performance.",
        },
        {
            value: "100+",
            label: "Leaders",
            description:
                "Equipped with emotional intelligence, agility, and purpose-driven leadership.",
        },
        {
            value: "1000+",
            label: "Employees",
            description:
                "Impacted through intentional culture design and transformative HR initiatives.",
        },
    ];

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container relative mx-auto px-4 md:px-6">
                <div className="text-center mb-24">
                    <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-[10px] font-semibold mb-6">
                        Our Track Record
                    </p>
                    <h2 className="text-4xl md:text-5xl text-black font-heading font-light mb-8">
                        Impact at <span className="italic">Scale</span>
                    </h2>
                    <p className="text-xl text-black/50 max-w-2xl mx-auto font-light leading-relaxed">
                        Every HLCC engagement drives tangible, human-centered transformation across the continent.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="text-center group"
                        >
                            <div className="text-5xl md:text-6xl font-heading text-black mb-6 group-hover:text-[#D4AF37] transition-colors duration-500">
                                {metric.value}
                            </div>
                            <div className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4 font-semibold">
                                {metric.label}
                            </div>
                            <p className="text-black/50 text-sm font-light leading-relaxed">
                                {metric.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
