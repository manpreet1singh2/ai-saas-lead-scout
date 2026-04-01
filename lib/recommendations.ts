import type { Product } from './types';

export type RecommendationPreferences = {
  projectType: string;
  category: string;
  budget: string;
  priority: string[];
  finishPreference: string;
  notes: string;
};

export type ProductRecommendation = Product & {
  score: number;
  reason: string;
  highlights: string[];
};

const priorityWeights: Record<string, number> = {
  durability: 12,
  moisture: 14,
  finish: 10,
  budget: 8,
  appearance: 10,
  premium: 7,
  'low-maintenance': 6,
  versatility: 5
};

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function parseBudgetValue(budget: string) {
  const value = Number(budget.replace(/[^\d.]/g, ''));
  return Number.isFinite(value) ? value : null;
}

export function scoreProducts(products: Product[], preferences: RecommendationPreferences): ProductRecommendation[] {
  const project = normalize(preferences.projectType);
  const category = normalize(preferences.category);
  const finishPreference = normalize(preferences.finishPreference);
  const notes = normalize(preferences.notes);
  const budget = parseBudgetValue(preferences.budget);

  return products
    .map((product) => {
      let score = 40;
      const reasonParts: string[] = [];
      const highlights = [...product.attributes];

      if (!category || normalize(product.category) === category) {
        score += 18;
        reasonParts.push(`matches the selected category`);
      }

      if (project.includes('kitchen') || project.includes('bathroom') || project.includes('bath')) {
        if (normalize(product.description).includes('moisture') || product.attributes.some((item) => /water|bwp|moisture/i.test(item))) {
          score += 18;
          reasonParts.push('fits moisture-prone spaces');
        }
      }

      if (project.includes('furniture') || project.includes('wardrobe') || project.includes('cabinet')) {
        if (product.category === 'Veneers' || product.category === 'Plywood') {
          score += 10;
          reasonParts.push('works well for furniture and built-ins');
        }
      }

      if (finishPreference && normalize(product.finish).includes(finishPreference)) {
        score += 14;
        reasonParts.push('matches the requested finish');
      }

      for (const priority of preferences.priority) {
        const weight = priorityWeights[normalize(priority)] ?? 4;
        const searchable = `${product.name} ${product.category} ${product.finish} ${product.description} ${product.attributes.join(' ')}`.toLowerCase();
        if (searchable.includes(normalize(priority))) {
          score += weight;
          reasonParts.push(`supports ${priority}`);
        }
      }

      if (budget !== null) {
        if (budget >= 2000) {
          score += product.category === 'Veneers' ? 8 : 4;
          reasonParts.push('fits a higher budget range');
        } else if (budget <= 1000) {
          score += product.category === 'Laminates' ? 8 : 2;
          reasonParts.push('keeps the recommendation cost-aware');
        }
      }

      if (notes.includes('scratch')) {
        if (product.attributes.some((item) => /scratch/i.test(item))) {
          score += 14;
          reasonParts.push('offers scratch resistance');
        }
      }

      if (notes.includes('premium') || notes.includes('luxury')) {
        if (product.category === 'Veneers' || /premium|decorative/i.test(product.finish)) {
          score += 12;
          reasonParts.push('gives a premium visual finish');
        }
      }

      if (notes.includes('commercial') || notes.includes('office')) {
        if (product.attributes.some((item) => /commercial|grade|easy maintenance/i.test(item))) {
          score += 10;
          reasonParts.push('suits commercial usage');
        }
      }

      if (project.includes('wall') || project.includes('panel')) {
        if (product.category === 'Veneers' || product.category === 'Laminates') {
          score += 8;
          reasonParts.push('looks strong for wall surfaces');
        }
      }

      return {
        ...product,
        score,
        reason: reasonParts.length ? reasonParts.join('; ') : 'balanced option for the requested project',
        highlights
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
