import { Task, CreateTaskData, UpdateTaskData } from '@/types/task';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Enhanced error handling with specific error messages
const handleApiError = (response: Response, operation: string) => {
  let errorMessage = `Failed to ${operation}`;
  
  if (response.status === 404) {
    errorMessage = `Resource not found: ${operation}`;
  } else if (response.status === 400) {
    errorMessage = `Invalid request: ${operation}`;
  } else if (response.status === 500) {
    errorMessage = `Server error: ${operation}`;
  } else if (response.status === 0) {
    errorMessage = `Network error: Unable to connect to server`;
  }
  
  throw new Error(errorMessage);
};

export const api = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`);
      if (!response.ok) {
        handleApiError(response, 'fetch tasks');
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch tasks: Network error');
    }
  },

  // Create a new task
  createTask: async (data: CreateTaskData): Promise<Task> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        handleApiError(response, 'create task');
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create task: Network error');
    }
  },

  // Update a task
  updateTask: async (id: number, data: UpdateTaskData): Promise<Task> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        handleApiError(response, 'update task');
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to update task: Network error');
    }
  },

  // Delete a task
  deleteTask: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        handleApiError(response, 'delete task');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to delete task: Network error');
    }
  },
};
