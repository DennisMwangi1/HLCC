export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

export const defaultSEO: SEOData = {
  title: 'HLCC - Human-Centered Leadership & Culture Consulting',
  description: 'HLCC helps organizations align people, culture, and leadership to build workplaces where belonging drives performance and strategy becomes lived behavior. Partner with us to transform your organizational culture.',
  keywords: [
    'leadership development',
    'organizational culture',
    'culture transformation',
    'HR consulting',
    'executive coaching',
    'team coaching',
    'leadership training',
    'organizational development',
    'human resources',
    'culture shaping',
    'Kenya',
    'Africa',
  ],
  image: '/assets/img/hlcc-culture.png',
  type: 'website',
  url: 'https://hlcc.africa',
};

// Get site URL from environment variable or use default
const getSiteUrl = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use window.location for current origin
    return window.location.origin;
  }
  // Server-side or build-time: use environment variable or default
  return import.meta.env.VITE_SITE_URL || import.meta.env.SITE_URL || 'https://hlcc.africa';
};

export const siteConfig = {
  name: 'HLCC',
  fullName: 'Human-Centered Leadership & Culture Consulting',
  description: defaultSEO.description,
  url: getSiteUrl(),
  ogImage: '/assets/img/hlcc-culture.png',
  links: {
    email: 'info@hlcc.africa',
    phone: '+254 115335322',
    linkedin: 'https://www.linkedin.com/company/hlcc',
    twitter: 'https://twitter.com/hlcc',
    facebook: 'https://www.facebook.com/hlcc',
  },
  address: {
    street: 'Westlands Business Center, 2nd Floor',
    city: 'Nairobi',
    country: 'Kenya',
    postalCode: '',
  },
};

// Page-specific SEO configurations
export const pageSEO: Record<string, SEOData> = {
  home: {
    title: 'HLCC - Culture Runs the Show. We Make Sure It Works for You.',
    description: 'Transform your organization with human-centered leadership and culture consulting. HLCC helps build workplaces where belonging drives performance across Africa and beyond.',
    keywords: ['leadership development', 'culture transformation', 'organizational development', 'HR consulting', 'Kenya'],
    image: '/assets/img/hlcc-culture.png',
    url: 'https://hlcc.africa',
  },
  about: {
    title: 'About HLCC - Human-Centered Leadership & Culture Consulting',
    description: 'Founded in 2016, HLCC helps organizations align people, culture, and leadership. Learn about our story, philosophy, and team dedicated to building thriving workplace cultures.',
    keywords: ['about HLCC', 'organizational culture', 'leadership consulting', 'company history'],
    image: '/assets/img/whoweare.webp',
    url: 'https://hlcc.africa/about',
  },
  services: {
    title: 'Our Services - Leadership, Culture & HR Consulting | HLCC',
    description: 'Explore our comprehensive services: culture shaping, team coaching, leadership training, executive search, and HR advisory. Transform your organization with evidence-based solutions.',
    keywords: ['culture shaping', 'team coaching', 'leadership training', 'executive search', 'HR advisory'],
    image: '/assets/img/capacity-building.webp',
    url: 'https://hlcc.africa/services',
  },
  insights: {
    title: 'Insights & Blogs - Leadership & Culture Resources | HLCC',
    description: 'Discover insights, case studies, and articles on leadership development, organizational culture, and workplace transformation from HLCC experts.',
    keywords: ['leadership insights', 'culture articles', 'organizational development', 'case studies'],
    image: '/assets/img/whoweare.webp',
    url: 'https://hlcc.africa/insights',
  },
  contact: {
    title: 'Contact Us - Get in Touch with HLCC',
    description: 'Have questions about our services? Contact HLCC in Nairobi, Kenya. We\'re here to help transform your organizational culture and leadership.',
    keywords: ['contact HLCC', 'HR consulting contact', 'leadership consulting Kenya'],
    image: '/assets/img/hlcc-culture.png',
    url: 'https://hlcc.africa/contact',
  },
  registerCoach: {
    title: 'Register as a Coach - Join HLCC Network',
    description: 'Join HLCC\'s network of certified coaches. Help organizations develop their leaders and transform their culture through evidence-based coaching practices.',
    keywords: ['coach registration', 'join HLCC', 'coaching network'],
    image: '/assets/img/coach.avif',
    url: 'https://hlcc.africa/register/coach',
  },
  registerFacilitator: {
    title: 'Register as a Facilitator - Join HLCC Network',
    description: 'Become an HLCC facilitator and help organizations transform their culture through engaging workshops and training programs.',
    keywords: ['facilitator registration', 'join HLCC', 'training facilitator'],
    image: '/assets/img/facilitator.avif',
    url: 'https://hlcc.africa/register/facilitator',
  },
};

export function getFullTitle(title: string): string {
  return `${title} | ${siteConfig.fullName}`;
}

export function getAbsoluteUrl(path: string): string {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

