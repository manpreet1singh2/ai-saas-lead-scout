export type ProductCategory = 'Plywood' | 'Veneers' | 'Laminates';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  finish: string;
  description: string;
  attributes: string[];
};

export type QuoteRequest = {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: ProductCategory | string;
  quantity: number;
  notes: string;
};
