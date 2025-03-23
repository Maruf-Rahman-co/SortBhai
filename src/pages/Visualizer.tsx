
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArrayBar from '@/components/Visualizer/ArrayBar';
import VisualizerControls from '@/components/Visualizer/VisualizerControls';
import { getAlgorithmById } from '@/lib/algorithms';
import { generateRandomArray, executeSort, SortingStep } from '@/lib/sorters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Clock, Database, Layers, Code, Server } from 'lucide-react';
import { toast } from 'sonner';

const Visualizer = () => {
  const { algorithmId } = useParams<{ algorithmId: string }>();
  const algorithm = getAlgorithmById(algorithmId || '');
  
  const [arraySize, setArraySize] = useState(30);
  const [array, setArray] = useState<number[]>([]);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize visualizer with random array
  useEffect(() => {
    if (algorithm) {
      initializeArray();
      setIsInitialized(true);
    }
  }, [algorithm, arraySize]);
  
  // Handle auto-play
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= sortingSteps.length - 1) {
            clearInterval(intervalRef.current!);
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1100 - speed * 100); // Speed from 100ms to 1000ms
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, sortingSteps.length]);
  
  const initializeArray = () => {
    // Reset everything
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    }
    
    setCurrentStep(0);
    
    // Generate new random array
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    
    // Generate sorting steps if we have an algorithm
    if (algorithm) {
      try {
        const process = executeSort(algorithm.id, newArray);
        setSortingSteps(process.steps);
      } catch (error) {
        console.error("Error executing sort:", error);
        toast.error("Error executing sort algorithm");
      }
    }
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleStepForward = () => {
    if (currentStep < sortingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleGoToStart = () => {
    setCurrentStep(0);
  };
  
  const handleGoToEnd = () => {
    setCurrentStep(sortingSteps.length - 1);
  };
  
  const handleSpeedChange = (value: number) => {
    setSpeed(value);
  };
  
  const handleArraySizeChange = (size: number) => {
    if (size >= 5 && size <= 200) {
      setArraySize(size);
    }
  };
  
  const getCurrentStep = () => {
    return sortingSteps[currentStep] || { array: [] };
  };
  
  const currentStepData = getCurrentStep();
  const maxValue = Math.max(...array);
  
  if (!algorithm) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Algorithm not found</h1>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Ad space (top banner) */}
          <div className="ad-space w-full mb-6">
            Ad Space - Banner (728×90)
          </div>
          
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link to="/">
                  <ArrowLeft size={16} className="mr-1" />
                  Back
                </Link>
              </Button>
              
              <h1 className="text-2xl md:text-3xl font-bold">{algorithm.name}</h1>
              
              <Badge className="bg-accent text-accent-foreground">
                {algorithm.category}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1 md:col-span-2">
              <motion.div
                className="glass-card p-4 rounded-lg h-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-muted-foreground">
                  {algorithm.description}
                </p>
              </motion.div>
            </div>
            
            <div className="col-span-1">
              <motion.div
                className="grid grid-cols-2 gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <div>
                    <h3 className="text-xs font-medium">Best Case</h3>
                    <p className="text-sm font-mono text-primary">{algorithm.timeComplexityBest}</p>
                  </div>
                </div>
                
                <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <div>
                    <h3 className="text-xs font-medium">Average</h3>
                    <p className="text-sm font-mono text-primary">{algorithm.timeComplexityAverage}</p>
                  </div>
                </div>
                
                <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                  <Clock size={16} className="text-muted-foreground" />
                  <div>
                    <h3 className="text-xs font-medium">Worst Case</h3>
                    <p className="text-sm font-mono text-primary">{algorithm.timeComplexityWorst}</p>
                  </div>
                </div>
                
                <div className="glass-card p-3 rounded-lg flex items-center gap-2">
                  <Database size={16} className="text-muted-foreground" />
                  <div>
                    <h3 className="text-xs font-medium">Space</h3>
                    <p className="text-sm font-mono text-primary">{algorithm.spaceComplexity}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="col-span-1">
              {/* Ad space (side banner) */}
              <div className="ad-space h-full">
                Ad Space<br />Sidebar<br />(300×600)
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-3">
              <motion.div 
                className="visualizer-container mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-[400px] flex items-end justify-center mb-6 pt-6 overflow-visible">
                  {isInitialized && currentStepData.array.map((value, index) => (
                    <ArrayBar
                      key={`${index}-${value}`}
                      value={value}
                      index={index}
                      maxValue={maxValue}
                      isComparing={currentStepData.compare?.includes(index) || false}
                      isSwapping={currentStepData.swap?.includes(index) || false}
                      isSorted={currentStepData.sorted?.includes(index) || false}
                      isPivot={currentStepData.pivot === index}
                      onBar={arraySize}
                    />
                  ))}
                  
                  {!isInitialized && (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">Initializing...</p>
                    </div>
                  )}
                </div>
                
                <VisualizerControls
                  isPlaying={isPlaying}
                  currentStep={currentStep}
                  totalSteps={sortingSteps.length - 1}
                  speed={speed}
                  arraySize={arraySize}
                  onRandomize={initializeArray}
                  onPlayPause={handlePlayPause}
                  onStepForward={handleStepForward}
                  onStepBackward={handleStepBackward}
                  onGoToStart={handleGoToStart}
                  onGoToEnd={handleGoToEnd}
                  onSpeedChange={handleSpeedChange}
                  onCurrentStepChange={setCurrentStep}
                  onArraySizeChange={handleArraySizeChange}
                />
              </motion.div>
              
              <motion.div 
                className="glass-card p-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  <div className="info-chip">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    Comparing
                  </div>
                  <div className="info-chip">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                    Swapping
                  </div>
                  <div className="info-chip">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    Sorted
                  </div>
                  {algorithm.id === 'quick' && (
                    <div className="info-chip">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      Pivot
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-2">
                  <Info size={16} className="text-primary shrink-0 mt-1" />
                  <p className="text-sm text-muted-foreground">
                    Use the controls to play, pause, or step through the sorting process. 
                    You can adjust the speed and array size in the settings menu.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Visualizer;
