'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Task } from '@/types/task';
import { api } from '@/lib/api';
import TaskForm from '@/components/TaskForm';

export default function EditTask() {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTask, setIsLoadingTask] = useState(true);
  const router = useRouter();
  const params = useParams();
  const taskId = parseInt(params.id as string);

  const fetchTask = useCallback(async () => {
    try {
      setIsLoadingTask(true);
      const tasks = await api.getTasks();
      const foundTask = tasks.find(t => t.id === taskId);
      if (foundTask) {
        setTask(foundTask);
      } else {
        alert('Task not found');
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to fetch task:', error);
      alert('Failed to load task');
      router.push('/');
    } finally {
      setIsLoadingTask(false);
    }
  }, [taskId, router]);

  useEffect(() => {
    fetchTask();
  }, [taskId, fetchTask]);

  const handleSubmit = async (data: { title: string; color: string }) => {
    if (!task) return;
    
    try {
      setIsLoading(true);
      await api.updateTask(task.id, data);
      router.push('/');
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  if (isLoadingTask) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <TaskForm
      task={task}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  );
}
