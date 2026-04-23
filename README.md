# 🚀 TaskFlow — Task Management App

A Task management dashboard built with **Angular 19**
## Project Screenshot
<img width="737" height="518" alt="DashboardTask4" src="https://github.com/user-attachments/assets/fcbdb5f0-d576-4045-9ff6-71d6c552672d" />
<img width="1365" height="608" alt="DashboardTask3" src="https://github.com/user-attachments/assets/fdba67d4-b827-4ff5-a79b-6ed501caa0ae" />
<img width="1173" height="592" alt="DashboardTask2" src="https://github.com/user-attachments/assets/0e40192d-f930-4a42-92b6-56176cfe245b" />
<img width="1366" height="610" alt="TaskflowDashboard" src="https://github.com/user-attachments/assets/754e83ea-9038-4a1a-80b3-6561403957b1" />

## Feature
1. Can Add task
2. Can view task
3. Filter task

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

