// Shared types for the AGD application

export interface NewsArticle {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
  featured: boolean;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  image_url?: string;
  reading_time_minutes: number;
  created_by_name?: string;
  updated_by_name?: string;
}

export interface DatabaseNewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  created_by: number;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
  views: number;
  featured: boolean;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  tags: string | null;
  image_url: string | null;
  reading_time_minutes: number;
  updated_by: number;
  created_by_name?: string;
  updated_by_name?: string;
} 

// Events
export interface EventItem {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  type: string;
  state: 'upcoming' | 'ongoing' | 'past' | 'cancelled' | 'postponed';
  status: 'draft' | 'published' | 'archived';
  start_at: string; // ISO string
  end_at?: string | null; // ISO string or null
  location: string;
  venue?: string | null;
  registration_required: boolean;
  registration_deadline?: string | null; // ISO string or null
  registration_url?: string | null;
  max_attendees?: number | null;
  current_attendees?: number;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
  featured: boolean;
  image_url?: string | null;
  created_by_name?: string;
  updated_by_name?: string;
}

export interface DatabaseEventItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  type: string;
  state: 'upcoming' | 'ongoing' | 'past' | 'cancelled' | 'postponed';
  status: 'draft' | 'published' | 'archived';
  start_at: Date;
  end_at: Date | null;
  location: string;
  venue: string | null;
  registration_required: boolean;
  registration_deadline: Date | null;
  registration_url: string | null;
  max_attendees: number | null;
  current_attendees: number;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
  views: number;
  featured: boolean;
  image_url: string | null;
  created_by: number;
  updated_by: number;
  created_by_name?: string;
  updated_by_name?: string;
}