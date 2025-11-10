import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { SEOData } from '@/lib/seo';
import { defaultSEO, getFullTitle, getAbsoluteUrl, siteConfig } from '@/lib/seo';

export function useSEO(seoData?: Partial<SEOData>) {
  const location = useLocation();
  const currentUrl = getAbsoluteUrl(location.pathname);
  
  const seo: SEOData = {
    ...defaultSEO,
    ...seoData,
    url: seoData?.url || currentUrl,
    image: seoData?.image ? getAbsoluteUrl(seoData.image) : getAbsoluteUrl(defaultSEO.image || ''),
  };

  useEffect(() => {
    // Update document title
    document.title = getFullTitle(seo.title);

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Remove existing meta tags to avoid duplicates
    const removeMetaTag = (name: string, attribute: 'name' | 'property' = 'name') => {
      const element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (element) {
        element.remove();
      }
    };

    // Basic meta tags
    updateMetaTag('description', seo.description);
    if (seo.keywords && seo.keywords.length > 0) {
      updateMetaTag('keywords', seo.keywords.join(', '));
    }

    // Robots meta
    if (seo.noindex || seo.nofollow) {
      const robotsContent = [
        seo.noindex ? 'noindex' : 'index',
        seo.nofollow ? 'nofollow' : 'follow',
      ].join(', ');
      updateMetaTag('robots', robotsContent);
    } else {
      removeMetaTag('robots');
    }

    // Open Graph tags
    updateMetaTag('og:title', seo.title, 'property');
    updateMetaTag('og:description', seo.description, 'property');
    updateMetaTag('og:type', seo.type || 'website', 'property');
    updateMetaTag('og:url', seo.url || currentUrl, 'property');
    updateMetaTag('og:image', seo.image || getAbsoluteUrl(siteConfig.ogImage), 'property');
    updateMetaTag('og:site_name', siteConfig.fullName, 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seo.title);
    updateMetaTag('twitter:description', seo.description);
    updateMetaTag('twitter:image', seo.image || getAbsoluteUrl(siteConfig.ogImage));

    // Article-specific meta tags
    if (seo.type === 'article') {
      if (seo.publishedTime) {
        updateMetaTag('article:published_time', seo.publishedTime, 'property');
      }
      if (seo.modifiedTime) {
        updateMetaTag('article:modified_time', seo.modifiedTime, 'property');
      }
      if (seo.author) {
        updateMetaTag('article:author', seo.author, 'property');
      }
      if (seo.section) {
        updateMetaTag('article:section', seo.section, 'property');
      }
      if (seo.tags && seo.tags.length > 0) {
        seo.tags.forEach((tag) => {
          const tagElement = document.createElement('meta');
          tagElement.setAttribute('property', 'article:tag');
          tagElement.setAttribute('content', tag);
          document.head.appendChild(tagElement);
        });
      }
    } else {
      // Remove article tags if not an article
      removeMetaTag('article:published_time', 'property');
      removeMetaTag('article:modified_time', 'property');
      removeMetaTag('article:author', 'property');
      removeMetaTag('article:section', 'property');
      document.querySelectorAll('meta[property^="article:tag"]').forEach((el) => el.remove());
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.url || currentUrl);

    // Update lang attribute if needed
    document.documentElement.setAttribute('lang', 'en');

  }, [seo, currentUrl]);
}

