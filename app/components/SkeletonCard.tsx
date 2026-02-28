export function SkeletonCard() {
  return (
    <div className="repo-card skeleton-card" aria-hidden="true">
      <div className="skeleton-row">
        <div className="skeleton skeleton-avatar" />
        <div className="skeleton skeleton-title" />
      </div>
      <div className="skeleton skeleton-desc" />
      <div className="skeleton skeleton-desc short" />
      <div className="skeleton-meta-row">
        <div className="skeleton skeleton-tag" />
        <div className="skeleton skeleton-tag" />
        <div className="skeleton skeleton-tag" />
      </div>
    </div>
  );
}
