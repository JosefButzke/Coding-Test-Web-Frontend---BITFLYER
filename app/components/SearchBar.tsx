import { SearchIcon } from "./icons";

interface SearchBarProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
}

export function SearchBar({ value, loading, onChange }: SearchBarProps) {
  return (
    <div className="search-bar-wrapper">
      <span className="search-icon-wrap">
        <SearchIcon size={18} />
      </span>
      <input
        type="search"
        className="search-input"
        placeholder="Search repositories…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        aria-label="Search GitHub repositories"
      />
      {loading && <span className="search-spinner" aria-label="Loading…" />}
    </div>
  );
}
