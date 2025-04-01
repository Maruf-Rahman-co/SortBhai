import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, BarChart2, GitBranch, Zap } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5" />
        
        {/* Animated Sorting Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-lg opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
            x: [0, 10, 0],
            y: [0, 15, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-80 h-80 bg-accent/10 rounded-lg opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -5, 0],
            x: [0, -20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Algorithm Icons */}
        <motion.div 
          className="absolute top-40 right-1/4"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <BarChart2 className="w-12 h-12 text-primary/30" />
        </motion.div>
        <motion.div 
          className="absolute bottom-40 left-1/4"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <GitBranch className="w-12 h-12 text-accent/30" />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-1/3"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-12 h-12 text-secondary/30" />
        </motion.div>
      </div>
      
      <div className="container px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="inline-block px-4 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                Visual Learning Made Simple
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              SortBhai
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Experience the elegance of sorting algorithms through beautiful, interactive visualizations. Learn, understand, and master algorithms with our intuitive platform.
            </motion.p>
            
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="rounded-full"
                onClick={onExploreClick}
              >
                Explore Algorithms
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="rounded-full"
                onClick={onExploreClick}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Feature Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {[
              { title: "Interactive Visualizations", desc: "Real-time algorithm animations" },
              { title: "Multiple Algorithms", desc: "From Bubble to Quick Sort" },
              { title: "Performance Metrics", desc: "Time and space complexity analysis" },
              { title: "Step-by-Step Guide", desc: "Detailed algorithm explanations" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1, duration: 0.5 },
          y: { delay: 1, duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full animate-float"
          onClick={onExploreClick}
        >
          <ChevronDown />
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
