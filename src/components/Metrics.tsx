export function ImpactAtScale() {
    const metrics = [
        {
            value: "50+",
            label: "Organizations Transformed",
            description:
                "Across Africa and beyond — building cultures that align people, purpose, and performance.",
        },
        {
            value: "10,000+",
            label: "Leaders Developed",
            description:
                "Equipped with emotional intelligence, agility, and purpose-driven leadership skills.",
        },
        {
            value: "30,000+",
            label: "Employees Engaged",
            description:
                "Empowered through culture design, coaching, and HR transformation initiatives.",
        },
        {
            value: "97%",
            label: "Client Retention",
            description:
                "Long-term partnerships built on trust, measurable impact, and shared growth.",
        },
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />

            <div className="container relative mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl text-[var(--navy-dark)] font-semibold mb-4">
                        Impact at Scale
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        Every engagement with HLCC drives tangible, people-centered
                        transformation — cultures strengthened, leaders elevated, and
                        organizations redefined.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-gray-200 hover:border-[var(--gold-deep)] transition-all hover:shadow-lg group"
                        >
                            <div className="text-4xl md:text-5xl bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform inline-block">
                                {metric.value}
                            </div>
                            <div className="text-lg text-[var(--navy-dark)] mb-2 font-medium">
                                {metric.label}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {metric.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
