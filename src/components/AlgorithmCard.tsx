
import React from 'react';
import { motion } from 'framer-motion';
import { SortingAlgorithm } from '@/lib/algorithms';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AlgorithmCardProps {
  algorithm: SortingAlgorithm;
  delay: number;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ algorithm, delay }) => {
  return (
    <motion.div
      className="algo-card card-hover-effect"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <Badge variant="outline" className="mb-2">
            {algorithm.category}
          </Badge>
          <h3 className="text-xl font-semibold mt-2">{algorithm.name}</h3>
          <p className="text-sm text-muted-foreground mt-2">{algorithm.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-auto">
          <div className="text-xs">
            <span className="font-medium text-muted-foreground">Best:</span>{' '}
            <span className="font-mono">{algorithm.timeComplexityBest}</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-muted-foreground">Avg:</span>{' '}
            <span className="font-mono">{algorithm.timeComplexityAverage}</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-muted-foreground">Worst:</span>{' '}
            <span className="font-mono">{algorithm.timeComplexityWorst}</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-muted-foreground">Space:</span>{' '}
            <span className="font-mono">{algorithm.spaceComplexity}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <div className="text-xs flex flex-wrap gap-2">
            {algorithm.stable && (
              <Badge variant="secondary" className="text-xs">Stable</Badge>
            )}
            {algorithm.inPlace && (
              <Badge variant="secondary" className="text-xs">In-Place</Badge>
            )}
          </div>
          
          <Button asChild>
            <Link to={`/visualize/${algorithm.id}`}>Visualize</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlgorithmCard;
