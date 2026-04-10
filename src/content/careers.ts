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
    {
        slug: "campus-administrator",
        title: "Campus Administrator",
        department: "Administration & Operations",
        location: "On site",
        type: "Full-time",
        description:
            "We are seeking a highly organized, proactive, and people-oriented Campus Administrator to oversee day-to-day administrative operations and ensure smooth coordination across departments. This role is critical in supporting school activities, enhancing customer experience, and maintaining high operational standards across the campus.",
        responsibilities: [
            "Coordinate and manage school activities, schedules, and administrative operations.",
            "Manage communication including phone calls, emails, and correspondence.",
            "Welcome and assist parents, students, staff, and visitors in a professional and friendly manner.",
            "Send timely communication to parents, staff, and service providers.",
            "Compile and distribute school newsletters.",
            "Update the school website and social media platforms.",
            "Maintain service contracts with providers (catering, transport, etc.).",
            "Handle and follow up on inquiries and ensure proper documentation.",
            "Manage the full admissions process from inquiry to onboarding.",
            "Ensure completion of all admission requirements (forms, documents, fees).",
            "Issue admission kits and onboarding packs to new parents.",
            "Oversee and support Nurse, Catering Team, Green & Clean Team, and Security Team.",
            "Ensure teams understand and align with school objectives, providing guidance, resources, and operational support.",
            "Monitor performance and conduct regular check-ins; ensure compliance with standards and policies.",
            "Coordinate catering services to ensure timely and quality meal delivery.",
            "Oversee cleanliness, hygiene, and environmental standards.",
            "Manage inventory of supplies and materials.",
            "Coordinate with security providers and ensure safety systems are functional.",
            "Support execution of the school's marketing strategy and coordinate social media content.",
            "Follow up on leads, referrals, and inquiries; support enrolment campaigns and brand visibility initiatives.",
            "Plan and execute school events (Open Days, Coffee Dates, parent sessions).",
            "Coordinate logistics, vendors, timelines, and budgets for events.",
            "Manage and resolve customer complaints effectively.",
            "Conduct Net Promoter Score (NPS) surveys twice a year.",
            "Prepare departmental requisitions and support overall school operations as needed.",
        ],
        requirements: [
            "Diploma or Degree in Business Administration, Human Resources, Education, or a related field.",
            "Proven experience in administration, school operations, or a similar role.",
            "Strong organizational and multitasking skills.",
            "Excellent communication and interpersonal skills.",
            "High level of professionalism and customer service orientation.",
            "Ability to work collaboratively and manage multiple stakeholders.",
            "Proficiency in Microsoft Office and digital tools.",
        ],
        niceToHave: [
            "Attention to detail and accountability.",
            "Strong coordination and problem-solving skills.",
            "Customer-centric mindset.",
            "Ability to work in a fast-paced environment.",
            "Leadership and team coordination ability.",
        ],
        postedDate: "April 9, 2026",
        closingDate: "April 16, 2026",
        isActive: true,
    },
    {
        slug: "learning-facilitator",
        title: "Learning Facilitator (English, Social Studies & Pre-Technical Studies)",
        department: "Education & Curriculum",
        location: "On site",
        type: "Full-time",
        description:
            "We are seeking a passionate and dedicated teacher to join our team and support the continuity of learning and effective curriculum delivery. The successful candidate will play a key role in ensuring learners receive high-quality instruction and a well-rounded educational experience.",
        responsibilities: [
            "Plan, prepare, and deliver engaging lessons in English, Social Studies, and Pre-Technical Studies.",
            "Ensure timely and effective curriculum coverage in line with school standards.",
            "Assess, monitor, and report on learner progress.",
            "Create a positive, inclusive, and engaging classroom environment.",
            "Maintain accurate records of learner performance and attendance.",
            "Collaborate with colleagues and participate in school activities and meetings.",
            "Uphold school values, policies, and professional standards.",
        ],
        requirements: [
            "Diploma or Degree in Education or a related field.",
            "Relevant teaching experience in the specified subjects.",
            "Strong classroom management and organizational skills.",
            "Excellent communication and interpersonal skills.",
            "A passion for teaching and learner development.",
        ],
        niceToHave: [
            "Commitment to academic excellence.",
            "Ability to engage and motivate learners.",
            "Strong planning and time management skills.",
            "Team player with a collaborative mindset.",
        ],
        postedDate: "April 9, 2026",
        closingDate: "April 16, 2026",
        isActive: true,
    },
];

/**
 * Returns true if the job's closing date has passed.
 * Compares the closing date string (e.g. "March 30, 2026") against now.
 */
export function isApplicationClosed(job: JobPosting): boolean {
    if (!job.isActive) return true;
    if (!job.closingDate) return false;
    const closing = new Date(job.closingDate);
    // Set closing to end of day so it stays open on the closing date itself
    closing.setHours(23, 59, 59, 999);
    return Date.now() > closing.getTime();
}

export const activeJobPostings = jobPostings.filter((j) => j.isActive);
export const jobBySlug = Object.fromEntries(jobPostings.map((j) => [j.slug, j]));
