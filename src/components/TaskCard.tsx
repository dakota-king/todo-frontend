'use client';

import { Task } from '@/types/task';
import { Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onClick: (task: Task) => void;
}

const colorClasses = {
  red: 'bg-red-100 border-red-300 text-red-900',
  blue: 'bg-blue-100 border-blue-300 text-blue-900',
  green: 'bg-green-100 border-green-300 text-green-900',
  yellow: 'bg-yellow-100 border-yellow-300 text-yellow-900',
  purple: 'bg-purple-100 border-purple-300 text-purple-900',
  pink: 'bg-pink-100 border-pink-300 text-pink-900',
};

export default function TaskCard({ task, onToggle, onDelete, onClick }: TaskCardProps) {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onToggle(task.id, e.target.checked);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(task);
    }
  };

  const colorClass = colorClasses[task.color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${colorClass} ${
        task.completed ? 'opacity-60' : ''
      }`}
      onClick={() => onClick(task)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Task: ${task.title}. ${task.completed ? 'Completed' : 'Not completed'}. Click to edit.`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
          />
          <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>
            {task.title}
          </span>
        </div>
        <button
          onClick={handleDelete}
          className="p-1 text-red-500 hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
          title="Delete task"
          aria-label={`Delete task: ${task.title}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
