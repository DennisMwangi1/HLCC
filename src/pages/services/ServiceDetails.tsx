"use client";

import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { serviceBySlug, } from "../../content/services";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";
import { ProcessTimeline } from "../../components/ui/ProcessTimeline";


interface FAQItemProps {
  question: string;
  answer: string;
}


const FAQItem = ({ question, answer }: FAQItemProps) => (
  <div className="border-b border-gray-200 pb-4 mb-4">
    <h4 className="font-medium text-[var(--navy-dark)] mb-1">{question}</h4>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default function ServiceDetails() {
  const { slug } = useParams<{ slug: string; }>();
  const service = useMemo(() => (slug ? serviceBySlug[slug] : undefined), [slug]);

  if (!service) {
    return (
      <main className="py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl text-[var(--navy-dark)] font-semibold mb-4">Service not found</h1>
          <p className="text-gray-600 mb-8">The service you are looking for does not exist.</p>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </main>
    );
  }

  const Icon = service.icon;

  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 text-white overflow-hidden">
        {service.heroImage ? (
          <div className="absolute inset-0">
            <ImageWithFallback
              src={service.heroImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[var(--navy-dark)]/80" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy-dark)] to-[var(--navy-medium)]" />
        )}

        <div className="relative container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-[2px] rounded-2xl bg-gradient-to-br from-[var(--blue-accent)] to-[var(--gold-accent)]">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center">
                  <Icon className="w-7 h-7 text-[var(--navy-dark)]" aria-hidden="true" />
                </div>
              </div>
              <span className="text-sm text-white/90">HLCC Services</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-3">{service.title}</h1>
            <p className="text-lg text-white/90 italic">{service.tagline}</p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--navy-dark)] mb-4">Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>
          </div>
          <Card className="shadow-sm border-slate-200 bg-gradient-to-br from-slate-50 to-white">
            <CardHeader>
              <CardTitle className="text-[var(--navy-dark)]">Outcomes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-gray-700 leading-relaxed">
                {service.outcome}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--navy-dark)] mb-4">Our Approach</h2>
            <p className="text-gray-600">We combine deep expertise with practical solutions to deliver measurable impact</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {service.focusAreas.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 hover:border-[var(--gold-deep)] transition-colors h-full group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--navy-dark)] mb-1">{item}</h3>
                      <p className="text-sm text-gray-600">Learn more about our approach to {item.toLowerCase()}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Methodology */}
          <div className="bg-slate-50 rounded-2xl p-8 mb-16">
            <h3 className="text-xl font-semibold text-[var(--navy-dark)] mb-6">Our Methodology</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {service.methodology.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-[var(--navy-dark)] mb-8 text-center">Our Process</h3>
            <div className="max-w-3xl mx-auto">
              <ProcessTimeline steps={service.process.map((p) => ({
                number: p.number,
                title: `${p.title} (${p.duration})`,
                description: p.description,
              }))} />
            </div>
          </div>

          {/* Case Study / Testimonial */}
          <div className="bg-gradient-to-br from-[var(--navy-dark)] to-[var(--navy-medium)] rounded-2xl p-8 text-white">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  {/*<Users className="w-5 h-5" />*/}
                </div>
                <span className="text-sm text-white/80">Success Story</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Transforming Leadership at {service.title.includes('Leadership') ? 'a Leading Tech Firm' : 'Enterprise Level'}</h3>
              <p className="text-white/90 mb-6">
                "Working with HLCC transformed our approach to {service.title.toLowerCase()}. Their expertise and hands-on support helped us achieve a 40% improvement in key performance metrics."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-white/70">Head of People, Acme Corp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--navy-dark)] mb-8 text-center">Frequently Asked Questions</h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {service.faq.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--navy-dark)] mb-4">Why Choose HLCC for {service.title.split('&')[0].trim()}</h2>
            <p className="text-gray-600">We bring together deep expertise, practical tools, and a commitment to your success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--blue-accent)]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[var(--blue-accent)]" />
              </div>
              <h3 className="font-medium text-[var(--navy-dark)] mb-2">Proven Expertise</h3>
              <p className="text-sm text-gray-600">15+ years of experience in organizational development and leadership</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--gold-accent)]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[var(--gold-accent)]" />
              </div>
              <h3 className="font-medium text-[var(--navy-dark)] mb-2">Custom Solutions</h3>
              <p className="text-sm text-gray-600">Tailored approaches that address your unique challenges and goals</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--blue-accent)]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[var(--blue-accent)]" />
              </div>
              <h3 className="font-medium text-[var(--navy-dark)] mb-2">Practical Tools</h3>
              <p className="text-sm text-gray-600">Actionable frameworks and resources for immediate application</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--gold-accent)]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[var(--gold-accent)]" />
              </div>
              <h3 className="font-medium text-[var(--navy-dark)] mb-2">Measurable Impact</h3>
              <p className="text-sm text-gray-600">Clear metrics and evaluation to track progress and ROI</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/*<section className="py-16 bg-gradient-to-br from-[var(--navy-dark)] to-[var(--navy-medium)] text-white relative overflow-hidden">*/}
      {/*  <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />*/}
      {/*  <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />*/}
      {/*  <div className="container relative mx-auto px-4 md:px-6">*/}
      {/*    <div className="max-w-3xl mx-auto text-center">*/}
      {/*      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Ready to transform your {service.title.toLowerCase().includes('leadership') ? 'leadership approach' : service.title.toLowerCase().includes('team') ? 'team dynamics' : 'organization'}?</h2>*/}
      {/*      <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">*/}
      {/*        Let's discuss how we can help you achieve your {service.title.toLowerCase().includes('culture') ? 'culture' : service.title.toLowerCase().includes('team') ? 'team' : 'organizational'} goals*/}
      {/*      </p>*/}
      {/*      */}
      {/*      <div className="flex flex-wrap justify-center gap-4">*/}
      {/*        <Button size="lg" className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90">*/}
      {/*          <a href="mailto:info@hlcc.africa">Book a Free Consultation</a>*/}
      {/*        </Button>*/}
      {/*        <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">*/}
      {/*          <Link to="/contact">Contact Our Team</Link>*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*      */}
      {/*      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/70">*/}
      {/*        <Clock className="w-4 h-4" />*/}
      {/*        <span>Schedule a 30-minute discovery call at your convenience</span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </main>
  );
}
