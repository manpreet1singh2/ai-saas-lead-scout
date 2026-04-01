import { randomUUID } from 'crypto';
import type { Product, QuoteRequest } from './types';
import { products as seedProducts } from './mock-data';
import { pool } from './db';

let productMemory = [...seedProducts];
let quoteMemory: Array<QuoteRequest & { id: string; createdAt: string }> = [];

export async function listProducts(): Promise<Product[]> {
  if (!pool) return productMemory;
  const result = await pool.query('SELECT id, name, category, finish, description, attributes FROM products ORDER BY created_at DESC');
  return result.rows.map((row) => ({ ...row, attributes: Array.isArray(row.attributes) ? row.attributes : [] }));
}

export async function createProduct(input: Omit<Product, 'id'>): Promise<Product> {
  const product = { id: randomUUID(), ...input };
  if (!pool) {
    productMemory = [product, ...productMemory];
    return product;
  }

  await pool.query(
    'INSERT INTO products (id, name, category, finish, description, attributes) VALUES ($1, $2, $3, $4, $5, $6)',
    [product.id, product.name, product.category, product.finish, product.description, product.attributes]
  );

  return product;
}

export async function updateProduct(id: string, input: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
  if (!pool) {
    const idx = productMemory.findIndex((product) => product.id === id);
    if (idx < 0) return null;
    productMemory[idx] = { ...productMemory[idx], ...input };
    return productMemory[idx];
  }

  const existing = await pool.query('SELECT id, name, category, finish, description, attributes FROM products WHERE id = $1', [id]);
  if (!existing.rowCount) return null;
  const current = existing.rows[0];
  const merged = { ...current, ...input };
  await pool.query('UPDATE products SET name = $1, category = $2, finish = $3, description = $4, attributes = $5 WHERE id = $6', [
    merged.name,
    merged.category,
    merged.finish,
    merged.description,
    merged.attributes,
    id
  ]);
  return merged;
}

export async function deleteProduct(id: string): Promise<void> {
  if (!pool) {
    productMemory = productMemory.filter((product) => product.id !== id);
    return;
  }
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

export async function saveQuote(input: QuoteRequest): Promise<QuoteRequest & { id: string; createdAt: string }> {
  const quote = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };
  if (!pool) {
    quoteMemory.unshift(quote);
    return quote;
  }

  await pool.query(
    'INSERT INTO quotes (id, created_at, name, email, phone, company, category, quantity, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
    [quote.id, quote.createdAt, quote.name, quote.email, quote.phone, quote.company, quote.category, quote.quantity, quote.notes]
  );

  return quote;
}
