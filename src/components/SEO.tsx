
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  pathname?: string; // Added pathname prop for cases when outside Router
}

const BASE_URL = import.meta.env.BASE_URL || '';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://sortbhai.com';

const SEO = ({ 
  title = 'SortBhai - Algorithm Visualization Tool',
  description = 'Visualize and understand various sorting algorithms with interactive animations and step-by-step explanations.',
  image,
  type = 'website',
  pathname
}: SEOProps) => {
  // Try to use location if available, otherwise use pathname prop or empty string
  let currentPath = '';
  try {
    const location = useLocation();
    currentPath = location.pathname;
  } catch (e) {
    currentPath = pathname || '';
  }
  
  // Get the current URL dynamically
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${currentPath}`
    : '';
    
  // Build image URL dynamically
  const imageUrl = image || `${window.location.origin}/og-image.png`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SortBhai",
          "description": description,
          "url": currentUrl,
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
