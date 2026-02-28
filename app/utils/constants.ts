export const GITHUB_API_SEARCH_URL =
  "https://api.github.com/search/repositories";
export const GITHUB_REST_API_DOCS_URL =
  "https://docs.github.com/en/rest/search/search";

export const PER_PAGE = 10;

// GitHub caps search results at 1000 (10 pages × 100, or 100 pages × 10)
export const MAX_PAGES = 10;

export const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Scala: "#c22d40",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  R: "#198CE7",
  MATLAB: "#e16737",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Clojure: "#db5855",
};
