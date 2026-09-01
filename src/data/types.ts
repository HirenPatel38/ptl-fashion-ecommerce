export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  details: string[];
  images: string[];
  colors: string[];
  sizes: string[];
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export type Category =
  | "shirts"
  | "t-shirts"
  | "jackets"
  | "trousers"
  | "jeans"
  | "accessories";

export interface CommunityPost {
  id: string;
  author: CommunityUser;
  title: string;
  body: string;
  images: string[];
  tags: string[];
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: CommunityUser;
  body: string;
  createdAt: string;
  likes: number;
}

export interface CommunityUser {
  id: string;
  name: string;
  avatar: string;
  handle: string;
}
