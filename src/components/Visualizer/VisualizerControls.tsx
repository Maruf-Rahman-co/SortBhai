
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Shuffle, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
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
  
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const step = Math.round(position * totalSteps);
    onCurrentStepChange(step);
  };
  
  return (
    <motion.div 
      className="w-full p-4 glass-card rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 gap-4">
        <div 
          className="relative w-full h-2 bg-muted rounded-full cursor-pointer"
          onClick={handleSliderClick}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-primary rounded-full"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
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
          </div>
          
          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {totalSteps + 1}
          </span>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onRandomize}
                    className="h-8 flex gap-1"
                  >
                    <Shuffle size={14} />
                    <span className="hidden sm:inline">Randomize</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate new random array</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-8 flex gap-1"
                >
                  <Settings size={14} />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Algorithm Settings</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="speed">Animation Speed</Label>
                    <div className="flex items-center gap-4 pt-2">
                      <span className="text-xs text-muted-foreground">Slow</span>
                      <Slider
                        id="speed"
                        value={[speed]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => onSpeedChange(value[0])}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground">Fast</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="array-size">Array Size</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="array-size"
                        type="number"
                        value={arraySize}
                        onChange={(e) => onArraySizeChange(parseInt(e.target.value) || 10)}
                        min={5}
                        max={200}
                        className="w-24"
                      />
                      <span className="text-sm text-muted-foreground">elements</span>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button>Apply</Button>
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
