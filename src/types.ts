export type LinkCategory = 'youtube' | 'yonetim' | 'diger';

export interface Link {
  id: string;
  title: string;
  url: string;
  category: LinkCategory;
  description?: string;
  createdAt: string;
}

export interface LinkState {
  links: Link[];
  filteredLinks: Link[];
  searchTerm: string;
  categoryFilter: LinkCategory | 'all';
  isLoading: boolean;
  error: string | null;
} 