import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { PriorityLabelPipe, StatusLabelPipe, RelativeDatePipe } from '../../pipes/task.pipes';
import { getInitials, generateAvatarColor, daysUntil, isOverdue } from '../../../utils/date.utils';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, PriorityLabelPipe, StatusLabelPipe, RelativeDatePipe],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  task = input.required<Task>();
  viewDetail = output<Task>();
  deleteTask = output<string>();

  getInitials = getInitials;
  getAvatarColor = generateAvatarColor;
  daysUntil = daysUntil;
  isOverdue = isOverdue;

  onView(): void {
    this.viewDetail.emit(this.task());
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteTask.emit(this.task().id);
  }

  get priorityClass(): string {
    return `priority--${this.task().priority}`;
  }

  get statusClass(): string {
    return `status--${this.task().status}`;
  }

  get dueDateLabel(): string {
    const days = this.daysUntil(this.task().dueDate);
    if (days < 0) return `${Math.abs(days)}d overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return 'Due tomorrow';
    return `Due in ${days}d`;
  }
}
