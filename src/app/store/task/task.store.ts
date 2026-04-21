import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Task, TaskFilter, TaskStatus, DashboardStats } from '../../models/task.model';
import { TaskService } from '../../core/services/task.service';

interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  filter: { status: 'all', priority: 'all', search: '' },
  selectedTaskId: null,
  loading: false,
  error: null,
};

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ tasks, filter, selectedTaskId }) => ({
    filteredTasks: computed(() => {
      let result = tasks();
      const f = filter();

      if (f.status && f.status !== 'all') {
        result = result.filter((t) => t.status === f.status);
      }
      if (f.priority && f.priority !== 'all') {
        result = result.filter((t) => t.priority === f.priority);
      }
      if (f.search) {
        const s = f.search.toLowerCase();
        result = result.filter(
          (t) =>
            t.title.toLowerCase().includes(s) ||
            t.description.toLowerCase().includes(s) ||
            t.assignee.toLowerCase().includes(s)
        );
      }
      return result;
    }),

    selectedTask: computed(() =>
      tasks().find((t) => t.id === selectedTaskId()) ?? null
    ),

    stats: computed((): DashboardStats => {
      const all = tasks();
      return {
        total: all.length,
        todo: all.filter((t) => t.status === 'todo').length,
        inProgress: all.filter((t) => t.status === 'in-progress').length,
        review: all.filter((t) => t.status === 'review').length,
        done: all.filter((t) => t.status === 'done').length,
        critical: all.filter((t) => t.priority === 'critical').length,
      };
    }),

    tasksByStatus: computed(() => {
      const all = tasks();
      return {
        todo: all.filter((t) => t.status === 'todo'),
        'in-progress': all.filter((t) => t.status === 'in-progress'),
        review: all.filter((t) => t.status === 'review'),
        done: all.filter((t) => t.status === 'done'),
      };
    }),
  })),
  withMethods((store, taskService = inject(TaskService)) => ({
    loadTasks(): void {
      patchState(store, { loading: true, error: null });
      const tasks = taskService.getTasks();
      patchState(store, { tasks, loading: false });
    },

    addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): void {
      const newTask = taskService.createTask(task);
      patchState(store, { tasks: [...store.tasks(), newTask] });
    },

    updateTask(id: string, changes: Partial<Task>): void {
      const updated = taskService.updateTask(id, changes);
      if (updated) {
        patchState(store, {
          tasks: store.tasks().map((t) => (t.id === id ? updated : t)),
        });
      }
    },

    deleteTask(id: string): void {
      taskService.deleteTask(id);
      patchState(store, {
        tasks: store.tasks().filter((t) => t.id !== id),
        selectedTaskId: store.selectedTaskId() === id ? null : store.selectedTaskId(),
      });
    },

    updateStatus(id: string, status: TaskStatus): void {
      this.updateTask(id, { status });
    },

    selectTask(id: string | null): void {
      patchState(store, { selectedTaskId: id });
    },

    setFilter(filter: Partial<TaskFilter>): void {
      patchState(store, { filter: { ...store.filter(), ...filter } });
    },

    clearFilter(): void {
      patchState(store, {
        filter: { status: 'all', priority: 'all', search: '' },
      });
    },
  }))
);
