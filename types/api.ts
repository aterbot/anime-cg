import { Anime } from './anime';

export interface PageResponse {
  page: number;
  perPage: number;
  total: number;
  hasNextPage: boolean;
}

export interface AniListPage {
  pageInfo: PageResponse;
  media: Anime[];
}

export interface AniListResponse {
  data: {
    Page: AniListPage;
  };
}

export interface SearchParams {
  page?: number;
  perPage?: number;
  search?: string;
  genre?: string;
  sort?: string[];
  season?: string;
  seasonYear?: number;
  format?: string;
  status?: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}
