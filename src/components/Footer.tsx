import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieConsent(false);
  };

  return (
    <>
      <motion.footer 
        className="glass-footer py-10 mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SortBhai</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                A beautiful sorting algorithm visualizer designed to help you understand how different sorting algorithms work.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} SortBhai by Maruf Rahman. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <motion.a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.footer>

      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 z-50"
          >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Cookie className="w-5 h-5 text-primary" />
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = '/privacy'}
                >
                  Learn More
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptCookies}
                >
                  Accept
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
