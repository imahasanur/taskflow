import { Component, input, output, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskStatus, TaskPriority } from '../../../models/task.model';
import { PriorityLabelPipe, StatusLabelPipe } from '../../pipes/task.pipes';
import { formatDate, daysUntil, isOverdue, getInitials, generateAvatarColor } from '../../../utils/date.utils';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PriorityLabelPipe, StatusLabelPipe],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  task = input<Task | null>(null);
  mode = input<'view' | 'create'>('view');

  close = output<void>();
  save = output<Partial<Task>>();
  statusChange = output<{ id: string; status: TaskStatus }>();

  private fb = inject(FormBuilder);
  isEditing = signal(false);

  formatDate = formatDate;
  daysUntil = daysUntil;
  isOverdue = isOverdue;
  getInitials = getInitials;
  getAvatarColor = generateAvatarColor;

  statuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];
  priorities: TaskPriority[] = ['low', 'medium', 'high', 'critical'];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    priority: ['medium' as TaskPriority, Validators.required],
    status: ['todo' as TaskStatus, Validators.required],
    assignee: ['', Validators.required],
    dueDate: ['', Validators.required],
    progress: [0, [Validators.min(0), Validators.max(100)]],
    tags: [''],
  });

  ngOnInit(): void {
    if (this.mode() === 'create') {
      this.isEditing.set(true);
      const today = new Date();
      today.setDate(today.getDate() + 7);
      this.form.patchValue({ dueDate: today.toISOString().split('T')[0] });
    } else if (this.task()) {
      this.populateForm(this.task()!);
    }
  }

  populateForm(task: Task): void {
    this.form.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assignee: task.assignee,
      dueDate: task.dueDate,
      progress: task.progress,
      tags: task.tags.join(', '),
    });
  }

  startEdit(): void {
    this.isEditing.set(true);
    this.populateForm(this.task()!);
  }

  cancelEdit(): void {
    if (this.mode() === 'create') {
      this.close.emit();
    } else {
      this.isEditing.set(false);
    }
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const val = this.form.value;
    const tags = (val.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean);
    this.save.emit({
      id: this.task()?.id,
      title: val.title!,
      description: val.description!,
      priority: val.priority as TaskPriority,
      status: val.status as TaskStatus,
      assignee: val.assignee!,
      dueDate: val.dueDate!,
      progress: val.progress!,
      tags,
    });
    this.isEditing.set(false);
  }

  onStatusChange(status: TaskStatus): void {
    const t = this.task();
    if (t) this.statusChange.emit({ id: t.id, status });
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }
}
