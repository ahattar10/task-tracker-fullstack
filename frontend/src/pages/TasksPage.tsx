import { Link } from "react-router-dom";

export function TasksPage() {
  return (
    <section className="task-placeholder">
      <h3>Task List Placeholder</h3>
      <p>
        Route and authenticated layout are wired. Task CRUD UI will land here in
        Day 7.
      </p>
      <Link to="/tasks/preview-task" className="ghost-link">
        Open a sample task route
      </Link>
    </section>
  );
}
