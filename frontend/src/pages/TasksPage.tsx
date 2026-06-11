import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { trackEvent } from "../analytics/ga4";
import {
  createTask,
  deleteTask,
  listTasks,
  Task,
  TaskPriority,
  TaskStatus,
  updateTask,
} from "../services/tasks";

type ModalMode = "create" | "edit";

interface TaskFormValues {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

const DEFAULT_LIMIT = 6;

const DEFAULT_FORM: TaskFormValues = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString();
}

export function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<"all" | TaskStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | TaskPriority>("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<TaskFormValues>(DEFAULT_FORM);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await listTasks({
        page,
        limit: DEFAULT_LIMIT,
        status: statusFilter === "all" ? undefined : statusFilter,
        priority: priorityFilter === "all" ? undefined : priorityFilter,
        search: searchQuery.trim() ? searchQuery.trim() : undefined,
      });

      setTasks(data.items);
      setTotal(data.total);
      setPages(data.pages);
    } catch {
      setError("Couldn't load tasks. Try again.");
      setTasks([]);
      setTotal(0);
      setPages(0);
    } finally {
      setLoading(false);
    }
  }, [page, priorityFilter, searchQuery, statusFilter]);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const openCreateModal = () => {
    setModalMode("create");
    setActiveTask(null);
    setFormValues(DEFAULT_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setModalMode("edit");
    setActiveTask(task);
    setFormValues({
      title: task.title,
      description: task.description ?? "",
      status: task.status,
      priority: task.priority,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormError(null);
  };

  const submitFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearchQuery(searchInput);
  };

  const resetFilters = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setSearchInput("");
    setSearchQuery("");
    setPage(1);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!formValues.title.trim()) {
      setFormError("Title is required.");
      return;
    }

    setSaving(true);

    try {
      if (modalMode === "create") {
        await createTask({
          title: formValues.title.trim(),
          description: formValues.description.trim(),
          status: formValues.status,
          priority: formValues.priority,
        });
        trackEvent("task_created", {
          priority: formValues.priority,
          status: formValues.status,
        });
        setSuccess("Task created.");
      } else if (activeTask) {
        const statusChangedToDone =
          activeTask.status !== "done" && formValues.status === "done";

        await updateTask(activeTask.id, {
          title: formValues.title.trim(),
          description: formValues.description.trim(),
          status: formValues.status,
          priority: formValues.priority,
        });
        trackEvent("task_updated", {
          task_id: activeTask.id,
        });

        if (statusChangedToDone) {
          trackEvent("task_completed", {
            task_id: activeTask.id,
            source: "edit_modal",
          });
        }

        setSuccess("Task updated.");
      }

      closeModal();
      await loadTasks();
    } catch {
      setFormError("Request failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (task: Task) => {
    const confirmed = window.confirm(
      `Delete task \"${task.title}\"? This cannot be undone.`,
    );
    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(task.id);
      trackEvent("task_deleted", {
        task_id: task.id,
      });
      setSuccess("Task deleted.");

      if (tasks.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await loadTasks();
      }
    } catch {
      setError("Couldn't delete task. Try again.");
    }
  };

  const handleComplete = async (task: Task) => {
    if (task.status === "done") {
      return;
    }

    try {
      await updateTask(task.id, { status: "done" });
      trackEvent("task_completed", {
        task_id: task.id,
        source: "quick_action",
      });
      setSuccess("Task marked done.");
      await loadTasks();
    } catch {
      setError("Couldn't update task status.");
    }
  };

  const showingEmptyState = !loading && !error && tasks.length === 0;

  const pagerLabel = useMemo(() => {
    if (total === 0) {
      return "No tasks";
    }
    return `Page ${page} of ${pages || 1} (${total} total)`;
  }, [page, pages, total]);

  return (
    <section className="tasks-screen">
      <div className="tasks-toolbar">
        <form className="task-filters" onSubmit={submitFilters}>
          <label>
            Status
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value as "all" | TaskStatus);
                setPage(1);
              }}
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>

          <label>
            Priority
            <select
              value={priorityFilter}
              onChange={(event) => {
                setPriorityFilter(event.target.value as "all" | TaskPriority);
                setPage(1);
              }}
            >
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>

          <label className="search-label">
            Search
            <input
              type="search"
              value={searchInput}
              placeholder="title or description"
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </label>

          <button type="submit" className="ghost-btn dark-ghost-btn">
            Apply
          </button>
          <button
            type="button"
            className="ghost-btn dark-ghost-btn"
            onClick={resetFilters}
          >
            Reset
          </button>
        </form>

        <button type="button" className="solid-btn" onClick={openCreateModal}>
          New Task
        </button>
      </div>

      {success ? <p className="success-copy">{success}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      {loading ? (
        <div className="tasks-state">Loading tasks...</div>
      ) : null}

      {showingEmptyState ? (
        <div className="tasks-state">
          No tasks yet - create your first one.
          <div>
            <button type="button" className="solid-btn" onClick={openCreateModal}>
              Create Task
            </button>
          </div>
        </div>
      ) : null}

      {!loading && !showingEmptyState && !error ? (
        <>
          <div className="task-card-grid">
            {tasks.map((task) => (
              <article key={task.id} className="task-card">
                <div className="task-card-head">
                  <h3>{task.title}</h3>
                  <div className="task-badges">
                    <span className={`badge status-${task.status}`}>{task.status}</span>
                    <span className={`badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <p className="task-description">{task.description || "No description"}</p>
                <p className="task-meta">Updated: {formatDate(task.updated_at)}</p>
                <div className="task-actions">
                  <button
                    type="button"
                    className="ghost-btn dark-ghost-btn"
                    onClick={() => openEditModal(task)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="ghost-btn dark-ghost-btn"
                    onClick={() => handleComplete(task)}
                    disabled={task.status === "done"}
                  >
                    {task.status === "done" ? "Done" : "Mark Done"}
                  </button>
                  <button
                    type="button"
                    className="ghost-btn danger-btn"
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="pager-row">
            <span>{pagerLabel}</span>
            <div className="pager-controls">
              <button
                type="button"
                className="ghost-btn dark-ghost-btn"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
              >
                Prev
              </button>
              <button
                type="button"
                className="ghost-btn dark-ghost-btn"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={pages > 0 ? page >= pages : tasks.length < DEFAULT_LIMIT}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : null}

      {modalOpen ? (
        <div className="modal-shell" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3>{modalMode === "create" ? "Create Task" : "Edit Task"}</h3>
            <form className="task-modal-form" onSubmit={handleFormSubmit}>
              <label>
                Title
                <input
                  type="text"
                  value={formValues.title}
                  onChange={(event) =>
                    setFormValues((prev) => ({ ...prev, title: event.target.value }))
                  }
                  maxLength={200}
                />
              </label>

              <label>
                Description
                <textarea
                  value={formValues.description}
                  onChange={(event) =>
                    setFormValues((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  rows={4}
                  maxLength={10000}
                />
              </label>

              <div className="modal-grid">
                <label>
                  Status
                  <select
                    value={formValues.status}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        status: event.target.value as TaskStatus,
                      }))
                    }
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </label>

                <label>
                  Priority
                  <select
                    value={formValues.priority}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        priority: event.target.value as TaskPriority,
                      }))
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
              </div>

              {formError ? <p className="form-error">{formError}</p> : null}

              <div className="task-actions">
                <button type="submit" className="solid-btn" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : modalMode === "create"
                      ? "Create"
                      : "Save"}
                </button>
                <button
                  type="button"
                  className="ghost-btn dark-ghost-btn"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
