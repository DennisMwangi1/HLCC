"use client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Check, ArrowRight, Star } from "lucide-react";
import { DynamicForm } from "../../components/DynamicForm.tsx";
import { coachFormSchema } from "../../lib/formSchemas.ts";

export default function RegisterCoach() {
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
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
          alt="Coaching and leadership in action"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[var(--navy-dark)]/85" />
      </div>
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">
            Lead the Change.
            <span className="block mt-1 bg-gradient-to-r from-[var(--blue-bright)] to-[var(--gold-accent)] bg-clip-text text-transparent">
              Become an HLCC Coach.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Shape organizational culture and empower leaders across Africa and beyond.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90">
              <a href="#apply">Apply Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-black/10 hover:text-white bg-white/10">
              <Link to="/services/leadership-training">
                Learn More About HLCC Coaching Network
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
    "Collaborate with a human centered, globally minded firm shaping leadership and culture through evidence based coaching, shared learning, and meaningful impact",
  ];

  return (
    <Section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-6">Why Join HLCC</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
                Partner with Purpose. Grow with HLCC.

                Join a global network of coaches and facilitators dedicated to shaping cultures where people and performance flourish. At HLCC, we believe true transformation begins with people, courageous leaders, empathetic teams, and workplaces where belonging drives excellence.

                Be part of a purpose led community that blends evidence based coaching with deep human insight, creating lasting change in how organizations lead, live, and grow.
            </p>

          </div>
        </div>

        <div>
          <Card className="border-2 hover:border-[var(--gold-deep)] transition-colors">
            <CardHeader>
              <CardTitle className="text-xl text-[var(--navy-dark)]">What You’ll Gain</CardTitle>
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
    "Accredited coaching certification (ICF or similar) or demonstrable equivalent experience",
    "3–7+ years coaching leaders and/or teams in complex environments",
    "Strong facilitation skills; able to hold safe, challenging, growth-oriented spaces",
    "Ability to operate across cultures; high emotional intelligence and empathy",
  ];

  const niceToHave = [
    "Organizational development, culture transformation, or HR strategy experience",
    "Experience with assessments, diagnostics, and data-informed practice",
    "Sector familiarity in financial services, energy, tech, healthcare, or public sector",
  ];

  return (
    <Section className="py-20">
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--navy-dark)] mb-6">What We Look For</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-[var(--navy-dark)] mb-3">Core Profile</h3>
              <ul className="space-y-2 text-gray-700">
                {mustHave.map((item, i) => (
                  <li key={i} className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-[var(--gold-deep)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[var(--navy-dark)] mb-3">Preferred Experience</h3>
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
            <CardTitle className="text-[var(--navy-dark)]">Emerging Coaches</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-700">
              Even if you’re emerging, tell us about your passion and experience—HLCC values potential. Share how
              you’ve helped people grow and how you want to contribute to culture transformation.
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
          <h2 id="apply" className="text-3xl md:text-4xl font-semibold  mb-4">
            Registration Form
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Your information is secure and confidential. We’ll review your application and get back to you promptly.
          </p>
        </div>

        <DynamicForm schema={coachFormSchema} />
      </div>
    </Section>
  );
}

function Testimonials() {
  const quotes = [
    {
      text:
        "HLCC gave me the platform to scale my practice across industries while staying true to human-centered values.",
      author: "Amina S.",
      role: "Leadership Coach, Nairobi",
    },
    {
      text:
        "The rigor of the culture work and the depth of reflection elevate every engagement. The impact is tangible.",
      author: "David K.",
      role: "Executive Coach, Johannesburg",
    },
    {
      text:
        "Working with HLCC means meaningful problems, brave conversations, and real outcomes for leaders and teams.",
      author: "Grace T.",
      role: "Team Coach, Accra",
    },
  ];

  return (
    <Section className="py-20 bg-gradient-to-br from-[var(--navy-medium)] to-[var(--gold-muted)] relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--blue-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[var(--gold-accent)]/10 rounded-full blur-3xl" />

      <div className="relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-white font-semibold">What Our Coaches Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all">
              <CardContent className="p-6 text-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-5 w-5 fill-[var(--gold-accent)] text-[var(--gold-accent)]" />
                  ))}
                </div>
                <p className="mb-4 leading-relaxed">“{q.text}”</p>
                <div className="text-sm text-gray-300">
                  <div className="font-medium text-white">{q.author}</div>
                  <div>{q.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to Coach with Purpose and Impact?
        </h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Join HLCC’s network of world-class coaches shaping human-centered leadership and resilient cultures.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Button asChild size="lg" className="bg-gradient-to-r from-[var(--blue-accent)] to-[var(--gold-accent)] text-white hover:opacity-90">
            <a href="#apply">Apply Now</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-black/50 hover:text-white bg-black">
            <Link to="/services/leadership-training">
              Learn More About HLCC Coaching
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
