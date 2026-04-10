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
  linkedinEmbed?: string; // LinkedIn post embed URL
};

export const articles: Article[] = [
  {
    slug: "rooted-connected-and-rising",
    title: "Rooted, Connected & Rising — The Beginning of a Movement",
    category: "Women & Leadership",
    image: "/assets/img/Rooted.png",
    secondaryImage: "/assets/img/Rising.png",
    tagline:
      "A gathering where women are not just networking or learning — but reflecting, unlearning, reconnecting and intentionally rising.",
    description:
      "The inaugural Rooted & Rising gathering brought together accomplished women in midlife for courageous stories, deep listening, and intentional leadership — the beginning of a movement towards deeper self-awareness and compassionate living.",
    content:
      "For a long time, I have known that part of my life's work is to impact women in midlife. Women who are competent. Accomplished. Responsible. Women who are holding organisations together, holding families together, holding themselves together. And yet, quietly navigating the curveballs of life.\n\nLast March, I hosted a Lean In Circle gathering that was deeply meaningful. The conversations were real and the connections powerful. But I remember leaving that space with a gentle but persistent knowing: There is more that needs to be said. More that needs to be held. More that needs to be healed.\n\nI just did not yet know how to create that space, until I completed my CBM (Coach Business Masterclass) at CDI-Africa Coaching Group. That journey sharpened my vision in a profound way. It helped me see more clearly the kind of spaces I am called to convene — spaces where women are not just networking or learning, but reflecting, unlearning, reconnecting and intentionally rising.\n\nFrom that clarity, Rooted, Connected & Rising was birthed.\n\nLast Saturday, we hosted our very first Rooted & Rising gathering. Courageous stories were shared — stories of self-doubt, rejection, rebuilding, faith, motherhood, leadership and becoming. During the fireside conversation that followed, time seemed to stand still. The room was filled with deep listening, laughter, relating nods, affirmation and truth.\n\nI honestly struggle to find words to fully describe what the day meant to me — the impact, the lessons, the confirmations. Throughout the coming weeks, I will be sharing reflections and takeaways from each of the founding voices — Lucy Wairimu, Risper Alaro, Carol Koech, and Eileen Laskar — who so generously shared their journeys. Their stories carry wisdom for many more women who are doing life bravely, even when it does not look like it from the outside.\n\nThis is the beginning of a movement towards more intentional leadership, deeper self-awareness and compassionate living and becoming. To all the amazing ladies who attended — Hellen Gatumuta, Leah Heho, Sarah Omaya, Anne Makomu-Njuguna, Hannah Kirira, Beatrice Njoroge, Sylvia Kamotho, Rose Chelang'at, Carolyne Mutheu, Anne Secundah and others — thank you for showing up and being part of this story.",
    author: "Wanjiru Mwangi",
    date: "April 9, 2026",
    originalUrl: "https://www.linkedin.com/posts/coachwanjirumwangi_for-a-long-time-i-have-known-that-part-of-ugcPost-7441766105880363008-ZPhO?utm_source=share&utm_medium=member_desktop&rcm=ACoAADyOCXwBAYV_aNLxE5auaIZ2NGwhz-S0zQ4",
    linkedinEmbed:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7441766105880363008",
    relatedTags: [
      "women-in-leadership",
      "midlife-empowerment",
      "intentional-living",
      "coaching",
      "self-awareness",
      "community",
    ],
  },
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
