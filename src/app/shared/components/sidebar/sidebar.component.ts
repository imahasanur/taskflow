import { Component, inject, signal, output } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { TaskStore } from '../../../store/task/task.store';
import { getInitials, generateAvatarColor } from '../../../utils/date.utils';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  auth = inject(AuthService);
  taskStore = inject(TaskStore);
  router = inject(Router);

  collapsed = signal(false);
  closeMobile = output<void>();

  user = this.auth.currentUser;
  stats = this.taskStore.stats;

  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'All Tasks', path: '/tasks', icon: 'tasks' },
    { label: 'In Progress', path: '/tasks', queryParams: { status: 'in-progress' }, icon: 'progress' },
    { label: 'Review', path: '/tasks', queryParams: { status: 'review' }, icon: 'review' },
    { label: 'Completed', path: '/tasks', queryParams: { status: 'done' }, icon: 'done' },
  ];

  getInitials = getInitials;
  getAvatarColor = generateAvatarColor;

  toggleCollapse(): void {
    this.collapsed.update((v) => !v);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  onNavClick(): void {
    this.closeMobile.emit();
  }
}
