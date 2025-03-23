
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
    if (isSwapping) return 'bg-amber-500';
    if (isComparing) return 'bg-blue-500';
    if (isPivot) return 'bg-purple-500';
    if (isSorted) return 'bg-green-500';
    return 'bg-indigo-400';
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
    >
      <motion.div 
        className={cn(
          "w-full rounded-t-sm array-bar",
          getBarColor(),
          onBar === index ? 'shadow-lg' : ''
        )}
        style={{ 
          width: onBar < 50 ? '12px' : onBar < 100 ? '8px' : '4px',
          marginLeft: '1px',
          marginRight: '1px'
        }}
      />
      
      {onBar < 30 && (
        <motion.span 
          className="absolute -bottom-6 text-[10px] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}
        </motion.span>
      )}
    </motion.div>
  );
};

export default ArrayBar;
