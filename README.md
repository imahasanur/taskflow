# 🚀 TaskFlow — Task Management App

A Task management dashboard built with **Angular 19**, showcasing modern Angular patterns and best practices.


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

