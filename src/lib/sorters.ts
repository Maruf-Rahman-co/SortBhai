
// Define the data types used throughout the sorting algorithms
export type SortingStep = {
  array: number[];
  compare?: [number, number]; // Indices being compared
  swap?: [number, number];   // Indices being swapped
  pivot?: number;            // Index of pivot element
  sorted?: number[];         // Indices that are in their final sorted position
};

export type SortingProcess = {
  algorithm: string;
  steps: SortingStep[];
};

// Generate a random array of numbers
export const generateRandomArray = (size: number, min: number = 5, max: number = 100): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

// Clone an array to avoid mutation
const cloneArray = (arr: number[]): number[] => [...arr];

// Bubble Sort
export const bubbleSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'bubble',
    steps: [{ array: cloneArray(array) }]
  };
  
  const length = array.length;
  const arr = cloneArray(array);
  const sorted: number[] = [];
  
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      // Add step for comparison
      process.steps.push({
        array: cloneArray(arr),
        compare: [j, j + 1],
        sorted: [...sorted]
      });
      
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        // Add step for swap
        process.steps.push({
          array: cloneArray(arr),
          swap: [j, j + 1],
          sorted: [...sorted]
        });
      }
    }
    // Mark the largest element as sorted
    sorted.unshift(length - i - 1);
    
    // Add step showing the sorted element
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
  }
  
  return process;
};

// Selection Sort
export const selectionSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'selection',
    steps: [{ array: cloneArray(array) }]
  };
  
  const length = array.length;
  const arr = cloneArray(array);
  const sorted: number[] = [];
  
  for (let i = 0; i < length; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < length; j++) {
      // Add step for comparison
      process.steps.push({
        array: cloneArray(arr),
        compare: [minIndex, j],
        sorted: [...sorted]
      });
      
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      // Swap elements
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      
      // Add step for swap
      process.steps.push({
        array: cloneArray(arr),
        swap: [i, minIndex],
        sorted: [...sorted]
      });
    }
    
    // Mark element as sorted
    sorted.push(i);
    
    // Add step showing the sorted element
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
  }
  
  return process;
};

// Insertion Sort
export const insertionSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'insertion',
    steps: [{ array: cloneArray(array) }]
  };
  
  const length = array.length;
  const arr = cloneArray(array);
  const sorted: number[] = [0]; // First element is considered sorted initially
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
  
  for (let i = 1; i < length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      // Add step for comparison
      process.steps.push({
        array: cloneArray(arr),
        compare: [j, j + 1],
        sorted: [...sorted]
      });
      
      arr[j + 1] = arr[j];
      
      // Add step for shift
      process.steps.push({
        array: cloneArray(arr),
        swap: [j, j + 1],
        sorted: [...sorted]
      });
      
      j--;
    }
    
    arr[j + 1] = key;
    sorted.push(i);
    
    // Add step showing the inserted element
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
  }
  
  return process;
};

// Merge Sort
export const mergeSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'merge',
    steps: [{ array: cloneArray(array) }]
  };
  
  const arr = cloneArray(array);
  const sorted: number[] = [];
  
  const mergeSortHelper = (arr: number[], start: number, end: number): number[] => {
    if (start >= end) {
      return [arr[start]];
    }
    
    const mid = Math.floor((start + end) / 2);
    
    const leftArr = mergeSortHelper(arr, start, mid);
    const rightArr = mergeSortHelper(arr, mid + 1, end);
    
    const mergedArr = merge(leftArr, rightArr, start, mid, end);
    
    // Update the original array
    for (let i = 0; i < mergedArr.length; i++) {
      arr[start + i] = mergedArr[i];
    }
    
    // Add step showing the merged subarray
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
    
    return mergedArr;
  };
  
  const merge = (leftArr: number[], rightArr: number[], start: number, mid: number, end: number): number[] => {
    const merged: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      // Add step for comparison
      process.steps.push({
        array: cloneArray(arr),
        compare: [start + leftIndex, mid + 1 + rightIndex],
        sorted: [...sorted]
      });
      
      if (leftArr[leftIndex] <= rightArr[rightIndex]) {
        merged.push(leftArr[leftIndex]);
        leftIndex++;
      } else {
        merged.push(rightArr[rightIndex]);
        rightIndex++;
      }
    }
    
    while (leftIndex < leftArr.length) {
      merged.push(leftArr[leftIndex]);
      leftIndex++;
    }
    
    while (rightIndex < rightArr.length) {
      merged.push(rightArr[rightIndex]);
      rightIndex++;
    }
    
    return merged;
  };
  
  mergeSortHelper(arr, 0, arr.length - 1);
  
  // Mark all elements as sorted in the final step
  for (let i = 0; i < arr.length; i++) {
    sorted.push(i);
  }
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
  
  return process;
};

