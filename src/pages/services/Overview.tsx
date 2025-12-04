"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { services } from "../../content/services";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { pageSEO } from "@/lib/seo";
import { OrganizationSchema, BreadcrumbSchema } from "@/components/StructuredData";

export default function ServicesOverview() {
  useSEO(pageSEO.services);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ];

  return (
    <>
      <OrganizationSchema />
      <BreadcrumbSchema items={breadcrumbs} />
      <main className="pb-16">
        {/* Intro */}
        <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />
          <div className="container relative mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-semibold text-[var(--navy-dark)] mb-4">
              Unlocking Human Potential.
              <span className="block mt-2 bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent">
                Building Cultures that Thrive.
              </span>
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              HLCC bridges leadership, culture, and HR strategy helping you design workplaces where people
              feel seen, valued, and inspired to perform at their best.
            </p>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-r from-[var(--navy-dark)] to-[var(--navy-medium)] text-white text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Workplaces do not transform by accident.
                <span className="block mt-1">Let’s make yours intentional.</span>
              </h2>
              <Button asChild size="lg" className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90">
                <a href="/contact">Book a Consultation</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function ServiceCard({ service: s, index: i }: { service: typeof services[0]; index: number; }) {
  const navigate = useNavigate();
  const [accordionValue, setAccordionValue] = useState<string>("");

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on accordion or its trigger
    const target = e.target as HTMLElement;
    if (target.closest('[data-slot="accordion"]') || target.closest('[data-slot="accordion-trigger"]')) {
      return;
    }
    navigate(`/services/${s.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      viewport={{ once: true }}
    >
      <Card
        onClick={handleCardClick}
        className={`flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-gradient-to-br ${i % 2 === 0 ? "from-white to-slate-50" : "from-slate-50 to-white"
          } hover:shadow-lg hover:border-[var(--gold-deep)] transition-all duration-300 cursor-pointer group`}
      >
        <div>
          <CardHeader className="flex items-center gap-4 mb-4">
            <div className="p-[1px] rounded-2xl bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)]">
              <div className="w-20 h-20 rounded-2xl bg-white overflow-hidden flex items-center justify-center">
                <img
                  src={s.heroImage ?? '/assets/img/wanjiru.jpg'}
                  alt={`${s.title} image`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-[var(--navy-dark)] group-hover:text-[var(--blue-accent)] transition-colors">
                {s.title}
              </CardTitle>
              <p className="text-[var(--gold-deep)] italic text-sm mt-1">{s.tagline}</p>
            </div>
          </CardHeader>

          <CardContent className="pb-0">
            <CardDescription className="text-base text-gray-700 leading-relaxed mb-4">
              {s.description}
            </CardDescription>

            {s.focusAreas?.length > 0 && (
              <div onClick={(e) => e.stopPropagation()}>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  value={accordionValue}
                  onValueChange={setAccordionValue}
                >
                  <AccordionItem value="focus-areas">
                    <AccordionTrigger className="text-[var(--navy-dark)] hover:underline text-sm">
                      View Focus Areas
                    </AccordionTrigger>
                    <AccordionContent className="pb-0">
                      <ul className="space-y-2 pl-5 mt-3 text-gray-700 text-[15px] leading-relaxed">
                        {s.focusAreas.map((item, idx) => (
                          <li
                            key={idx}
                            className="relative before:content-['•'] before:absolute before:-left-4 before:text-[var(--gold-deep)]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </CardContent>
        </div>

        <div className="mt-auto pt-4">
          <p className="italic text-gray-800 text-sm mb-4">Outcome: {s.outcome}</p>
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-[var(--blue-accent)] hover:text-[var(--blue-accent)] hover:bg-transparent p-0 h-auto group/btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/services/${s.slug}`);
              }}
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
