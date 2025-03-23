
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Rewind, 
  FastForward, 
  Shuffle,
  Settings
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VisualizerControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  arraySize: number;
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
  const handleProgressChange = (value: number[]) => {
    onCurrentStepChange(value[0]);
  };
  
  const handleSpeedChange = (value: number[]) => {
    onSpeedChange(value[0]);
  };
  
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const step = Math.round(position * totalSteps);
    onCurrentStepChange(step);
  };
  
  return (
    <motion.div 
      className="max-w-4xl mx-auto p-4 glass-card rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-6">
        <div 
          className="relative w-full h-2 bg-gray-200 rounded-full cursor-pointer mb-1"
          onClick={handleSliderClick}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-primary rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Step {currentStep + 1}</span>
          <span>Total Steps: {totalSteps}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onGoToStart}>
                  <Rewind size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to Start</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onStepBackward}>
                  <SkipBack size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Step Backward</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" size="icon" onClick={onPlayPause}>
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? 'Pause' : 'Play'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onStepForward}>
                  <SkipForward size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Step Forward</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={onGoToEnd}>
                  <FastForward size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to End</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            <div className="w-24">
              <Slider
                value={[speed]}
                min={1}
                max={10}
                step={1}
                onValueChange={handleSpeedChange}
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={onRandomize}>
                    <Shuffle size={16} className="mr-2" />
                    <span>Randomize</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate new random array</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-2" />
                  <span>Settings</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Algorithm Settings</SheetTitle>
                  <SheetDescription>
                    Customize the visualization parameters
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="array-size">Array Size</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="array-size"
                        type="number"
                        value={arraySize}
                        onChange={(e) => onArraySizeChange(parseInt(e.target.value) || 10)}
                        min={5}
                        max={200}
                      />
                      <span className="text-sm text-muted-foreground">elements</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Smaller arrays show more details, larger arrays demonstrate algorithm efficiency.
                    </p>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Apply Changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VisualizerControls;
