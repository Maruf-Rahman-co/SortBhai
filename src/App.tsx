
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect } from 'react';
import SEO from './components/SEO';

// Lazy load components for better performance
const IndexPage = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const VisualizerPage = lazy(() => import("./pages/Visualizer"));
const TermsPage = lazy(() => import("./pages/Terms"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const CookiesPage = lazy(() => import("./pages/Cookies"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Create a client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (previously cacheTime)
    },
  },
});

// ScrollToTop component to handle scroll position on route change
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);
  
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Sonner position="top-right" theme="dark" />
          <BrowserRouter>
            <SEO /> {/* Moved inside BrowserRouter */}
            <ScrollToTop />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/visualize/:algorithmId" element={<VisualizerPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/cookies" element={<CookiesPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
