import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
}

export function useSEO({ title, description, image }: SEOProps) {
  useEffect(() => {
    // Set Document Title
    document.title = `${title} | STUDIO.`;

    // Helper to set or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // Standard Meta
    setMetaTag('name', 'description', description);
    
    // Open Graph (LinkedIn, Facebook, iMessage)
    setMetaTag('property', 'og:title', `${title} | STUDIO.`);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', 'website');
    if (image) setMetaTag('property', 'og:image', image);

    // Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', `${title} | STUDIO.`);
    setMetaTag('name', 'twitter:description', description);
    if (image) setMetaTag('name', 'twitter:image', image);

  }, [title, description, image]);
}
