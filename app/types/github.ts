export interface Owner {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface License {
  name: string;
}

export interface Repository {
  id: number;
  full_name: string;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  updated_at: string;
  owner: Owner;
  topics: string[];
  license: License | null;
  visibility: string;
}

export interface SearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export type SortOption = "" | "stars" | "forks" | "updated";
export type OrderOption = "desc" | "asc";
