export interface Product {
  id: number;
  name?: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  date_created?: string;
  featured?: boolean;
  short_description?: string;
  description?: string;
  images?: Array<{
    src: string;
    [key: string]: any;
  }>;
  slug?: string;
  type?: string;
}
