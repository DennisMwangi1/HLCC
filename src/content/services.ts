import { Users, Target, BookOpen, Search, ClipboardCheck } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export type FAQItem = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  number: number;
  title: string;
  description: string;
  duration: string;
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  focusAreas: string[];
  outcome: string;
  heroImage?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  methodology: string[];
  process: ProcessStep[];
  faq: FAQItem[];
};

export const services: Service[] = [
  {
    slug: "culture-shaping",
    icon: Users,
    title: "Culture Shaping & Organizational Health",
    tagline: "Design the culture you want. Nurture the one you need.",
    description:
      "We help you intentionally define, embed, and sustain a culture that fuels engagement, belonging, and lasting performance.",
    focusAreas: [
      "Culture diagnostics and engagement assessments",
      "Defining purpose, values, and behavior anchors",
      "Development of a Culture & Values Playbook",
      "Leadership alignment and cultural immersion programs",
      "Culture sustainability plans and rituals",
    ],
    outcome: "A living culture where people feel connected, inspired, and accountable.",
    heroImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    methodology: [
      "Diagnostic Assessment & Insights",
      "Co-creation & Leadership Alignment",
      "Behavioral Blueprint Development",
      "Experiential Learning & Immersion",
      "Embedding & Measurement"
    ],
    process: [
      {
        number: 1,
        title: "Discovery & Diagnostic Phase",
        description: "We conduct culture diagnostics, leadership interviews, and employee engagement assessments to map the current cultural landscape.",
        duration: "2–3 weeks"
      },
      {
        number: 2,
        title: "Workshop & Alignment Sessions",
        description: "We facilitate leadership and team sessions to define shared values, behavioral anchors, and a culture vision aligned with business goals.",
        duration: "4–6 weeks"
      },
      {
        number: 3,
        title: "Implementation & Training",
        description: "We co-create action plans, train culture champions, and integrate new behaviors into people processes, systems, and communication.",
        duration: "8–12 weeks"
      },
      {
        number: 4,
        title: "Embedding & Measurement",
        description: "We help you institutionalize rituals, track progress through engagement metrics, and measure long-term cultural sustainability.",
        duration: "Ongoing"
      }
    ],
    faq: [
      {
        question: "How long does culture transformation take?",
        answer: "While initial changes can be seen in 3-6 months, meaningful culture transformation typically takes 12-18 months of consistent effort and reinforcement."
      },
      {
        question: "How do you measure culture change?",
        answer: "We use a combination of engagement surveys, behavioral metrics, and business performance indicators to track progress and impact."
      }
    ]
  },
  {
    slug: "team-coaching",
    icon: Target,
    title: "Team Coaching & Development",
    tagline: "From groups to great teams.",
    description:
      "We design coaching-based experiences that strengthen trust, collaboration, and shared purpose within teams.",
    focusAreas: [
      "Leadership and team coaching",
      "Strengths-based collaboration sessions",
      "Emotional intelligence and trust-building workshops",
      "Team retreats and reflection labs",
    ],
    outcome: "Teams that communicate openly, collaborate intentionally, and deliver consistently.",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    methodology: [
      "Team Assessment & Diagnostics",
      "Trust & Psychological Safety Building",
      "Collaborative Goal Setting",
      "Action Learning & Practice",
      "Accountability Structures"
    ],
    process: [
      {
        number: 1,
        title: "Team Discovery",
        description: "We conduct in-depth discovery sessions to understand team dynamics, challenges, and goals.",
        duration: "1-2 sessions"
      },
      {
        number: 2,
        title: "Workshop Series",
        description: "Interactive workshops focused on building trust, communication, and collaboration within the team.",
        duration: "4-6 sessions"
      },
      {
        number: 3,
        title: "Applied Learning Projects",
        description: "Practical application of new skills through real-world projects and challenges.",
        duration: "4-8 weeks"
      },
      {
        number: 4,
        title: "Sustained Practice & Follow-up",
        description: "Ongoing support and coaching to ensure lasting behavioral change and team effectiveness.",
        duration: "Ongoing"
      }
    ],
    faq: [
      {
        question: "How many team members should participate?",
        answer: "Ideal team size is 5-12 members. For larger teams, we recommend breaking into smaller working groups."
      },
      {
        question: "What's the time commitment?",
        answer: "Typically 2-4 hours per month per participant, plus implementation time between sessions."
      }
    ]
  },
  {
    slug: "leadership-training",
    icon: BookOpen,
    title: "Leadership Training & Capacity Building",
    tagline: "Develop leaders who lead with heart and impact.",
    description:
      "Transformative learning journeys equipping leaders with the mindset, skills, and emotional intelligence to inspire trust and drive results.",
    focusAreas: [
      "Leading with Emotional Intelligence",
      "Coaching for Performance & Growth",
      "Managing Difficult Conversations",
      "Leading Across Generations",
      "Building Inclusive & Psychologically Safe Teams",
    ],
    outcome: "Confident, emotionally intelligent leaders who shape culture and deliver impact.",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=1200&q=80",
    methodology: [
      "Competency Assessment",
      "Personalized Development Planning",
      "Experiential Learning",
      "Peer Coaching",
      "Application & Reflection"
    ],
    process: [
      {
        number: 1,
        title: "Needs Assessment",
        description: "Comprehensive evaluation of leadership development needs and organizational context.",
        duration: "1-2 weeks"
      },
      {
        number: 2,
        title: "Program Design & Customization",
        description: "Tailoring the leadership development program to address specific organizational challenges and goals.",
        duration: "2-3 weeks"
      },
      {
        number: 3,
        title: "Workshop Delivery",
        description: "Interactive leadership development sessions focusing on practical skills and real-world application.",
        duration: "4-8 sessions"
      },
      {
        number: 4,
        title: "Follow-up & Support",
        description: "Ongoing coaching and support to ensure leadership development translates into organizational impact.",
        duration: "3-6 months"
      }
    ],
    faq: [
      {
        question: "Can this be delivered virtually?",
        answer: "Yes, we offer both in-person and virtual delivery options, with interactive elements for engagement."
      },
      {
        question: "What's the ideal group size?",
        answer: "We recommend 8-15 participants for optimal interaction and learning."
      }
    ]
  },{
    slug: "executive-search",
    icon: Search,
    title: "Executive & Talent Search",
    tagline: "Placing people who transform performance.",
    description:
      "We go beyond recruitment to match leaders who align with your organization's purpose, values, and strategic direction.",
    focusAreas: [
      "Executive and senior leadership search",
      "Targeted mid-level recruitment",
      "Competency profiling and assessments",
      "Candidate selection and onboarding support",
    ],
    outcome: "Strategic hires who elevate culture, capability, and performance.",
    heroImage:
      "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?auto=format&fit=crop&w=1200&q=80",
    methodology: [
      "Needs Analysis & Role Definition",
      "Market Mapping & Research",
      "Candidate Sourcing & Assessment",
      "Structured Interview Process",
      "Onboarding Support"
    ],
    process: [
      {
        number: 1,
        title: "Position Briefing",
        description: "In-depth understanding of the role requirements, organizational culture, and success criteria.",
        duration: "1-2 weeks"
      },
      {
        number: 2,
        title: "Search & Long-list",
        description: "Proactive search and identification of top-tier candidates through our extensive network and research.",
        duration: "2-4 weeks"
      },
      {
        number: 3,
        title: "Interviews & Assessment",
        description: "Comprehensive evaluation of candidates through structured interviews and assessment methods.",
        duration: "3-5 weeks"
      },
      {
        number: 4,
        title: "Offer & Onboarding",
        description: "Support through the offer process and seamless onboarding to ensure successful integration.",
        duration: "2-4 weeks"
      }
    ],
    faq: [
      {
        question: "What's your success rate?",
        answer: "We maintain a 90%+ success rate in placements, with a 12-month guarantee on all executive hires."
      },
      {
        question: "How do you source candidates?",
        answer: "We use a combination of our extensive network, direct headhunting, and targeted outreach to find the best talent."
      }
    ]
  },
  {
    slug: "hr-advisory",
    icon: ClipboardCheck,
    title: "HR Operations & Advisory",
    tagline: "Strong foundations. Sustainable growth.",
    description:
      "We strengthen your HR systems and structures to enable clarity, compliance, and human-centered growth.",
    focusAreas: [
      "HR audits and process optimization",
      "Job evaluation and grading frameworks",
      "Compensation and benefits benchmarking",
      "Policy development and compliance alignment",
      "HR capability development and advisory",
    ],
    outcome: "A future-ready HR function that supports people, culture, and performance.",
    heroImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    methodology: [
      "Gap Analysis",
      "Best Practice Benchmarking",
      "Custom Solution Design",
      "Implementation Support",
      "Capability Building"
    ],
    process: [
      {
        number: 1,
        title: "Initial Assessment",
        description: "Comprehensive review of current HR practices, policies, and systems to identify gaps and opportunities.",
        duration: "1-2 weeks"
      },
      {
        number: 2,
        title: "Solution Design",
        description: "Development of customized HR solutions aligned with organizational strategy and best practices.",
        duration: "2-4 weeks"
      },
      {
        number: 3,
        title: "Pilot Testing",
        description: "Implementation of solutions in a controlled environment to validate effectiveness and make necessary adjustments.",
        duration: "4-6 weeks"
      },
      {
        number: 4,
        title: "Full Rollout",
        description: "Organization-wide implementation of HR solutions with training and change management support.",
        duration: "8-12 weeks"
      }
    ],
    faq: [
      {
        question: "Do you provide ongoing support?",
        answer: "Yes, we offer retainer-based advisory services for ongoing HR support and strategy."
      },
      {
        question: "How do you ensure compliance with local regulations?",
        answer: "Our team stays updated on all relevant labor laws and regulations to ensure full compliance."
      }
    ]
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
