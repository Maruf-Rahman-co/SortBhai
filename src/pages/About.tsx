
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const About = () => {
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
              <h1 className="text-3xl font-bold mb-6">About SortBhai</h1>
              
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Welcome to SortBhai, where I turn the seemingly complex world of sorting algorithms into a visually delightful experience. I'm Maruf Rahman, a solo developer based in the UAE with a passion for both elegant code and beautiful design.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">The Origin Story</h2>
                
                <p>
                  SortBhai was born from a simple realization: sorting algorithms are fascinating, but they can be intimidating when represented as just lines of code. I wanted to create something that would make these fundamental computer science concepts accessible to everyone, from curious beginners to experienced developers looking to refresh their knowledge.
                </p>
                
                <p>
                  Why "SortBhai"? Well, "bhai" means "brother" in several languages, and I wanted this app to feel like a friendly guide – your sorting brother, if you will – helping you understand these algorithms in a way that's both informative and delightful.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">The Technology</h2>
                
                <p>
                  SortBhai is built with modern web technologies focused on performance and beautiful interactions. The animations aren't just eye candy – they're carefully crafted to illustrate exactly how each algorithm works, step by step.
                </p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>React for the UI components</li>
                  <li>Framer Motion for those buttery-smooth animations</li>
                  <li>Tailwind CSS for the minimalist, Apple-inspired design</li>
                  <li>TypeScript for type safety and better development experience</li>
                </ul>
                
                <h2 className="text-xl font-semibold text-foreground mt-8">The Vision</h2>
                
                <p>
                  My vision for SortBhai is to create the most beautiful, intuitive algorithm visualization tool on the web. I believe that learning should be a delightful experience, and that's what I've aimed to create here.
                </p>
                
                <p>
                  I'm constantly refining and expanding SortBhai. Future plans include adding more algorithms, deeper explanations, and interactive coding challenges. Your feedback is invaluable in this journey!
                </p>
                
                <div className="pt-6">
                  <Button asChild>
                    <Link to="/">Explore Algorithms</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
