import { useEffect } from 'react';

interface PageMetadataOptions {
  title: string;
  description: string;
  type?: 'website' | 'article';
  publishedDate?: string;
  section?: string;
}

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string): void {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(url: string): void {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
}

export function usePageMetadata({
  title,
  description,
  type = 'website',
  publishedDate,
  section,
}: PageMetadataOptions): void {
  useEffect(() => {
    document.title = title;
    const currentUrl = window.location.origin + window.location.pathname;

    upsertMetaTag('name', 'description', description);
    upsertMetaTag('property', 'og:type', type);
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:url', currentUrl);
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertCanonical(currentUrl);

    const ldId = 'dynamic-page-jsonld';
    let ldScript = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = ldId;
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }

    const structuredData =
      type === 'article'
        ? {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: title,
            description,
            datePublished: publishedDate,
            articleSection: section,
            url: currentUrl,
            author: {
              '@type': 'Person',
              name: 'Vaibhav Sharma',
            },
          }
        : {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description,
            url: currentUrl,
          };

    ldScript.textContent = JSON.stringify(structuredData);
  }, [title, description, type, publishedDate, section]);
}
