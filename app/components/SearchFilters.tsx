import type { SortOption, OrderOption } from "../types/github";
import { LANG_COLORS } from "../utils/constants";

interface SearchFiltersProps {
  sort: SortOption;
  order: OrderOption;
  language: string;
  onSortChange: (sort: SortOption) => void;
  onOrderChange: (order: OrderOption) => void;
  onLanguageChange: (language: string) => void;
}

export function SearchFilters({
  sort,
  order,
  language,
  onSortChange,
  onOrderChange,
  onLanguageChange,
}: SearchFiltersProps) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label className="filter-label" htmlFor="sort">
          Sort
        </label>
        <select
          id="sort"
          className="filter-select"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="">Best match</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
          <option value="updated">Recently updated</option>
        </select>
      </div>

      {sort && (
        <div className="filter-group">
          <label className="filter-label" htmlFor="order">
            Order
          </label>
          <select
            id="order"
            className="filter-select"
            value={order}
            onChange={(e) => onOrderChange(e.target.value as OrderOption)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      )}

      <div className="filter-group">
        <label className="filter-label" htmlFor="language">
          Language
        </label>
        <select
          id="language"
          className="filter-select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="">Any</option>
          {Object.keys(LANG_COLORS)
            .sort()
            .map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
