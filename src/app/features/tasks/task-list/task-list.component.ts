import { Component, inject, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskStore } from '../../../store/task/task.store';
import { Task, TaskStatus, TaskPriority, TaskFilter } from '../../../models/task.model';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';
import { TaskModalComponent } from '../../../shared/components/task-modal/task-modal.component';
import { StatusLabelPipe, PriorityLabelPipe } from '../../../shared/pipes/task.pipes';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskCardComponent,
    TaskModalComponent,
    StatusLabelPipe,
    PriorityLabelPipe,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  taskStore = inject(TaskStore);
  route = inject(ActivatedRoute);

  selectedTask = signal<Task | null>(null);
  showCreateModal = signal(false);
  viewMode = signal<'grid' | 'list'>('grid');

  filteredTasks = this.taskStore.filteredTasks;
  filter = this.taskStore.filter;

  statuses: Array<{ value: TaskStatus | 'all'; label: string }> = [
    { value: 'all', label: 'All Status' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'done', label: 'Done' },
  ];

  priorities: Array<{ value: TaskPriority | 'all'; label: string }> = [
    { value: 'all', label: 'All Priority' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  ngOnInit(): void {
    this.taskStore.loadTasks();

    // Read query params to pre-set filter
    this.route.queryParams.subscribe((params) => {
      if (params['status']) {
        this.taskStore.setFilter({ status: params['status'] as TaskStatus });
      }
    });
  }

  onSearch(value: string): void {
    this.taskStore.setFilter({ search: value });
  }

  onStatusFilter(value: string): void {
    this.taskStore.setFilter({ status: value as TaskStatus | 'all' });
  }

  onPriorityFilter(value: string): void {
    this.taskStore.setFilter({ priority: value as TaskPriority | 'all' });
  }

  clearFilters(): void {
    this.taskStore.clearFilter();
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
      this.taskStore.addTask(data as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
    }
    this.closeModal();
  }

  onStatusChange(event: { id: string; status: TaskStatus }): void {
    this.taskStore.updateStatus(event.id, event.status);
  }

  onDelete(id: string): void {
    this.taskStore.deleteTask(id);
    if (this.selectedTask()?.id === id) this.closeModal();
  }

  hasActiveFilters(): boolean {
    const f = this.filter();
    return f.status !== 'all' || f.priority !== 'all' || !!f.search;
  }
}
