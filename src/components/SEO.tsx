import { Helmet } from 'react-helmet-async';
import meta from '../data/meta.json';

const SITE_URL = import.meta.env.VITE_SITE_URL || '';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

export default function SEO({ title, description, path = '/' }: SEOProps) {
  const seoTitle = title || `${meta.name} | ${meta.role}`;
  const seoDescription = description || meta.tagline;
  const canonicalUrl = SITE_URL ? `${SITE_URL}${path}` : undefined;
  const ogImageUrl = '/og-image.jpg';

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta
        name="keywords"
        content="Madhan Mohan Reddy Peram, Madhan Mohan Reddy Peram portfolio, Madhan Mohan Reddy Peram developer, full-stack developer, React developer, MERN stack"
      />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImageUrl} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={meta.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Helmet>
  );
}
