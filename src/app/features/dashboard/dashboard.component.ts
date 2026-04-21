import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskStore } from '../../store/task/task.store';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskCardComponent } from '../../shared/components/task-card/task-card.component';
import { TaskModalComponent } from '../../shared/components/task-modal/task-modal.component';
import { StatusLabelPipe } from '../../shared/pipes/task.pipes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TaskCardComponent, TaskModalComponent, StatusLabelPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  taskStore = inject(TaskStore);

  selectedTask = signal<Task | null>(null);
  showCreateModal = signal(false);

  stats = this.taskStore.stats;
  tasksByStatus = this.taskStore.tasksByStatus;

  statCards = [
    { key: 'total', label: 'Total Tasks', icon: 'list', color: 'indigo' },
    { key: 'inProgress', label: 'In Progress', icon: 'progress', color: 'blue' },
    { key: 'review', label: 'In Review', icon: 'review', color: 'amber' },
    { key: 'done', label: 'Completed', icon: 'done', color: 'green' },
    { key: 'critical', label: 'Critical', icon: 'alert', color: 'red' },
  ];

  ngOnInit(): void {
    this.taskStore.loadTasks();
  }

  openTask(task: Task): void {
    this.selectedTask.set(task);
  }

  closeModal(): void {
    this.selectedTask.set(null);
    this.showCreateModal.set(false);
  }

  onSave(data: Partial<Task>): void {
    if (data.id) {
      this.taskStore.updateTask(data.id, data);
    } else {
      this.taskStore.addTask(data as any);
    }
    this.closeModal();
  }

  onStatusChange(event: { id: string; status: TaskStatus }): void {
    this.taskStore.updateStatus(event.id, event.status);
  }

  onDelete(id: string): void {
    this.taskStore.deleteTask(id);
  }

  getStatValue(key: string): number {
    const s = this.stats();
    return (s as any)[key] ?? 0;
  }

  getCompletionRate(): number {
    const s = this.stats();
    if (!s.total) return 0;
    return Math.round((s.done / s.total) * 100);
  }
}
