
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
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
              <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
              
              <div className="space-y-6 text-muted-foreground">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                
                <p>
                  Maruf Rahman ("I", "me", "my") operates the SortBhai website (the "Service"). This page informs you of my policies regarding the collection, use, and disclosure of Personal Information when you use the Service.
                </p>
                
                <p>
                  I will not use or share your information with anyone except as described in this Privacy Policy.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Information Collection And Use</h2>
                
                <p>
                  While using the Service, I may ask you to provide certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address, name ("Personal Information").
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Log Data</h2>
                
                <p>
                  I collect information that your browser sends whenever you visit the Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of the Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Cookies</h2>
                
                <p>
                  Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.
                </p>
                
                <p>
                  I use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of the Service.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Service Providers</h2>
                
                <p>
                  I may employ third-party companies and individuals to facilitate the Service, to provide the Service on my behalf, to perform Service-related services or to assist me in analyzing how the Service is used.
                </p>
                
                <p>
                  These third parties have access to your Personal Information only to perform these tasks on my behalf and are obligated not to disclose or use it for any other purpose.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Security</h2>
                
                <p>
                  The security of your Personal Information is important to me, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While I strive to use commercially acceptable means to protect your Personal Information, I cannot guarantee its absolute security.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Changes To This Privacy Policy</h2>
                
                <p>
                  I may update this Privacy Policy from time to time. I will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
                
                <p>
                  If you have any questions about this Privacy Policy, please contact me via the contact page.
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

export default Privacy;
