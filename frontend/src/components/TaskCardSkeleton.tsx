/**
 * TaskCardSkeleton
 * Visual placeholder card matching the dimensions and structure of a real
 * `.task-card` so that the layout does not jump when real data arrives.
 * Uses CSS pulse animation defined in styles.css (.skeleton, .skeleton-line).
 */
export function TaskCardSkeleton() {
  return (
    <article className="task-card task-card-skeleton" aria-hidden="true">
      <div className="task-card-head">
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton-badges">
          <div className="skeleton skeleton-badge" />
          <div className="skeleton skeleton-badge" />
        </div>
      </div>
      <div className="skeleton skeleton-line skeleton-desc-1" />
      <div className="skeleton skeleton-line skeleton-desc-2" />
      <div className="skeleton skeleton-line skeleton-meta" />
      <div className="task-actions">
        <div className="skeleton skeleton-action" />
        <div className="skeleton skeleton-action" />
        <div className="skeleton skeleton-action" />
      </div>
    </article>
  );
}
