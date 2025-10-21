export function WhoWeAre() {
    return (
        <section className="py-20 bg-white border-b">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-6">
                        Who We Are
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        Founded in 2016 as <strong>Elite HR Solutions Ltd</strong>, HLCC has evolved into
                        <strong> Human-Centered Leadership & Culture Consulting Ltd</strong> Helping organizations across Africa and beyond align people, culture, and leadership.

                    </p>

                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        We believe culture runs the show, and every strategy succeeds or fails because of it.
                        That’s why we help leaders build workplaces where belonging fuels performance and values become lived behavior.
                    </p>

                    <p className="text-gray-700 text-lg leading-relaxed">
                        With a blend of global expertise and deep African insight, we craft cultures that are resilient, high-performing, and unmistakably human.
                    </p>

                    <div className="mt-8">
                        <a
                            href="/about"
                            className="inline-flex items-center text-[var(--navy-dark)] hover:text-[var(--gold-deep)] font-medium text-lg"
                        >
                            Learn more about HLCC
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-2 h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="relative">
                    <div
                        className="w-full h-80 rounded-2xl overflow-hidden shadow-lg"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--gold-accent)]/10 to-transparent rounded-2xl" />
                </div>
            </div>
        </section>
    );
}
