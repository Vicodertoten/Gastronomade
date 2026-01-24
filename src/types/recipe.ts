// src/types/recipe.ts - Interface TypeScript pour les recettes Gastronomade
export interface Recipe {
  id: string;
  title: string;
  category: 'Entrée' | 'Plat' | 'Dessert' | 'Boisson';
  ingredients: string[];
  instructions: string; // Peut être du texte ou du blockContent
  isPremium: boolean; // Contenu payant pour l'ebook
  prepTime?: number; // en minutes
  cookTime?: number; // en minutes
  servings?: number;
  difficulty?: 'Facile' | 'Moyen' | 'Difficile';
  tags?: string[]; // Végétarien, Rapide, Thermomix, Saison, etc.
  imageUrl?: string;
  description?: string;
  nutritionalInfo?: NutritionalInfo;
  createdAt: Date;
  updatedAt: Date;
}

// Interface pour les ingrédients (optionnel, peut être simplifié)
export interface Ingredient {
  name: string;
  quantity?: number;
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
  ingredients: string[];
  instructions: any; // blockContent de Sanity
  isPremium: boolean;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: Recipe['difficulty'];
  tags?: string[];
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