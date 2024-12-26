export interface FilterState {
  gender: string[];
  sizes: string[];
  colors: string[];
  priceRange: number;
}

export type SortOption =
  | "RECOMMENDED"
  | "BESTSELLERS"
  | "NEWEST"
  | "LOW - HIGH"
  | "HIGH - LOW"
  | "SALE";
