import { useParams } from "react-router-dom";

export function TaskDetailPage() {
  const { id } = useParams();

  return (
    <section className="task-placeholder">
      <h3>Task Detail Placeholder</h3>
      <p>Route param captured successfully for task id: {id}</p>
    </section>
  );
}
