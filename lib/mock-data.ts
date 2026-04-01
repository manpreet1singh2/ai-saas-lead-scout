import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'ply-001',
    name: 'Marine Plywood',
    category: 'Plywood',
    finish: 'BWP',
    description: 'Moisture-resistant boards suitable for kitchens, bathrooms, and heavy-use interiors.',
    attributes: ['18mm', 'Boiling waterproof', 'Commercial grade']
  },
  {
    id: 'ven-001',
    name: 'Walnut Veneer',
    category: 'Veneers',
    finish: 'Premium natural',
    description: 'Decorative veneer sheets with a warm walnut grain for furniture and wall panels.',
    attributes: ['Bookmatch', 'Selected cuts', 'Furniture grade']
  },
  {
    id: 'lam-001',
    name: 'Stone Texture Laminate',
    category: 'Laminates',
    finish: 'Matte',
    description: 'Modern surface finish with scratch resistance for residential and retail interiors.',
    attributes: ['1.0mm', 'Scratch resistant', 'Easy maintenance']
  }
];
