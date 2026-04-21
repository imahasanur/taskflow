import { Injectable } from '@angular/core';
import { Task, TaskStatus, TaskPriority } from '../../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks: Task[] = this.generateMockTasks();

  getTasks(): Task[] {
    return [...this.tasks];
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const now = new Date().toISOString();
    const task: Task = {
      ...data,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, changes: Partial<Task>): Task | null {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    this.tasks[index] = {
      ...this.tasks[index],
      ...changes,
      updatedAt: new Date().toISOString(),
    };
    return this.tasks[index];
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.tasks.splice(index, 1);
    return true;
  }

  private generateId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }

  private generateMockTasks(): Task[] {
    const statuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];
    const priorities: TaskPriority[] = ['low', 'medium', 'high', 'critical'];
    const assignees = ['Alex Kim', 'Sara Chen', 'Omar Patel', 'Lily Tran', 'John Doe'];
    const tagPool = ['frontend', 'backend', 'api', 'ui', 'auth', 'performance', 'testing', 'design'];

    const mockData = [
      { title: 'Implement OAuth2 Login', description: 'Integrate Google and GitHub OAuth2 providers with JWT token management and refresh logic.', status: 'in-progress' as TaskStatus, priority: 'critical' as TaskPriority, progress: 65 },
      { title: 'Dashboard Analytics Charts', description: 'Build interactive charts for user activity, revenue trends, and conversion rates using Chart.js.', status: 'todo' as TaskStatus, priority: 'high' as TaskPriority, progress: 0 },
      { title: 'REST API Rate Limiting', description: 'Add Redis-based rate limiting middleware to all public API endpoints.', status: 'review' as TaskStatus, priority: 'high' as TaskPriority, progress: 90 },
      { title: 'Mobile Responsive Layout', description: 'Refactor all components to support mobile-first responsive design with Tailwind breakpoints.', status: 'done' as TaskStatus, priority: 'medium' as TaskPriority, progress: 100 },
      { title: 'Unit Test Coverage', description: 'Increase test coverage from 45% to 80% across all Angular services and components.', status: 'in-progress' as TaskStatus, priority: 'medium' as TaskPriority, progress: 48 },
      { title: 'CI/CD Pipeline Setup', description: 'Configure GitHub Actions workflow for automated testing, building, and deployment to AWS.', status: 'done' as TaskStatus, priority: 'high' as TaskPriority, progress: 100 },
      { title: 'Database Schema Migration', description: 'Migrate legacy MySQL schema to PostgreSQL with proper indexing and constraints.', status: 'todo' as TaskStatus, priority: 'critical' as TaskPriority, progress: 0 },
      { title: 'Dark Mode Implementation', description: 'Add system-aware dark/light theme toggle using CSS variables and localStorage persistence.', status: 'review' as TaskStatus, priority: 'low' as TaskPriority, progress: 85 },
      { title: 'WebSocket Real-time Notifications', description: 'Implement Socket.io server and Angular service for live task update notifications.', status: 'todo' as TaskStatus, priority: 'medium' as TaskPriority, progress: 10 },
      { title: 'PDF Report Generator', description: 'Build server-side PDF generation for project reports using Puppeteer.', status: 'in-progress' as TaskStatus, priority: 'low' as TaskPriority, progress: 30 },
      { title: 'RBAC Permission System', description: 'Implement role-based access control with granular permissions for admin, manager, and developer roles.', status: 'todo' as TaskStatus, priority: 'critical' as TaskPriority, progress: 5 },
      { title: 'Image Upload & CDN', description: 'Add S3 image upload with CloudFront CDN distribution and automatic WebP conversion.', status: 'done' as TaskStatus, priority: 'medium' as TaskPriority, progress: 100 },
    ];

    return mockData.map((item, i) => ({
      ...item,
      id: `task-${i + 1}`,
      assignee: assignees[i % assignees.length],
      tags: this.pickRandom(tagPool, 2, 3),
      dueDate: this.futureDateISO(i * 3 + 2),
      createdAt: new Date(Date.now() - (12 - i) * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
    }));
  }

  private pickRandom<T>(arr: T[], min: number, max: number): T[] {
    const count = min + Math.floor(Math.random() * (max - min + 1));
    return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
  }

  private futureDateISO(daysAhead: number): string {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  }
}
