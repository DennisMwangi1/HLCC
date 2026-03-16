export type JobPosting = {
    slug: string;
    title: string;
    department: string;
    location: string;
    type: 'Full-time' | 'Contract' | 'Part-time';
    description: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
    salary?: string;
    postedDate: string;
    closingDate?: string;
    isActive: boolean;
};

export const jobPostings: JobPosting[] = [
    {
        slug: "graphic-designer-video-editor",
        title: "Graphic Designer & Video Editor",
        department: "Design & Media",
        location: "On site",
        type: "Full-time",
        description:
            "HLCC is looking for a creative and detail-oriented Graphic Designer & Video Editor to join our team. You will be responsible for developing high-quality visual and video content that supports our branding, marketing, and communication objectives across multiple platforms.",
        responsibilities: [
            "Conceptualize and design digital and print marketing materials, including posters, flyers, and campaign visuals.",
            "Create engaging video content tailored for social media (Reels, TikToks, Shorts) and corporate presentations.",
            "Maintain and uphold brand consistency across all visual touchpoints.",
            "Design newsletters, brochures, and digital layouts for internal and external communications.",
            "Collaborate with the marketing team to support ongoing initiatives and product launches.",
        ],
        requirements: [
            "Degree or Diploma in Graphic Design, Fine Arts, or a related field.",
            "Minimum of 5 years of professional experience in a similar role.",
            "Mastery of the Adobe Creative Suite (Photoshop, Illustrator, Premiere Pro, After Effects).",
            "Strong portfolio showcasing both static design and video editing work.",
            "Ability to work independently, meet tight deadlines, and adapt to evolving project requirements.",
        ],
        niceToHave: [
            "Experience creating content for social platforms like Instagram, TikTok, and YouTube.",
            "Familiarity with motion graphics and animation principles.",
            "Understanding of branding and storytelling for diverse audiences.",
        ],
        postedDate: "March 16, 2026",
        closingDate: "March 30, 2026",
        isActive: true,
    },
];

export const activeJobPostings = jobPostings.filter((j) => j.isActive);
export const jobBySlug = Object.fromEntries(jobPostings.map((j) => [j.slug, j]));
