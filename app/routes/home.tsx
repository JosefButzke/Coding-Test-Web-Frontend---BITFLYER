import { useState, useEffect, useCallback, useRef } from "react";
import type { Route } from "./+types/home";
import type { SearchResult, SortOption, OrderOption } from "../types/github";
import {
  PER_PAGE,
  MAX_PAGES,
  GITHUB_API_SEARCH_URL,
  GITHUB_REST_API_DOCS_URL,
} from "../utils/constants";
import { GithubIcon, SearchIcon, ErrorIcon } from "../components/icons";
import { SearchBar } from "../components/SearchBar";
import { SearchFilters } from "../components/SearchFilters";
import { RepoCard } from "../components/RepoCard";
import { SkeletonCard } from "../components/SkeletonCard";
import { Pagination } from "../components/Pagination";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GitHub Repository Search" },
    { name: "description", content: "Search GitHub repositories" },
  ];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("");
  const [order, setOrder] = useState<OrderOption>("desc");
  const [language, setLanguage] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce the search query
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [sort, order, language]);

  // Fetch from GitHub API
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults(null);
      setError(null);
      return;
    }

    const controller = new AbortController();

    async function fetchRepos() {
      setLoading(true);
      setError(null);

      let q = debouncedQuery;
      if (language) q += ` language:${language}`;

      const params = new URLSearchParams({
        q,
        per_page: PER_PAGE.toString(),
        page: page.toString(),
      });
      if (sort) {
        params.set("sort", sort);
        params.set("order", order);
      }

      try {
        const res = await fetch(
          `${GITHUB_API_SEARCH_URL}?${params}`,
          {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github+json" },
          }
        );

        if (!res.ok) {
          if (res.status === 403) {
            const retryAfter = res.headers.get("X-RateLimit-Reset");
            const msg = retryAfter
              ? `Rate limit exceeded. Resets at ${new Date(
                  parseInt(retryAfter) * 1000
                ).toLocaleTimeString()}.`
              : "Rate limit exceeded. Please wait a moment and try again.";
            throw new Error(msg);
          }
          if (res.status === 422) throw new Error("Invalid search query.");
          throw new Error(`GitHub API error (${res.status}).`);
        }

        const data: SearchResult = await res.json();
        setResults(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
        setResults(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
    return () => controller.abort();
  }, [debouncedQuery, sort, order, language, page]);

  const totalPages = results
    ? Math.min(Math.ceil(results.total_count / PER_PAGE), MAX_PAGES)
    : 0;

  const handlePageChange = useCallback((p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showSkeletons = loading && !!debouncedQuery && !results;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <GithubIcon size={28} />
            <span>Repo Search</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="search-section">
          <SearchBar value={query} loading={loading} onChange={setQuery} />
          <SearchFilters
            sort={sort}
            order={order}
            language={language}
            onSortChange={setSort}
            onOrderChange={setOrder}
            onLanguageChange={setLanguage}
          />
        </section>

        {error && (
          <div className="error-banner" role="alert">
            <ErrorIcon />
            {error}
          </div>
        )}

        {!debouncedQuery && !error && (
          <div className="empty-state">
            <SearchIcon size={48} />
            <p className="empty-title">Search GitHub repositories</p>
            <p className="empty-sub">
              Type a keyword, project name, or topic above to get started
            </p>
          </div>
        )}

        {showSkeletons && (
          <div className="results-list">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {results && (
          <>
            <div className="results-header">
              <span className="results-count">
                {results.total_count.toLocaleString()} repositories
              </span>
              {results.incomplete_results && (
                <span className="incomplete-badge">Incomplete results</span>
              )}
            </div>

            {results.items.length === 0 ? (
              <div className="empty-state">
                <p className="empty-title">
                  No results for &ldquo;{debouncedQuery}&rdquo;
                </p>
                <p className="empty-sub">
                  Try different keywords or remove filters
                </p>
              </div>
            ) : (
              <div className={`results-list${loading ? " loading" : ""}`}>
                {results.items.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Data from the{" "}
          <a
            href={GITHUB_REST_API_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub REST API
          </a>
        </p>
      </footer>
    </div>
  );
}
