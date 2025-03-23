
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ArrayBarProps {
  value: number;
  index: number;
  maxValue: number;
  isComparing: boolean;
  isSwapping: boolean;
  isSorted: boolean;
  isPivot: boolean;
  onBar: number;
}

const ArrayBar: React.FC<ArrayBarProps> = ({
  value,
  index,
  maxValue,
  isComparing,
  isSwapping,
  isSorted,
  isPivot,
  onBar
}) => {
  // Calculate the height percentage based on the maximum value
  const heightPercentage = (value / maxValue) * 100;
  
  // Determine the color of the bar based on its state
  const getBarColor = () => {
    if (isSwapping) return 'bg-accent';
    if (isComparing) return 'bg-primary';
    if (isPivot) return 'bg-purple-500';
    if (isSorted) return 'bg-green-500';
    return 'bg-secondary';
  };
  
  return (
    <motion.div 
      className="relative flex flex-col justify-end items-center"
      initial={{ opacity: 0, height: 0 }}
      animate={{ 
        opacity: 1, 
        height: `${heightPercentage}%`,
        transition: { duration: 0.3 }
      }}
      layout
      layoutId={`bar-${index}`}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{ 
        minWidth: onBar < 30 ? '12px' : onBar < 60 ? '8px' : onBar < 100 ? '4px' : '2px',
        margin: '0 1px'
      }}
    >
      <motion.div 
        className={cn(
          "w-full rounded-t-sm array-bar",
          getBarColor(),
          onBar === index ? 'shadow-lg' : ''
        )}
        style={{ height: '100%' }}
      />
      
      {onBar < 25 && (
        <motion.span 
          className="absolute -bottom-6 text-[10px] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {value}
        </motion.span>
      )}
    </motion.div>
  );
};

export default ArrayBar;
