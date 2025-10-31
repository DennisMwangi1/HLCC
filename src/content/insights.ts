export type Article = {
  slug: string;
  title: string;
  category: string;
  image: string;
  tagline: string;
  description: string; // short summary
  content: string; // full article body
  author: string;
  date: string; // display-ready
  result?: string; // optional, for case studies
  relatedTags?: string[];
};

export const articles: Article[] = [
  {
    slug: "future-of-organizational-learning-2025",
    title: "The Future of Organizational Learning: Trends Shaping 2025",
    category: "Leadership",
    image:
      "https://images.unsplash.com/photo-1669607960578-f7d7fd363e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tagline:
      "From AI-augmented learning to culture-first development strategies.",
    description:
      "Key trends leaders should watch as learning becomes more adaptive, social, and evidence-based.",
    content:
      "Learning is shifting from one-off programs to continuous, in-the-flow experiences.\n\nAI will augment—not replace—human development by personalizing content and surfacing just-in-time nudges.\n\nOrganizations that connect learning to lived culture and leadership behaviors will see the most durable performance gains.",
    author: "HLCC Research Team",
    date: "Oct 1, 2025",
    relatedTags: ["learning", "leadership", "evidence"],
  },
  {
    slug: "building-a-coaching-culture-that-scales",
    title: "Building a Coaching Culture that Scales",
    category: "Transformation",
    image:
      "https://images.unsplash.com/photo-1758519290111-bfbd61b32d49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tagline:
      "Embed coaching principles across teams to drive trust and accountability.",
    description:
      "A practical roadmap to spread coaching mindsets and behaviors across the organization.",
    content:
      "Scaling a coaching culture starts with leaders modeling curiosity and feedback.\n\nCreate simple rituals—check-ins, retros, and peer coaching—that make growth a shared habit.\n\nMeasure what matters: psychological safety, collaboration quality, and performance outcomes.",
    author: "Wanjiru Mwangi",
    date: "Sep 25, 2025",
    relatedTags: ["coaching", "culture", "leadership"],
  },
  {
    slug: "energy-sector-culture-transformation",
    title: "Energy Sector: Culture Transformation Across 5 Countries",
    category: "Case Study",
    image:
      "assets/img/whoweare.webp",
    tagline: "A regional transformation aligned purpose, values, and behaviors.",
    description:
      "Within 12 months, engagement scores rose by 42% and leadership alignment was restored.",
    content:
      "HLCC partnered with a leading African energy company to redefine purpose, values, and behaviors.\n\nThrough leadership labs, manager toolkits, and culture rituals, teams reconnected to a shared way of working.\n\nThe transformation focused on lived behaviors: decision transparency, mutual accountability, and customer empathy.",
    author: "HLCC Team",
    date: "Aug 12, 2025",
    result: "42% engagement lift",
    relatedTags: ["culture", "energy", "transformation"],
  },
  {
    slug: "financial-services-ei-leadership",
    title: "Financial Services: Building Emotionally Intelligent Leaders",
    category: "Case Study",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    tagline: "Equipping 300 senior managers to lead with empathy and accountability.",
    description:
      "A blended learning and coaching journey improved collaboration and customer satisfaction.",
    content:
      "We designed a blended leadership program combining workshops, coaching circles, and on-the-job experiments.\n\nLeaders practiced emotional regulation, courageous conversations, and feedback skills.\n\nThe result was stronger cross-functional collaboration and measurable improvements in customer outcomes.",
    author: "Carolyne Mutheu",
    date: "Jul 2, 2025",
    result: "300 leaders trained",
    relatedTags: ["leadership", "emotional-intelligence", "coaching"],
  },
];