// Quick Sort
export const quickSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'quick',
    steps: [{ array: cloneArray(array) }]
  };
  
  const arr = cloneArray(array);
  const sorted: number[] = [];
  
  const quickSortHelper = (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high);
      
      // Mark pivot as sorted
      sorted.push(pivotIndex);
      
      // Add step showing pivot in place
      process.steps.push({
        array: cloneArray(arr),
        pivot: pivotIndex,
        sorted: [...sorted]
      });
      
      quickSortHelper(arr, low, pivotIndex - 1);
      quickSortHelper(arr, pivotIndex + 1, high);
    } else if (low === high) {
      // Single element subarrays are already sorted
      sorted.push(low);
      
      process.steps.push({
        array: cloneArray(arr),
        sorted: [...sorted]
      });
    }
  };
  
  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;
    
    // Add step showing pivot selection
    process.steps.push({
      array: cloneArray(arr),
      pivot: high,
      sorted: [...sorted]
    });
    
    for (let j = low; j < high; j++) {
      // Add step for comparison with pivot
      process.steps.push({
        array: cloneArray(arr),
        compare: [j, high],
        pivot: high,
        sorted: [...sorted]
      });
      
      if (arr[j] <= pivot) {
        i++;
        
        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
        
        // Add step for swap
        process.steps.push({
          array: cloneArray(arr),
          swap: [i, j],
          pivot: high,
          sorted: [...sorted]
        });
      }
    }
    
    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    // Add step for final pivot placement
    process.steps.push({
      array: cloneArray(arr),
      swap: [i + 1, high],
      sorted: [...sorted]
    });
    
    return i + 1;
  };
  
  quickSortHelper(arr, 0, arr.length - 1);
  
  // Mark all elements as sorted in the final step
  sorted.length = 0;
  for (let i = 0; i < arr.length; i++) {
    sorted.push(i);
  }
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
  
  return process;
};

// Heap Sort
export const heapSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'heap',
    steps: [{ array: cloneArray(array) }]
  };
  
  const arr = cloneArray(array);
  const sorted: number[] = [];
  
  const heapify = (arr: number[], n: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Compare with left child
    if (left < n) {
      process.steps.push({
        array: cloneArray(arr),
        compare: [largest, left],
        sorted: [...sorted]
      });
      
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    // Compare with right child
    if (right < n) {
      process.steps.push({
        array: cloneArray(arr),
        compare: [largest, right],
        sorted: [...sorted]
      });
      
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    // If largest is not the root
    if (largest !== i) {
      // Swap
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      
      process.steps.push({
        array: cloneArray(arr),
        swap: [i, largest],
        sorted: [...sorted]
      });
      
      // Recursively heapify the affected sub-tree
      heapify(arr, n, largest);
    }
  };
  
  // Build heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i);
  }
  
  // Extract elements from heap one by one
  for (let i = arr.length - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    process.steps.push({
      array: cloneArray(arr),
      swap: [0, i],
      sorted: [...sorted]
    });
    
    // Add current position to sorted array
    sorted.unshift(i);
    
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
    
    // Call heapify on reduced heap
    heapify(arr, i, 0);
  }
  
  // Add the last element to sorted
  sorted.unshift(0);
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
  
  return process;
};

// Shell Sort
export const shellSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'shell',
    steps: [{ array: cloneArray(array) }]
  };
  
  const arr = cloneArray(array);
  const sorted: number[] = [];
  
  const n = arr.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      // Add step showing the current gap
      process.steps.push({
        array: cloneArray(arr),
        sorted: [...sorted]
      });
      
      // Compare elements with gap distance
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        // Add step for comparison
        process.steps.push({
          array: cloneArray(arr),
          compare: [j, j - gap],
          sorted: [...sorted]
        });
        
        arr[j] = arr[j - gap];
        
        // Add step for shift
        process.steps.push({
          array: cloneArray(arr),
          swap: [j, j - gap],
          sorted: [...sorted]
        });
      }
      
      arr[j] = temp;
    }
  }
  
  // Mark all elements as sorted in the final step
  for (let i = 0; i < arr.length; i++) {
    sorted.push(i);
  }
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
  
  return process;
};

// Counting Sort
export const countingSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'counting',
    steps: [{ array: cloneArray(array) }]
  };
  
  const arr = cloneArray(array);
  const sorted: number[] = [];
  
  // Find the largest element in the array
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    process.steps.push({
      array: cloneArray(arr),
      compare: [0, i],
      sorted: [...sorted]
    });
    
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  
  // Create a count array to store count of individual elements
  const count = new Array(max + 1).fill(0);
  
  // Store count of each element
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
  }
  
  // Change count[i] so that count[i] now contains actual position of this element in output array
  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array
  const output = new Array(arr.length);
  
  // To make it stable, we operate in reverse order
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
    
    // Create a temporary array to show the state
    const tempArr = cloneArray(arr);
    for (let j = 0; j < output.length; j++) {
      if (output[j] !== undefined) {
        tempArr[j] = output[j];
        if (!sorted.includes(j)) {
          sorted.push(j);
        }
      }
    }
    
    process.steps.push({
      array: cloneArray(tempArr),
      sorted: [...sorted]
    });
  }
  
  // Copy the output array to arr
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
  
  // Mark all elements as sorted in the final step
  sorted.length = 0;
  for (let i = 0; i < arr.length; i++) {
    sorted.push(i);
  }
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
  
  return process;
};

