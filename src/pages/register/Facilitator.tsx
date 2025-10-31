"use client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Check, ArrowRight, Star } from "lucide-react";
import { DynamicForm } from "../../components/DynamicForm.tsx";
import { facilitatorFormSchema } from "../../lib/formSchemas.ts";

export default function RegisterFacilitator() {
  return (
    <main>
      <Hero />
      <WhyJoin />
      <Eligibility />
      <ApplicationForm />
      <Testimonials />
      <BottomCTA />
    </main>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string; }) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative py-24 md:py-32 text-white overflow-hidden">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/assets/img/facilitator.avif"
          alt="Facilitation in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[var(--navy-dark)]/85" />
      </div>
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">
            Empower Groups.
            <span className="block mt-1 bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent">
              Become an HLCC Facilitator.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Guide teams and organizations through transformative learning experiences across Africa and beyond.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90">
              <a href="#apply">Apply Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-black/10 hover:text-white bg-white/10">
              <Link to="/services/leadership-training">
                Learn About Our Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyJoin() {
  const bullets = [
    "Join a network of expert facilitators driving organizational transformation.",
    "Access cutting-edge facilitation tools, frameworks, and methodologies.",
    "Work with diverse clients across sectors, from startups to multinationals.",
    "Grow your practice through continuous learning and peer exchange.",
  ];

  return (
    <Section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-6">Why Join as a Facilitator</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              HLCC facilitators create engaging, impactful learning experiences that transform individuals and teams.
              We believe in the power of experiential learning to unlock potential and drive meaningful change.
            </p>
            <p>
              As an HLCC facilitator, you'll design and deliver programs that build leadership capacity,
              foster collaboration, and drive organizational effectiveness across Africa's dynamic business landscape.
            </p>
            <p>
              We're looking for passionate facilitators who can bring energy, expertise, and cultural
              intelligence to our client engagements.
            </p>
          </div>
        </div>

        <div>
          <Card className="border-2 hover:border-[var(--gold-deep)] transition-colors">
            <CardHeader>
              <CardTitle className="text-xl text-[var(--navy-dark)]">What You'll Gain</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)]">
                      <Check className="w-4 h-4 text-white" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Eligibility() {
  const mustHave = [
    "3+ years of experience facilitating workshops, trainings, or group processes",
    "Strong ability to engage and manage diverse groups effectively",
    "Experience with adult learning principles and experiential methodologies",
    "Cultural sensitivity and ability to work across different sectors and contexts"
  ];

  const niceToHave = [
    "Certification in facilitation methodologies (e.g., IAF CPF, ToT, etc.)",
    "Experience with virtual facilitation platforms and digital tools",
    "Background in leadership development, OD, or related fields",
    "Experience working in multiple African markets"
  ];

  return (
    <Section className="py-20">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-6">What We Look For</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-[var(--navy-dark)] mb-3">Core Requirements</h3>
              <ul className="space-y-2 text-gray-700">
                {mustHave.map((item, i) => (
                  <li key={i} className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-[var(--gold-deep)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[var(--navy-dark)] mb-3">Preferred Qualifications</h3>
              <ul className="space-y-2 text-gray-700">
                {niceToHave.map((item, i) => (
                  <li key={i} className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-[var(--gold-deep)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-slate-50 to-white border-2">
          <CardHeader>
            <CardTitle className="text-[var(--navy-dark)]">Emerging Facilitators</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-700">
              If you're newer to facilitation but have strong potential, we'd still love to hear from you.
              Highlight your passion for group learning and any relevant experience you have in training,
              teaching, or leading group processes.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

function ApplicationForm() {
  return (
    <Section className="py-20 bg-[var(--navy-dark)] text-white" >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 id="apply" className="text-3xl md:text-4xl font-semibold mb-4">
            Facilitator Application
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're excited to learn about your facilitation experience and how you can contribute to our programs.
            Your information is secure and confidential.
          </p>
        </div>

        <DynamicForm schema={facilitatorFormSchema} />
      </div>
    </Section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "Facilitating with HLCC has been transformative for my practice. The level of trust and support is unmatched.",
      author: "Amina K., Leadership Facilitator",
      role: "Nairobi, Kenya"
    },
    {
      quote: "The opportunity to work with diverse organizations across the continent has been incredibly rewarding.",
      author: "David M., OD Consultant",
      role: "Lagos, Nigeria"
    },
    {
      quote: "HLCC's approach to facilitation training elevated my skills and expanded my professional network.",
      author: "Thandiwe N., Learning & Development",
      role: "Johannesburg, South Africa"
    }
  ];

  return (
    <Section className="py-20 bg-white">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-4">
          What Our Facilitators Say
        </h2>
        <p className="text-gray-600">
          Hear from professionals who've grown their facilitation practice with HLCC.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <Card key={i} className="border hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex gap-1 mb-4 text-[var(--gold-accent)]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
              <div className="mt-auto">
                <p className="font-medium text-[var(--navy-dark)]">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function BottomCTA() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />
      <div className="container relative mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to Facilitate Impact?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join our network of facilitators driving change across Africa's organizations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90">
            <a href="#apply">Apply to Be a Facilitator</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-black/50 hover:text-white bg-black">
            <Link to="/contact">
              Contact Our Team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
