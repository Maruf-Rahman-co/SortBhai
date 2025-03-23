
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
import { ArrowLeft, Info } from 'lucide-react';
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
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Button asChild variant="ghost" className="mr-2">
                <Link to="/">
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Link>
              </Button>
              
              <h1 className="text-2xl md:text-3xl font-bold">{algorithm.name}</h1>
              
              <Badge variant="outline" className="ml-4">
                {algorithm.category}
              </Badge>
            </div>
            
            <p className="text-muted-foreground mb-4">
              {algorithm.description}
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="glass-card p-3 rounded-lg">
                <h3 className="text-xs font-medium mb-1">Best Case</h3>
                <p className="text-sm font-mono">{algorithm.timeComplexityBest}</p>
              </div>
              
              <div className="glass-card p-3 rounded-lg">
                <h3 className="text-xs font-medium mb-1">Average Case</h3>
                <p className="text-sm font-mono">{algorithm.timeComplexityAverage}</p>
              </div>
              
              <div className="glass-card p-3 rounded-lg">
                <h3 className="text-xs font-medium mb-1">Worst Case</h3>
                <p className="text-sm font-mono">{algorithm.timeComplexityWorst}</p>
              </div>
              
              <div className="glass-card p-3 rounded-lg">
                <h3 className="text-xs font-medium mb-1">Space Complexity</h3>
                <p className="text-sm font-mono">{algorithm.spaceComplexity}</p>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="visualizer-container mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-[400px] flex items-end justify-center mb-8 overflow-hidden pt-8">
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
            className="glass-card p-6 rounded-2xl max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-start space-x-3">
              <Info size={20} className="text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-medium mb-2">How to use this visualizer</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  <li>Use the control buttons to play, pause, or step through the sorting process</li>
                  <li>The speed slider allows you to adjust how fast the algorithm runs</li>
                  <li>Click "Randomize" to generate a new random array</li>
                  <li>Items being compared are highlighted in blue</li>
                  <li>Items being swapped are highlighted in amber</li>
                  <li>Sorted items are highlighted in green</li>
                  {algorithm.id === 'quick' && <li>Pivot elements are highlighted in purple</li>}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Visualizer;
