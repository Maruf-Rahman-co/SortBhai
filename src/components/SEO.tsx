import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const BASE_URL = import.meta.env.BASE_URL || '';
const SITE_URL = 'https://sortbhai.com';

const SEO = ({ 
  title = 'SortBhai - Algorithm Visualization Tool',
  description = 'Visualize and understand various sorting algorithms with interactive animations and step-by-step explanations.',
  image = `${SITE_URL}/og-image.png`,
  url = SITE_URL,
  type = 'website'
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href={`${BASE_URL}favicon.ico`} />
      <link rel="apple-touch-icon" href={`${BASE_URL}apple-touch-icon.png`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SortBhai",
          "description": description,
          "url": url,
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO; 