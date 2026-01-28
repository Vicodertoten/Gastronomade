// src/types/recipe.ts - Interface TypeScript pour les recettes Gastronomade
export interface Recipe {
  id: string;
  title: string;
  category: 'entree' | 'plat' | 'dessert' | 'boisson' | 'accompagnement';
  ingredients: Ingredient[];
  instructions: any; // Peut être du texte ou du blockContent
  isPremium: boolean; // Contenu payant pour l'ebook
  prepTime?: number; // en minutes
  cookTime?: number; // en minutes
  restTime?: number; // en minutes
  servings?: number;
  difficulty?: 'facile' | 'moyen' | 'difficile';
  budget?: 'economique' | 'intermediaire' | 'genereux';
  tags?: string[]; // Végétarien, Rapide, Thermomix, Saison, etc.
  diet?: string[];
  season?: string[];
  equipment?: string[];
  allergens?: string[];
  storage?: string;
  imageUrl?: string;
  gallery?: any[];
  subtitle?: string;
  description?: string;
  nutritionalInfo?: NutritionalInfo;
  highlights?: Array<{ title?: string; text?: string; icon?: string }>;
  tips?: string[];
  variations?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour les ingrédients (optionnel, peut être simplifié)
export interface Ingredient {
  group?: string;
  name: string;
  quantity?: string;
  unit?: string;
  notes?: string;
}

// Interface pour les informations nutritionnelles (optionnel)
export interface NutritionalInfo {
  calories?: number;
  protein?: number; // in grams
  carbs?: number; // in grams
  fat?: number; // in grams
  fiber?: number; // in grams
}

// Types pour les filtres de recherche
export interface RecipeFilters {
  category?: Recipe['category'];
  isPremium?: boolean;
  difficulty?: Recipe['difficulty'];
  tags?: string[];
  searchTerm?: string;
}

// Type pour les résultats de recherche
export interface RecipeSearchResult {
  recipes: Recipe[];
  totalCount: number;
  filters: RecipeFilters;
}

// Interface pour les données du CMS Sanity
export interface SanityRecipe {
  _id: string;
  _type: 'recipe';
  title: string;
  category: Recipe['category'];
  ingredients: Ingredient[];
  instructions: any; // blockContent de Sanity
  isPremium: boolean;
  prepTime?: number;
  cookTime?: number;
  restTime?: number;
  servings?: number;
  difficulty?: Recipe['difficulty'];
  tags?: string[];
  diet?: string[];
  season?: string[];
  equipment?: string[];
  allergens?: string[];
  storage?: string;
  budget?: Recipe['budget'];
  highlights?: Recipe['highlights'];
  tips?: Recipe['tips'];
  variations?: Recipe['variations'];
  image?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  _createdAt: string;
  _updatedAt: string;
}
