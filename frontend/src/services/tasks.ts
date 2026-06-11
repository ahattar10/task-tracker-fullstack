import { http, getAccessToken } from "./http";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: string;
  updated_at: string;
}

export interface TaskListResponse {
  items: Task[];
  total: number;
  page: number;
  pages: number;
}

export interface ListTasksParams {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
}

export interface TaskUpsertPayload {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

interface TaskUpdatePayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}

function authHeader() {
  const token = getAccessToken();

  if (!token) {
    throw new Error("Missing access token. Please log in again.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function listTasks(params: ListTasksParams): Promise<TaskListResponse> {
  const response = await http.get<TaskListResponse>("/tasks", {
    params,
    headers: authHeader(),
  });

  return response.data;
}

export async function createTask(payload: TaskUpsertPayload): Promise<Task> {
  const response = await http.post<Task>("/tasks", payload, {
    headers: authHeader(),
  });

  return response.data;
}

export async function updateTask(
  taskId: number,
  payload: TaskUpdatePayload,
): Promise<Task> {
  const response = await http.put<Task>(`/tasks/${taskId}`, payload, {
    headers: authHeader(),
  });

  return response.data;
}

export async function deleteTask(taskId: number): Promise<void> {
  await http.delete(`/tasks/${taskId}`, {
    headers: authHeader(),
  });
}
