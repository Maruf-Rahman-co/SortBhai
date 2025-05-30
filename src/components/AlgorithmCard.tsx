
import React from 'react';
import { motion } from 'framer-motion';
import { SortingAlgorithm } from '@/lib/algorithms';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, Cpu, Scale, Database, ExternalLink } from 'lucide-react';

interface AlgorithmCardProps {
  algorithm: SortingAlgorithm;
  delay: number;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ algorithm, delay }) => {
  return (
    <motion.div
      className="algo-card"
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
        
        <div className="algo-metrics mt-auto">
          <div className="metric-item">
            <span className="metric-label flex items-center gap-1">
              <Clock className="w-3 h-3" /> Best
            </span>
            <span className="metric-value">{algorithm.timeComplexityBest}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label flex items-center gap-1">
              <Clock className="w-3 h-3" /> Avg
            </span>
            <span className="metric-value">{algorithm.timeComplexityAverage}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label flex items-center gap-1">
              <Clock className="w-3 h-3" /> Worst
            </span>
            <span className="metric-value">{algorithm.timeComplexityWorst}</span>
          </div>
          <div className="metric-item">
            <span className="metric-label flex items-center gap-1">
              <Database className="w-3 h-3" /> Space
            </span>
            <span className="metric-value">{algorithm.spaceComplexity}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="text-xs flex flex-wrap gap-2">
            {algorithm.stable && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Scale className="w-3 h-3" /> Stable
              </Badge>
            )}
            {algorithm.inPlace && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <Cpu className="w-3 h-3" /> In-Place
              </Badge>
            )}
          </div>
          
          <Button asChild>
            <Link to={`/visualize/${algorithm.id}`} className="flex items-center gap-1">
              Visualize <ExternalLink className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AlgorithmCard;
