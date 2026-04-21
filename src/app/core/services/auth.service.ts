import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = 'taskflow_user';

  private _currentUser = signal<User | null>(this.loadUser());

  readonly currentUser = this._currentUser.asReadonly();

  login(email: string, _password: string): boolean {
    // Mock login — replace with real API call
    const mockUser: User = {
      id: 'user-1',
      name: 'Ahasan Rahman',
      email,
      avatar: '',
      role: 'developer',
    };
    this._currentUser.set(mockUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockUser));
    return true;
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }

  private loadUser(): User | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}
