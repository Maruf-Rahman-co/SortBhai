
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container px-4 py-16 max-w-4xl mx-auto">
          <motion.div 
            className="glass-card p-8 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
              
              <div className="space-y-6 text-muted-foreground">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                
                <p>
                  Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the SortBhai website (the "Service") operated by Maruf Rahman ("I", "me", "my").
                </p>
                
                <p>
                  Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                </p>
                
                <p>
                  By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Content</h2>
                
                <p>
                  The SortBhai service provides educational content about sorting algorithms. All content is provided for informational and educational purposes only.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Links To Other Web Sites</h2>
                
                <p>
                  The Service may contain links to third-party web sites or services that are not owned or controlled by SortBhai.
                </p>
                
                <p>
                  SortBhai has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that SortBhai shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Changes</h2>
                
                <p>
                  I reserve the right, at my sole discretion, to modify or replace these Terms at any time. If a revision is material I will try to provide at least 15 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at my sole discretion.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
                
                <p>
                  If you have any questions about these Terms, please contact me via the contact page.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
