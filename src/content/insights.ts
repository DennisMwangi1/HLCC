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
  originalUrl?: string; // link to original article
  secondaryImage?: string; // additional image for the article
};

export const articles: Article[] = [
  {
    slug: "wanjiru-mwangi-top-25-changemakers-2025",
    title: "Top 25 Changemakers in People and Culture Space 2025 - Wanjiru Mwangi",
    category: "Leadership",
    image: "/assets/img/Carol.png",
    secondaryImage: "/assets/img/Carol-2.png",
    tagline: "A heart-led leader shaping the future of people and culture across Africa.",
    description:
      "Wanjiru Mwangi brings grounded confidence from a life lived in alignment, with purpose, people, principles, and God at the centre. A seasoned HR executive with over 20 years of experience across Africa.",
    content:
      "Wanjiru Mwangi has been recognized as one of the Top 25 Changemakers in People and Culture Space 2025 by The Knowledge Warehouse. A seasoned HR executive with over 20 years of experience across Africa, Wanjiru brings grounded confidence from a life lived in alignment with purpose, people, principles, and God at the centre.\n\nHer journey is a testament to intentional career pivoting and values-based leadership. Starting with a BSc in Information Technology, she discovered her true passion lay not in machines, but in people. This pivotal insight led her to pursue a Higher National Diploma in HR Management from IHRM, followed by an Executive MBA, and later the Senior Management Leadership Program (SMLP) at Strathmore Business School in partnership with IESE.\n\nWanjiru's leadership style is intentional and values-based. She describes herself as a \"heart-led leader,\" one who blends clarity with compassion. Her career has spanned impactful roles including Head of Regional People Partners – Africa at Bolt, Senior Director of People and Culture at Samasource, and HR Director for East Africa at Schneider Electric. Beyond the corporate world, she is a passionate advocate for education, equity, and empowerment, serving on school boards and as a board member at CIHEB – Kenya. At just 26, she founded what would later become The SHero Foundation, which today supports the education of nearly 20 high school students and provides daily meals to over 2,000 learners through a school porridge program.",
    author: "The Knowledge Warehouse",
    date: "November 4, 2025",
    originalUrl: "https://theknowledgewarehouseke.com/top-25-changemakers-in-people-and-culture-space-2025-18/",
    relatedTags: ["leadership", "recognition", "changemaker", "people-culture"],
  },
];
