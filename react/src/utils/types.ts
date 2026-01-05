export interface MiniApp {
  name: string;
  category: string;
  from: string;
  appUrl: string;
  difficulty: number;
  averageRating: bigint;
  reviewCount: bigint;
  isActive: boolean;
  totalRating: bigint;
  recommendPercent: bigint;
}

export interface Review {
  name: string;
  comment: string;
  reviewer: string;
  appUrl: string;
  timestamp: bigint;
  rating: bigint;
  registeredAt: bigint;
  wouldRecommend: boolean;
  recommendPercent: bigint;
  helpfulCount: bigint
}

export interface Comment {
  comment: string;
  commenter: string;
  timestamp: bigint;
}