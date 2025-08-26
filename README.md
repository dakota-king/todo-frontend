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

## Project Structure

This is a **Full-Stack Todo App** with two repositories:

```
📁 todo-frontend/          # This repository (Next.js frontend)
📁 todo-backend/           # Express.js + Prisma + MySQL backend
```

## Prerequisites

- Node.js 18+ 
- npm or yarn
- MySQL database
- Git

## Quick Start

### 1. Frontend Setup (This Repository)

```bash
# Clone the frontend repository
git clone <frontend-repo-url>
cd todo-frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Update environment variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Backend Setup

```bash
# Clone the backend repository
git clone <backend-repo-url>
cd todo-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Update .env with your database credentials
DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
PORT=5000

# Initialize database with Prisma
npx prisma generate
npx prisma db push

# Start the backend server
npm run dev
```

The backend will be available at `http://localhost:5000/api`

### 3. Database Setup

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE todo_db;
USE todo_db;
EXIT;

# Run Prisma migrations
cd todo-backend
npx prisma migrate dev --name init
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

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

## Database Schema

The backend uses Prisma with MySQL. Tasks include:
- `id` - Unique identifier
- `title` - Task description
- `color` - Task color
- `completed` - Completion status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Development

### Running Both Services

1. **Terminal 1** - Backend:
   ```bash
   cd todo-backend
   npm run dev
   ```

2. **Terminal 2** - Frontend:
   ```bash
   cd todo-frontend
   npm run dev
   ```

### Environment Variables

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Backend (.env)
```env
DATABASE_URL="mysql://username:password@localhost:3306/todo_db"
PORT=5000
NODE_ENV=development
```

## Deployment

### Frontend
```bash
npm run build
npm run start
```

### Backend
```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.