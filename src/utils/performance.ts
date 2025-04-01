// Debounce function for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Memoize function for caching expensive computations
export const memoize = <T extends (...args: any[]) => any>(
  func: T,
  getKey: (...args: Parameters<T>) => string
): T => {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey(...args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Efficient array operations
export const arrayUtils = {
  // Shuffle array using Fisher-Yates algorithm
  shuffle: <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  // Generate array with unique random numbers
  generateUniqueRandomArray: (size: number, min: number, max: number): number[] => {
    const numbers = new Set<number>();
    while (numbers.size < size) {
      numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers);
  },
};

// Performance monitoring
export const performanceMonitor = {
  startTime: 0,
  
  start: () => {
    performanceMonitor.startTime = performance.now();
  },
  
  end: (label: string) => {
    const endTime = performance.now();
    const duration = endTime - performanceMonitor.startTime;
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  },
};

// Memory management
export const memoryManager = {
  // Clear unused memory
  clearUnusedMemory: () => {
    if (global.gc) {
      global.gc();
    }
  },

  // Get memory usage
  getMemoryUsage: () => {
    const used = process.memoryUsage();
    return {
      heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
      heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
      external: `${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`,
    };
  },
};

// State management utilities
export const stateManager = {
  // Create a simple state store
  createStore: <T>(initialState: T) => {
    let state = initialState;
    const listeners = new Set<(state: T) => void>();

    return {
      getState: () => state,
      setState: (newState: T | ((prev: T) => T)) => {
        state = typeof newState === 'function' ? (newState as (prev: T) => T)(state) : newState;
        listeners.forEach(listener => listener(state));
      },
      subscribe: (listener: (state: T) => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
    };
  },
}; 