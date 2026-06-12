import { useParams, Link } from "react-router-dom";

export function TaskDetailPage() {
  const { id } = useParams();

  return (
    <section style={{ textAlign: "center", padding: "2rem" }}>
      <h3>Task Detail</h3>
      <p>Coming soon. Task ID: {id}</p>
      <Link to="/tasks">← Back to Tasks</Link>
    </section>
  );
}
