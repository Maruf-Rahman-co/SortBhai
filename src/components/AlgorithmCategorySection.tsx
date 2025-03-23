
import React from 'react';
import { motion } from 'framer-motion';
import { SortingAlgorithm } from '@/lib/algorithms';
import AlgorithmCard from './AlgorithmCard';

interface AlgorithmCategorySectionProps {
  title: string;
  algorithms: SortingAlgorithm[];
  index: number;
}

const AlgorithmCategorySection: React.FC<AlgorithmCategorySectionProps> = ({ 
  title, 
  algorithms,
  index
}) => {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-foreground flex items-center gap-2">
        <div className="w-1.5 h-8 bg-primary rounded-full"></div>
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algorithm, i) => (
          <AlgorithmCard 
            key={algorithm.id} 
            algorithm={algorithm} 
            delay={i}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AlgorithmCategorySection;
