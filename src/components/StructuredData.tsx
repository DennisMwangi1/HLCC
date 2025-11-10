import { siteConfig, getAbsoluteUrl } from '@/lib/seo';
import type { Service } from '@/content/services';
import type { Article } from '@/content/insights';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'BreadcrumbList';
  data?: Service | Article | Array<{ name: string; url: string }>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.fullName,
          alternateName: siteConfig.name,
          url: siteConfig.url,
          logo: getAbsoluteUrl('/assets/img/HLCC-new.png'),
          description: siteConfig.description,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: siteConfig.links.phone,
            contactType: 'customer service',
            email: siteConfig.links.email,
            areaServed: ['KE', 'ZA', 'AE', 'AF'],
            availableLanguage: ['en'],
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressCountry: siteConfig.address.country,
          },
          sameAs: [
            siteConfig.links.linkedin,
            siteConfig.links.twitter,
            siteConfig.links.facebook,
          ].filter(Boolean),
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.fullName,
          url: siteConfig.url,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        };

      case 'Service': {
        if (!data) return null;
        const service = data as Service;
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: {
            '@type': 'Organization',
            name: siteConfig.fullName,
            url: siteConfig.url,
          },
          areaServed: {
            '@type': 'Place',
            name: 'Africa, Middle East',
          },
          serviceType: service.title,
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            category: 'Professional Services',
          },
        };
      }

      case 'Article': {
        if (!data) return null;
        const article = data as Article;
        // Convert date string to ISO format if needed
        const parseDate = (dateStr: string): string => {
          try {
            // Try to parse the date string - if it's already ISO, return it
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
              return date.toISOString();
            }
            // If parsing fails, try common formats
            // For dates like "Oct 1, 2025", we'll try to parse them
            return dateStr; // Return as-is for now, can be improved with date-fns
          } catch {
            return dateStr;
          }
        };
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description || article.tagline,
          image: article.image.startsWith('http') ? article.image : getAbsoluteUrl(article.image),
          datePublished: parseDate(article.date),
          dateModified: parseDate(article.date),
          author: {
            '@type': 'Person',
            name: article.author,
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.fullName,
            logo: {
              '@type': 'ImageObject',
              url: getAbsoluteUrl('/assets/img/HLCC-new.png'),
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': getAbsoluteUrl(`/insights/${article.slug}`),
          },
          articleSection: article.category,
        };
      }

      case 'BreadcrumbList':
        if (!data || !Array.isArray(data)) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.map((item: { name: string; url: string }, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: getAbsoluteUrl(item.url),
          })),
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Convenience components
export function OrganizationSchema() {
  return <StructuredData type="Organization" />;
}

export function WebSiteSchema() {
  return <StructuredData type="WebSite" />;
}

export function ServiceSchema({ service }: { service: Service }) {
  return <StructuredData type="Service" data={service} />;
}

export function ArticleSchema({ article }: { article: Article }) {
  return <StructuredData type="Article" data={article} />;
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  return <StructuredData type="BreadcrumbList" data={items} />;
}

