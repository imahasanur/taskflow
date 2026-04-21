# 🚀 TaskFlow — Task Management App

A Task management dashboard built with **Angular 19**, showcasing modern Angular patterns and best practices.

## ✨ Features

- **Angular 19 Signals** — Reactive state with `signal()`, `computed()`, `effect()`
- **NgRx SignalStore** — Scalable, type-safe state management
- **Standalone Components** — 100% standalone architecture (no NgModules)
- **Lazy-loaded Routes** — Feature-based code splitting for optimal performance
- **Control Flow Syntax** — New `@if`, `@for`, `@switch` template syntax
- **Auth Guard** — Route protection with functional guards
- **Custom Pipes** — `priorityLabel`, `statusLabel`, `relativeDate`
- **Custom Directives** — `HighlightDirective` for search term highlighting
- **Reactive Forms** — Full form validation with `ReactiveFormsModule`
- **Responsive Design** — Mobile-first with collapsible sidebar
- **Dark Theme** — Sleek dark UI with CSS variables

## 📁 Project Structure

```
src/
└── app/
    ├── core/
    │   ├── guards/          # Auth guard (functional)
    │   └── services/        # TaskService, AuthService
    ├── features/
    │   ├── auth/            # Login page + auth routes
    │   ├── dashboard/       # Dashboard with kanban + stats
    │   └── tasks/           # Task list with filters
    ├── shared/
    │   ├── components/      # Sidebar, TaskCard, TaskModal, NotFound
    │   ├── directives/      # HighlightDirective
    │   └── pipes/           # PriorityLabel, StatusLabel, RelativeDate
    ├── store/
    │   └── task/            # NgRx SignalStore
    ├── models/              # TypeScript interfaces
    └── utils/               # Date & string utilities
```

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 19 | Framework |
| NgRx Signals | 19 | State Management |
| TypeScript | 5.x | Language |
| SCSS | — | Styling |
| Angular Router | 19 | Routing + Guards |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build

# Run unit tests
ng test
```

Open `http://localhost:4200`. Use the pre-filled demo credentials on the login page.

## 📸 Screenshots

| Login | Dashboard | Tasks |
|---|---|---|
| Auth flow with validation | Kanban board + stats | Filtered task list |

## 📄 License

MIT
