import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

export function CaseStudies() {
    const caseStudies = [
        {
            image:
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            title: "Energy Sector: Culture Transformation Across 5 Countries",
            description:
                "HLCC partnered with a leading African energy company to redefine its purpose, values, and behaviors. Within 12 months, engagement scores rose by 42%, and leadership alignment across regions was restored.",
            results: "42% engagement lift",
            category: "Culture Transformation",
        },
        {
            image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            title: "Financial Services: Building Emotionally Intelligent Leaders",
            description:
                "Through a blended learning and coaching journey, HLCC equipped 300 senior managers with tools for leading with empathy and accountability — improving collaboration and customer satisfaction.",
            results: "300 leaders trained",
            category: "Leadership Development",
        },
        {
            image:
                "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
            title: "Healthcare Network: Strengthening HR Foundations",
            description:
                "We supported a healthcare organization to design HR systems and structures aligned to growth and compliance. HR efficiency improved by 35%, and role clarity across departments was achieved.",
            results: "35% efficiency gain",
            category: "HR Advisory",
        },
    ];

    return (
        <section id="case-studies" className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl text-gray-900 mb-4 font-semibold">
                        Success Stories
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Real-world examples of how HLCC helps organizations align culture,
                        strengthen leadership, and build people-centered systems.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {caseStudies.map((study, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-[var(--blue-accent)]"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <ImageWithFallback
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs text-gray-900">
                                        {study.category}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 right-4">
                                    <span className="px-3 py-1 bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] rounded-full text-xs text-white">
                                        {study.results}
                                    </span>
                                </div>
                            </div>

                            <CardHeader>
                                <CardTitle className="text-xl group-hover:text-[var(--blue-accent)] transition-colors">
                                    {study.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <CardDescription className="text-base text-gray-600 mb-4">
                                    {study.description}
                                </CardDescription>
                                <Button
                                    variant="ghost"
                                    className="text-[var(--blue-accent)] hover:text-[var(--gold-accent)] p-0 h-auto"
                                >
                                    Read Full Story
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-gray-300 hover:border-[var(--blue-accent)] hover:text-[var(--blue-accent)]"
                    >
                        View All Success Stories
                    </Button>
                </div>
            </div>
        </section>
    );
}
