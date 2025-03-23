
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Cookie, Shield, Lock, Server, Eye, Database } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            className="glass-card p-6 rounded-lg mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Cookie size={32} className="text-primary" />
              <h1 className="text-3xl font-bold">Cookies Policy</h1>
            </div>
            
            <p className="mb-6 text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Cookie size={20} className="text-accent" />
                  What Are Cookies
                </h2>
                <p className="text-muted-foreground">
                  Cookies are small pieces of text sent to your web browser by a website you visit. 
                  A cookie file is stored in your web browser and allows the Service or a third-party to 
                  recognize you and make your next visit easier and the Service more useful to you.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Server size={20} className="text-accent" />
                  How We Use Cookies
                </h2>
                <p className="text-muted-foreground mb-3">
                  When you use and access the Service, we may place a number of cookie files in your web browser.
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>To enable certain functions of the Service</li>
                  <li>To provide analytics</li>
                  <li>To store your preferences</li>
                  <li>To enable advertisements delivery, including behavioral advertising</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  We use both session and persistent cookies on the Service and we use different types of 
                  cookies to run the Service.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Database size={20} className="text-accent" />
                  Types of Cookies We Use
                </h2>
                <div className="space-y-3">
                  <div className="ml-4">
                    <h3 className="font-medium">Essential cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies are essential to provide you with services available through our website and to 
                      enable you to use some of its features.
                    </p>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Analytics cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies allow us to analyze how our website is used and to monitor its performance, 
                      which helps us to provide a better user experience.
                    </p>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Functionality cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies allow our website to remember choices you make when you use our website.
                    </p>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Advertising cookies</h3>
                    <p className="text-muted-foreground">
                      These cookies collect information about your browsing habits to make advertising relevant to you and your interests.
                    </p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Eye size={20} className="text-accent" />
                  How to Control Your Cookies
                </h2>
                <p className="text-muted-foreground">
                  Most browsers allow you to control cookies through their settings preferences. 
                  However, if you limit the ability of websites to set cookies, you may worsen your overall user 
                  experience, since it will no longer be personalized to you. It may also stop you from saving 
                  customized settings like login information.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Shield size={20} className="text-accent" />
                  Privacy Policy
                </h2>
                <p className="text-muted-foreground">
                  To learn more about how we protect your data, please refer to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;
