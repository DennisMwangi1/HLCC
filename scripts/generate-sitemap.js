import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get base URL from environment variable or use a default
// Set SITE_URL environment variable in your deployment platform (e.g., Vercel)
// For Vercel, you can set it in the project settings or via CLI: vercel env add SITE_URL
const baseUrl = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://your-domain.com';

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/insights', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/register/coach', priority: '0.6', changefreq: 'monthly' },
  { path: '/register/facilitator', priority: '0.6', changefreq: 'monthly' },
];

// Function to extract slugs from TypeScript content files
function extractSlugs(filePath, pattern) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const matches = content.matchAll(pattern);
    const slugs = [];
    for (const match of matches) {
      if (match[1]) {
        slugs.push(match[1].replace(/['"]/g, ''));
      }
    }
    return slugs;
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message);
    return [];
  }
}

// Extract service slugs
const servicesPath = join(__dirname, '..', 'src', 'content', 'services.ts');
const serviceSlugs = extractSlugs(servicesPath, /slug:\s*["']([^"']+)["']/g);

// Extract insight/article slugs
const insightsPath = join(__dirname, '..', 'src', 'content', 'insights.ts');
const insightSlugs = extractSlugs(insightsPath, /slug:\s*["']([^"']+)["']/g);

// Dynamic service routes
const serviceRoutes = serviceSlugs.map(slug => ({
  path: `/services/${slug}`,
  priority: '0.8',
  changefreq: 'monthly',
}));

// Dynamic insight/article routes
const insightRoutes = insightSlugs.map(slug => ({
  path: `/insights/${slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

// Combine all routes
const allRoutes = [...staticRoutes, ...serviceRoutes, ...insightRoutes];

// Get current date in ISO format
const currentDate = new Date().toISOString().split('T')[0];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

// Write sitemap to public directory
const publicDir = join(__dirname, '..', 'public');
const sitemapPath = join(publicDir, 'sitemap.xml');

writeFileSync(sitemapPath, sitemap, 'utf-8');
console.log(`✅ Sitemap generated successfully at ${sitemapPath}`);
console.log(`   Total URLs: ${allRoutes.length}`);
console.log(`   Base URL: ${baseUrl}`);

// Also update robots.txt with the correct sitemap URL
const robotsPath = join(publicDir, 'robots.txt');
const robotsContent = `# robots.txt for HLCC
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin or private areas if any
# Disallow: /admin/
# Disallow: /private/
`;

writeFileSync(robotsPath, robotsContent, 'utf-8');
console.log(`✅ Robots.txt updated at ${robotsPath}`);

