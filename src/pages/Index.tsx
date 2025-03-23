
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AlgorithmCategorySection from '@/components/AlgorithmCategorySection';
import { getAllCategories, getAlgorithmsByCategory } from '@/lib/algorithms';

const Index = () => {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categories = getAllCategories();
  
  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <Hero onExploreClick={scrollToCategories} />
        
        <motion.div 
          className="container px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          ref={categoriesRef}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Explore Sorting Algorithms</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover and visualize different sorting algorithms categorized by their approach and efficiency.
              </p>
            </motion.div>
            
            {categories.map((category, index) => (
              <AlgorithmCategorySection 
                key={category}
                title={category} 
                algorithms={getAlgorithmsByCategory(category)}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
