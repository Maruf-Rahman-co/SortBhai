
export type AlgorithmCategory = 'Basic' | 'Efficient' | 'Hybrid' | 'Distribution';

export interface SortingAlgorithm {
  id: string;
  name: string;
  description: string;
  category: AlgorithmCategory;
  timeComplexityBest: string;
  timeComplexityAverage: string;
  timeComplexityWorst: string;
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
}

export const sortingAlgorithms: SortingAlgorithm[] = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    description: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    category: 'Basic',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n²)',
    timeComplexityWorst: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true
  },
  {
    id: 'selection',
    name: 'Selection Sort',
    description: 'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.',
    category: 'Basic',
    timeComplexityBest: 'O(n²)',
    timeComplexityAverage: 'O(n²)',
    timeComplexityWorst: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    description: 'Builds the sorted array one item at a time by comparing each with the prior elements.',
    category: 'Basic',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n²)',
    timeComplexityWorst: 'O(n²)',
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    description: 'A divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    category: 'Efficient',
    timeComplexityBest: 'O(n log n)',
    timeComplexityAverage: 'O(n log n)',
    timeComplexityWorst: 'O(n log n)',
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    description: 'Another divide and conquer algorithm that picks a pivot element and partitions the array around the pivot.',
    category: 'Efficient',
    timeComplexityBest: 'O(n log n)',
    timeComplexityAverage: 'O(n log n)',
    timeComplexityWorst: 'O(n²)',
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    description: 'Converts the array into a heap data structure, then repeatedly extracts the maximum element.',
    category: 'Efficient',
    timeComplexityBest: 'O(n log n)',
    timeComplexityAverage: 'O(n log n)',
    timeComplexityWorst: 'O(n log n)',
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true
  },
  {
    id: 'shell',
    name: 'Shell Sort',
    description: 'An extension of insertion sort that allows the exchange of items that are far apart.',
    category: 'Hybrid',
    timeComplexityBest: 'O(n log n)',
    timeComplexityAverage: 'O(n(log n)²)',
    timeComplexityWorst: 'O(n(log n)²)',
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true
  },
  {
    id: 'counting',
    name: 'Counting Sort',
    description: 'An integer sorting algorithm that operates by counting the number of objects that have each distinct key value.',
    category: 'Distribution',
    timeComplexityBest: 'O(n+k)',
    timeComplexityAverage: 'O(n+k)',
    timeComplexityWorst: 'O(n+k)',
    spaceComplexity: 'O(n+k)',
    stable: true,
    inPlace: false
  },
  {
    id: 'radix',
    name: 'Radix Sort',
    description: 'Processes individual digits, distributing elements into buckets according to their radix.',
    category: 'Distribution',
    timeComplexityBest: 'O(nk)',
    timeComplexityAverage: 'O(nk)',
    timeComplexityWorst: 'O(nk)',
    spaceComplexity: 'O(n+k)',
    stable: true,
    inPlace: false
  },
  {
    id: 'tim',
    name: 'Tim Sort',
    description: 'A hybrid sorting algorithm derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data.',
    category: 'Hybrid',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n log n)',
    timeComplexityWorst: 'O(n log n)',
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false
  }
];

export const getAlgorithmById = (id: string): SortingAlgorithm | undefined => {
  return sortingAlgorithms.find(algo => algo.id === id);
};

export const getAlgorithmsByCategory = (category: AlgorithmCategory): SortingAlgorithm[] => {
  return sortingAlgorithms.filter(algo => algo.category === category);
};

export const getAllCategories = (): AlgorithmCategory[] => {
  return Array.from(new Set(sortingAlgorithms.map(algo => algo.category)));
};