// Radix Sort
export const radixSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'radix',
    steps: [{ array: cloneArray(array) }]
  };
  
  const arr = cloneArray(array);
  const sorted: number[] = [];
  
  // Find the maximum number to know number of digits
  const max = Math.max(...arr);
  
  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences in count[]
    for (let i = 0; i < arr.length; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
      
      process.steps.push({
        array: cloneArray(arr),
        sorted: [...sorted]
      });
    }
    
    // Change count[i] so that count[i] now contains actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
      
      // Create a temporary array to show the state
      const tempArr = cloneArray(arr);
      const tempSorted: number[] = [];
      
      for (let j = 0; j < output.length; j++) {
        if (output[j] !== undefined) {
          tempArr[j] = output[j];
          tempSorted.push(j);
        }
      }
      
      process.steps.push({
        array: cloneArray(tempArr),
        sorted: [...tempSorted]
      });
    }
    
    // Copy the output array to arr[]
    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
    }
  }
  
  // Mark all elements as sorted in the final step
  sorted.length = 0;
  for (let i = 0; i < arr.length; i++) {
    sorted.push(i);
  }
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
  
  return process;
};

// Tim Sort
export const timSort = (array: number[]): SortingProcess => {
  const process: SortingProcess = {
    algorithm: 'tim',
    steps: [{ array: cloneArray(array) }]
  };
  
  const arr = cloneArray(array);
  const sorted: number[] = [];
  const RUN = 32; // Size of a run
  const n = arr.length;
  
  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += RUN) {
    const end = Math.min(i + RUN - 1, n - 1);
    insertionSortTim(arr, i, end, process, sorted);
  }
  
  // Start merging from size RUN
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(n - 1, left + size - 1);
      const right = Math.min(n - 1, left + 2 * size - 1);
      
      if (mid < right) {
        mergeTim(arr, left, mid, right, process, sorted);
      }
    }
  }
  
  // Mark all elements as sorted in the final step
  sorted.length = 0;
  for (let i = 0; i < arr.length; i++) {
    sorted.push(i);
  }
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
  
  return process;
};

// Helper function for Tim Sort - Insertion Sort for small subarrays
const insertionSortTim = (arr: number[], left: number, right: number, process: SortingProcess, sorted: number[]) => {
  for (let i = left + 1; i <= right; i++) {
    const temp = arr[i];
    let j = i - 1;
    
    while (j >= left && arr[j] > temp) {
      // Add step for comparison
      process.steps.push({
        array: cloneArray(arr),
        compare: [j, i],
        sorted: [...sorted]
      });
      
      arr[j + 1] = arr[j];
      
      // Add step for shift
      process.steps.push({
        array: cloneArray(arr),
        swap: [j, j + 1],
        sorted: [...sorted]
      });
      
      j--;
    }
    
    arr[j + 1] = temp;
  }
  
  // Add currently sorted subarray
  for (let i = left; i <= right; i++) {
    if (!sorted.includes(i)) {
      sorted.push(i);
    }
  }
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
};

// Helper function for Tim Sort - Merge function
const mergeTim = (arr: number[], left: number, mid: number, right: number, process: SortingProcess, sorted: number[]) => {
  const len1 = mid - left + 1;
  const len2 = right - mid;
  
  const leftArr = new Array(len1);
  const rightArr = new Array(len2);
  
  for (let i = 0; i < len1; i++) {
    leftArr[i] = arr[left + i];
  }
  
  for (let i = 0; i < len2; i++) {
    rightArr[i] = arr[mid + 1 + i];
  }
  
  let i = 0, j = 0, k = left;
  
  while (i < len1 && j < len2) {
    // Add step for comparison
    process.steps.push({
      array: cloneArray(arr),
      compare: [left + i, mid + 1 + j],
      sorted: [...sorted]
    });
    
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    
    // Add step for placement
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
    
    k++;
  }
  
  while (i < len1) {
    arr[k] = leftArr[i];
    i++;
    k++;
    
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
  }
  
  while (j < len2) {
    arr[k] = rightArr[j];
    j++;
    k++;
    
    process.steps.push({
      array: cloneArray(arr),
      sorted: [...sorted]
    });
  }
  
  // Add merged subarray to sorted
  for (let i = left; i <= right; i++) {
    if (!sorted.includes(i)) {
      sorted.push(i);
    }
  }
  
  process.steps.push({
    array: cloneArray(arr),
    sorted: [...sorted]
  });
};

// Execute sort based on algorithm ID
export const executeSort = (algorithmId: string, array: number[]): SortingProcess => {
  switch (algorithmId) {
    case 'bubble':
      return bubbleSort(array);
    case 'selection':
      return selectionSort(array);
    case 'insertion':
      return insertionSort(array);
    case 'merge':
      return mergeSort(array);
    case 'quick':
      return quickSort(array);
    case 'heap':
      return heapSort(array);
    case 'shell':
      return shellSort(array);
    case 'counting':
      return countingSort(array);
    case 'radix':
      return radixSort(array);
    case 'tim':
      return timSort(array);
    default:
      throw new Error(`Unknown algorithm: ${algorithmId}`);
  }
};
