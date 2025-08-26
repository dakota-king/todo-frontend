# Todo Frontend

A modern, responsive Todo List application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ View all tasks with completion status
- ➕ Create new tasks with customizable colors
- ✏️ Edit existing tasks
- 🗑️ Delete tasks with confirmation
- ✅ Toggle task completion status
- 📱 Responsive design for mobile and desktop
- 🎨 Beautiful UI with Tailwind CSS

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running backend API (see backend README)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Update the environment variables in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── create/         # Create task page
│   ├── edit/[id]/      # Edit task page
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   ├── TaskCard.tsx    # Individual task card
│   └── TaskForm.tsx    # Task creation/edit form
├── lib/                # Utilities and API client
│   └── api.ts          # API client functions
└── types/              # TypeScript type definitions
    └── task.ts         # Task-related types
```

## API Integration

The frontend communicates with the backend API using the following endpoints:

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Color Options

Tasks can be assigned one of the following colors:
- Red
- Blue (default)
- Green
- Yellow
- Purple
- Pink

## Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.