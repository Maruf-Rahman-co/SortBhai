import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Shuffle } from 'lucide-react';
import { sortingAlgorithms } from '@/lib/algorithms';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VisualizerControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  arraySize: number;
  currentAlgorithmId: string;
  onRandomize: () => void;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onGoToStart: () => void;
  onGoToEnd: () => void;
  onSpeedChange: (value: number) => void;
  onCurrentStepChange: (step: number) => void;
  onArraySizeChange: (size: number) => void;
}

const VisualizerControls: React.FC<VisualizerControlsProps> = ({
  isPlaying,
  currentStep,
  totalSteps,
  speed,
  arraySize,
  currentAlgorithmId,
  onRandomize,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onGoToStart,
  onGoToEnd,
  onSpeedChange,
  onCurrentStepChange,
  onArraySizeChange
}) => {
  const navigate = useNavigate();
  
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const step = Math.round(position * totalSteps);
    onCurrentStepChange(step);
  };

  const handleAlgorithmChange = (algorithmId: string) => {
    navigate(`/visualize/${algorithmId}`);
  };
  
  return (
    <motion.div 
      className="glass-card p-4 rounded-lg mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onGoToStart}
            className="h-8 w-8"
          >
            <Rewind size={14} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onStepBackward}
            className="h-8 w-8"
          >
            <SkipBack size={14} />
          </Button>
          
          <Button 
            variant={isPlaying ? "secondary" : "default"} 
            size="icon" 
            onClick={onPlayPause}
            className="h-9 w-9"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onStepForward}
            className="h-8 w-8"
          >
            <SkipForward size={14} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onGoToEnd}
            className="h-8 w-8"
          >
            <FastForward size={14} />
          </Button>
          
          <span className="text-xs text-muted-foreground ml-2">
            {currentStep + 1} / {totalSteps + 1}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 min-w-[150px]">
            <span className="text-xs whitespace-nowrap">Speed:</span>
            <Slider
              value={[speed]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => onSpeedChange(value[0])}
              className="w-24"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs whitespace-nowrap">Size:</span>
            <Slider
              value={[arraySize]}
              min={5}
              max={100}
              step={5}
              onValueChange={(value) => onArraySizeChange(value[0])}
              className="w-24"
            />
            <span className="text-xs text-muted-foreground ml-1">{arraySize}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onRandomize}
            className="flex items-center gap-2"
          >
            <Shuffle size={14} />
            <span className="hidden sm:inline">Randomize</span>
          </Button>

          <Select value={currentAlgorithmId} onValueChange={handleAlgorithmChange}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              {sortingAlgorithms.map((algo) => (
                <SelectItem key={algo.id} value={algo.id}>
                  {algo.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default VisualizerControls;
