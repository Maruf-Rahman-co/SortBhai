import { arrayUtils } from './performance';

// Base interface for sorting algorithms
interface SortingAlgorithm {
  name: string;
  sort: (array: number[]) => number[];
  complexity: {
    time: string;
    space: string;
  };
}

// Optimized sorting algorithms
export const algorithms: Record<string, SortingAlgorithm> = {
  bubbleSort: {
    name: 'Bubble Sort',
    sort: (array: number[]) => {
      const arr = [...array];
      let swapped: boolean;
      do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
            swapped = true;
          }
        }
      } while (swapped);
      return arr;
    },
    complexity: {
      time: 'O(n²)',
      space: 'O(1)'
    }
  },

  quickSort: {
    name: 'Quick Sort',
    sort: (array: number[]) => {
      const arr = [...array];
      
      const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
          if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
      };
      
      const quickSortHelper = (low: number, high: number) => {
        if (low < high) {
          const pi = partition(low, high);
          quickSortHelper(low, pi - 1);
          quickSortHelper(pi + 1, high);
        }
      };
      
      quickSortHelper(0, arr.length - 1);
      return arr;
    },
    complexity: {
      time: 'O(n log n)',
      space: 'O(log n)'
    }
  },

  mergeSort: {
    name: 'Merge Sort',
    sort: (array: number[]) => {
      const arr = [...array];
      
      const merge = (left: number[], right: number[]): number[] => {
        const result: number[] = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
          if (left[i] <= right[j]) {
            result.push(left[i++]);
          } else {
            result.push(right[j++]);
          }
        }
        
        return [...result, ...left.slice(i), ...right.slice(j)];
      };
      
      const mergeSortHelper = (arr: number[]): number[] => {
        if (arr.length <= 1) return arr;
        
        const mid = Math.floor(arr.length / 2);
        const left = mergeSortHelper(arr.slice(0, mid));
        const right = mergeSortHelper(arr.slice(mid));
        
        return merge(left, right);
      };
      
      return mergeSortHelper(arr);
    },
    complexity: {
      time: 'O(n log n)',
      space: 'O(n)'
    }
  },

  insertionSort: {
    name: 'Insertion Sort',
    sort: (array: number[]) => {
      const arr = [...array];
      for (let i = 1; i < arr.length; i++) {
        let current = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > current) {
          arr[j + 1] = arr[j];
          j--;
        }
        arr[j + 1] = current;
      }
      return arr;
    },
    complexity: {
      time: 'O(n²)',
      space: 'O(1)'
    }
  },

  selectionSort: {
    name: 'Selection Sort',
    sort: (array: number[]) => {
      const arr = [...array];
      for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      }
      return arr;
    },
    complexity: {
      time: 'O(n²)',
      space: 'O(1)'
    }
  },

  heapSort: {
    name: 'Heap Sort',
    sort: (array: number[]) => {
      const arr = [...array];
      
      const heapify = (n: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest]) {
          largest = left;
        }
        
        if (right < n && arr[right] > arr[largest]) {
          largest = right;
        }
        
        if (largest !== i) {
          [arr[i], arr[largest]] = [arr[largest], arr[i]];
          heapify(n, largest);
        }
      };
      
      for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        heapify(arr.length, i);
      }
      
      for (let i = arr.length - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(i, 0);
      }
      
      return arr;
    },
    complexity: {
      time: 'O(n log n)',
      space: 'O(1)'
    }
  }
};

// Algorithm visualization utilities
export const visualizationUtils = {
  // Generate visualization steps for an algorithm
  generateSteps: (algorithm: SortingAlgorithm, array: number[]) => {
    const steps: number[][] = [];
    const originalArray = [...array];
    
    // Add initial state
    steps.push([...array]);
    
    // Implement step generation for each algorithm
    // This is a simplified version - you would need to modify the actual algorithms
    // to track their steps
    const sortedArray = algorithm.sort(array);
    steps.push(sortedArray);
    
    return steps;
  },
  
  // Calculate animation duration based on array size
  calculateAnimationDuration: (arraySize: number): number => {
    return Math.min(Math.max(arraySize * 50, 1000), 5000);
  },
  
  // Generate color gradient for visualization
  generateColorGradient: (size: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < size; i++) {
      const hue = (i / size) * 360;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  }
};

// Algorithm performance testing
export const algorithmTester = {
  // Test algorithm performance with different array sizes
  testPerformance: (algorithm: SortingAlgorithm, sizes: number[]) => {
    const results: Record<number, number> = {};
    
    sizes.forEach(size => {
      const array = arrayUtils.generateUniqueRandomArray(size, 1, 1000);
      const start = performance.now();
      algorithm.sort(array);
      const end = performance.now();
      results[size] = end - start;
    });
    
    return results;
  },
  
  // Compare algorithms performance
  compareAlgorithms: (sizes: number[]) => {
    const results: Record<string, Record<number, number>> = {};
    
    Object.entries(algorithms).forEach(([name, algorithm]) => {
      results[name] = algorithmTester.testPerformance(algorithm, sizes);
    });
    
    return results;
  }
}; 