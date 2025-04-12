
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  // Calculate the height percentage based on the maximum value
  const heightPercentage = (value / maxValue) * 100;
  
  // Determine the color of the bar based on its state
  const getBarColor = () => {
    if (isSwapping) return 'bg-accent shadow-[0_0_15px_rgba(104,220,255,0.7)]';
    if (isComparing) return 'bg-primary shadow-[0_0_15px_rgba(255,120,180,0.7)]';
    if (isPivot) return 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.7)]';
    if (isSorted) return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]';
    return 'bg-secondary';
  };
  
  // Calculate width based on number of bars and screen size
  const getBarWidth = () => {
    if (isMobile) {
      if (onBar < 10) return 'min-w-[18px] mx-[2px]';
      if (onBar < 20) return 'min-w-[12px] mx-[1.5px]';
      if (onBar < 30) return 'min-w-[8px] mx-[1px]';
      return 'min-w-[4px] mx-[0.5px]';
    } else {
      if (onBar < 20) return 'min-w-[20px] mx-[3px]';
      if (onBar < 40) return 'min-w-[14px] mx-[2px]';
      if (onBar < 60) return 'min-w-[10px] mx-[1.5px]';
      if (onBar < 100) return 'min-w-[6px] mx-[1px]';
      return 'min-w-[3px] mx-[0.5px]';
    }
  };

  // Determine whether to show value labels based on array size and screen
  const shouldShowValue = () => {
    if (isMobile) {
      return onBar < 15;
    }
    return onBar < 25;
  };

  return (
    <motion.div 
      className={`relative flex flex-col justify-end items-center ${getBarWidth()}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ 
        opacity: 1, 
        height: `${heightPercentage}%`,
      }}
      layout
      layoutId={`bar-${index}`}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 17,
        duration: 0.2
      }}
    >
      <motion.div 
        className={cn(
          "w-full rounded-t-sm array-bar",
          getBarColor(),
        )}
        style={{ height: '100%' }}
        whileHover={{ 
          scale: 1.2,
          zIndex: 10, 
          transition: { duration: 0.1 } 
        }}
      />
      
      {shouldShowValue() && (
        <motion.span 
          className="absolute -bottom-6 text-[8px] md:text-[10px] text-foreground bg-background/80 px-1 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {value}
        </motion.span>
      )}
    </motion.div>
  );
};

export default ArrayBar;
