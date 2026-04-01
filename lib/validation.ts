import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['Plywood', 'Veneers', 'Laminates']),
  finish: z.string().min(1),
  description: z.string().min(1),
  attributes: z.array(z.string()).default([])
});

export const quoteSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  company: z.string().optional().default(''),
  category: z.string().min(1),
  quantity: z.number().int().positive(),
  notes: z.string().optional().default('')
});
