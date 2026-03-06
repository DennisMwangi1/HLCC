export function WhoWeAre() {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-20 items-center">
                {/* Text Content */}
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-heading text-black mb-10 leading-tight">
                        Our Essence
                    </h2>

                    <div className="space-y-6 text-black/70 text-lg font-light leading-relaxed">
                        <p>
                            Founded in 2016 as <span className="font-medium text-black">Elite HR Solutions Ltd</span>, HLCC has evolved into
                            <span className="font-medium text-black italic"> Human-Centered Leadership & Culture Consulting Ltd</span>.
                            We specialize in helping organizations across Africa and the Middle East align their people with their purpose.
                        </p>

                        <p>
                            We believe culture runs the show. Every strategy succeeds or fails because of the human element behind it.
                            We help leaders build workplaces where belonging isn't just a word, but a driver of performance.
                        </p>

                        <p>
                            With a blend of global expertise and deep local insight, we craft organizational cultures that are resilient, high-performing, and unmistakably human.
                        </p>
                    </div>

                    <div className="mt-12">
                        <a
                            href="/about"
                            className="group inline-flex items-center text-black font-semibold text-sm uppercase tracking-widest border-b border-black/10 pb-2 hover:border-[#D4AF37] transition-all duration-300"
                        >
                            The Journey Behind HLCC
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Visual Side */}
                <div className="relative group">
                    <div className="absolute -inset-4 bg-[#D4AF37]/5 rounded-none scale-95 group-hover:scale-100 transition-transform duration-700 -z-10" />
                    <div
                        className="w-full h-[600px] rounded-none overflow-hidden transition-all duration-700"
                        style={{
                            backgroundImage: 'url("/assets/img/our_essence_new.png")',
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
