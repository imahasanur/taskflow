export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  tags: string[];
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  progress: number; // 0-100
}

export interface TaskFilter {
  status?: TaskStatus | 'all';
  priority?: TaskPriority | 'all';
  search?: string;
}

export interface DashboardStats {
  total: number;
  todo: number;
  inProgress: number;
  review: number;
  done: number;
  critical: number;
}
