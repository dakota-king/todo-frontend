'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types/task';
import { api } from '@/lib/api';
import TaskCard from '@/components/TaskCard';
import { Plus } from 'lucide-react';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await api.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (id: number, completed: boolean) => {
    try {
      await api.updateTask(id, { completed });
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, completed } : task
      ));
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleTaskClick = (task: Task) => {
    router.push(`/edit/${task.id}`);
  };

  const completedCount = tasks.filter(task => task.completed).length;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchTasks}
            className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Rocket Icon */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 mr-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#gradient)" />
                <path d="M2 17L12 22L22 17" stroke="url(#gradient)" strokeWidth="2" />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Todo App
            </h1>
          </div>
          
          {/* Create Task Button */}
          <button
            onClick={() => router.push('/create')}
            className="bg-blue-700 hover:bg-blue-600 text-white px-8 py-4 rounded-lg transition-colors shadow-lg flex items-center mx-auto"
            title="Create new task"
          >
            <span className="mr-2">Create Task</span>
            <Plus size={20} />
          </button>
        </div>

        {/* Task Summary */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex items-center">
            <span className="text-white mr-2">Tasks</span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-purple-400 mr-2">Completed</span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
              {completedCount}
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16">
            {/* Document/Checklist Icon */}
            <div className="w-24 h-24 mx-auto mb-6 text-gray-600">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-white text-xl font-medium mb-3">
              You don&apos;t have any tasks registered yet.
            </h2>
            <p className="text-gray-400 text-lg">
              Create tasks and organize your to-do items.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onClick={handleTaskClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}