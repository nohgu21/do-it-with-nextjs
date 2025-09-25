// types/todo.ts
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodoFormData {
  todo: string;
}

export interface TodoResponse {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  message?: string;
}

// types/components.ts
export type TodoStatusFilter = 'all' | 'completed' | 'pending';

export interface SearchFilterProps {
  searchTodo: string;
  setSearchTodo: (search: string) => void;
  todoStatusFilter: TodoStatusFilter;
  setTodoStatusFilter: (status: TodoStatusFilter) => void;
}

export interface AddTodoModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface MyTodoListProps {
  searchTodo: string;
  todoStatusFilter: TodoStatusFilter;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
}

export interface EditTodoModalProps {
  todo: Todo;
  onClose: () => void;
}

// utils/fetchTodos.ts
export interface FetchTodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}