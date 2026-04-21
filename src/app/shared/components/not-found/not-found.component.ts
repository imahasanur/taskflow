import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="code">404</div>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a routerLink="/dashboard" class="back-btn">Back to Dashboard</a>
    </div>
  `,
  styles: [`
    .not-found {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #0a0a0f;
      color: #fff;
      font-family: 'Inter', sans-serif;
      text-align: center;
      padding: 24px;
    }
    .code {
      font-size: 8rem;
      font-weight: 900;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1;
      margin-bottom: 16px;
    }
    h1 { font-size: 1.8rem; margin: 0 0 8px; }
    p { color: rgba(255,255,255,0.45); margin: 0 0 32px; }
    .back-btn {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: #fff;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      transition: opacity 0.2s;
      &:hover { opacity: 0.85; }
    }
  `],
})
export class NotFoundComponent {}
