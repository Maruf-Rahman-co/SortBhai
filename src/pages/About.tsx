
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Code, GitBranch, Monitor, Coffee, Heart, Cpu, Smile, Zap, Sparkles } from 'lucide-react';

const About = () => {
  const techStack = [
    { name: "React", icon: <Code className="h-5 w-5 text-blue-400" />, description: "For building the UI components" },
    { name: "TypeScript", icon: <Cpu className="h-5 w-5 text-blue-500" />, description: "For type safety" },
    { name: "Framer Motion", icon: <Zap className="h-5 w-5 text-purple-400" />, description: "For those buttery-smooth animations" },
    { name: "Tailwind CSS", icon: <Sparkles className="h-5 w-5 text-teal-400" />, description: "For the minimalist design" },
    { name: "Vite", icon: <GitBranch className="h-5 w-5 text-yellow-400" />, description: "For lightning-fast development" }
  ];

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
              <div className="flex items-center justify-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Cpu className="h-8 w-8 text-primary" />
                </motion.div>
                <h1 className="text-3xl font-bold">About SortBhai</h1>
              </div>
              
              <div className="space-y-6 text-foreground">
                <div className="flex items-start gap-4 bg-muted/30 p-4 rounded-lg border border-border/20">
                  <Coffee className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <p>
                    Welcome to SortBhai, where I turn the seemingly complex world of sorting algorithms into a visually delightful experience. I'm Maruf Rahman, a solo developer based in the UAE with a passion for both elegant code and beautiful design.
                  </p>
                </div>
                
                <h2 className="text-xl font-semibold text-foreground mt-8 flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-primary" />
                  The Origin Story
                </h2>
                
                <p>
                  SortBhai was born from a simple realization: sorting algorithms are fascinating, but they can be intimidating when represented as just lines of code. I wanted to create something that would make these fundamental computer science concepts accessible to everyone, from curious beginners to experienced developers looking to refresh their knowledge.
                </p>
                
                <div className="flex items-start gap-3 bg-muted/30 p-4 rounded-lg border border-border/20">
                  <Smile className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                  <p>
                    Why "SortBhai"? Well, "bhai" means "brother" in several languages, and I wanted this app to feel like a friendly guide – your sorting brother, if you will – helping you understand these algorithms in a way that's both informative and delightful.
                  </p>
                </div>
                
                <h2 className="text-xl font-semibold text-foreground mt-8 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  The Technology
                </h2>
                
                <p>
                  SortBhai is built with modern web technologies focused on performance and beautiful interactions. The animations aren't just eye candy – they're carefully crafted to illustrate exactly how each algorithm works, step by step.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {techStack.map((tech, index) => (
                    <motion.div 
                      key={tech.name}
                      className="flex items-start gap-3 p-3 bg-card/80 rounded-lg border border-border/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <div className="mt-1 flex-shrink-0">{tech.icon}</div>
                      <div>
                        <h3 className="font-medium">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold text-foreground mt-8 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  The Vision
                </h2>
                
                <p>
                  My vision for SortBhai is to create the most beautiful, intuitive algorithm visualization tool on the web. I believe that learning should be a delightful experience, and that's what I've aimed to create here.
                </p>
                
                <p>
                  I'm constantly refining and expanding SortBhai. Future plans include adding more algorithms, deeper explanations, and interactive coding challenges. Your feedback is invaluable in this journey!
                </p>
                
                <div className="flex justify-center pt-6">
                  <Button asChild size="lg">
                    <Link to="/" className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> Explore Algorithms
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Ad Space */}
          <div className="mt-10 ad-space">
            <p className="text-muted-foreground">Ad Space</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
