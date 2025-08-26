'use client';

import { useState, useEffect } from 'react';
import { Task, TaskColor } from '@/types/task';
import { ArrowLeft } from 'lucide-react';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: { title: string; color: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const colorOptions: { value: TaskColor; label: string; bgClass: string }[] = [
  { value: 'red', label: 'Red', bgClass: 'bg-red-500' },
  { value: 'blue', label: 'Blue', bgClass: 'bg-blue-500' },
  { value: 'green', label: 'Green', bgClass: 'bg-green-500' },
  { value: 'yellow', label: 'Yellow', bgClass: 'bg-yellow-500' },
  { value: 'purple', label: 'Purple', bgClass: 'bg-purple-500' },
  { value: 'pink', label: 'Pink', bgClass: 'bg-pink-500' },
];

export default function TaskForm({ task, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [color, setColor] = useState<TaskColor>(task?.color as TaskColor || 'blue');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title: title.trim(), color });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-white">
            {task ? 'Edit Task' : 'Create Task'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter task title"
              className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              {colorOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    color === option.value
                      ? 'border-blue-500 bg-gray-700'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="color"
                    value={option.value}
                    checked={color === option.value}
                    onChange={(e) => setColor(e.target.value as TaskColor)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${option.bgClass}`} />
                    <span className="text-sm font-medium">{option.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!title.trim() || isLoading}
            className="w-full bg-blue-700 hover:bg-blue-600 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
}
