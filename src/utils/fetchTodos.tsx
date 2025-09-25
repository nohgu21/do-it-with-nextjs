import type { Todo } from '../types/todo';

interface FetchTodosApiResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

class TodoStorage {
  private static isClient = typeof window !== 'undefined';

  static async getItem<T>(key: string): Promise<T | null> {
    if (!this.isClient) return null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    if (!this.isClient) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  }
}

async function fetchMyTodos(): Promise<Todo[]> {
  const response = await fetch(`https://dummyjson.com/todos?limit=150&select=id,todo,completed`);
  if (!response.ok) throw new Error('Failed to fetch');
  const data: FetchTodosApiResponse = await response.json();
  return data.todos ?? [];
}

async function fetchCachedTodos(): Promise<Todo[]> {
  try {
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    if (!isOnline) {
      console.log('Offline mode: Loading from cache');
      const cached = await TodoStorage.getItem<Todo[]>('all-todos');
      if (cached) return cached;
      throw new Error('No offline data available');
    }

    const fresh = await fetchMyTodos();
    await TodoStorage.setItem('all-todos', fresh);
    await TodoStorage.setItem('todos-timestamp', Date.now());
    return fresh;
  } catch (error) {
    console.warn('Network failed, trying cache:', error);
    const cached = await TodoStorage.getItem<Todo[]>('all-todos');
    if (cached) return cached;
    throw error;
  }
}

export { fetchMyTodos, fetchCachedTodos };
