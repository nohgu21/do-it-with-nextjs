'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchCachedTodos } from '../utils/fetchTodos';
import EditTodoModal from './editTodo';
import { ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import type { Todo, MyTodoListProps } from '../types/todo';

const MyTodoList: React.FC<MyTodoListProps> = ({ 
  searchTodo, 
  todoStatusFilter, 
  currentPage, 
  setCurrentPage 
}) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const queryClient = useQueryClient();
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  const { data, error, isLoading } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: () => fetchCachedTodos()
  });

  const deleteMutation = useMutation<number, Error, number>({
    mutationFn: async (id: number): Promise<number> => {
      const res = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      return id;
    },
    onSuccess: (id: number) => {
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old ? old.filter((todo) => todo.id !== id) : []
      );
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTodo, todoStatusFilter, setCurrentPage]);

  if (isLoading) return <p className="text-white text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">Error: {error.message}</p>;
  if (!data || !Array.isArray(data)) return <p className="text-white text-center mt-8">No tasks found.</p>;

  const filteredTodos = data.filter(
    (todo) =>
      todo.todo.toLowerCase().includes(searchTodo.toLowerCase()) &&
      (todoStatusFilter === "all" ||
        (todoStatusFilter === "completed" && todo.completed) ||
        (todoStatusFilter === "pending" && !todo.completed))
  );

  const totalPages = Math.ceil(filteredTodos.length / limit);
  const start = skip;
  const end = start + limit;
  const paginatedTodos = filteredTodos.slice(start, end);

  const handleDeleteClick = (todoId: number): void => {
    const confirmDelete = window.confirm('Hmm... Are you sure you want to delete this task?');
    if (confirmDelete) deleteMutation.mutate(todoId);
  };

  const handleEditClick = (todo: Todo): void => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = (): void => {
    setSelectedTodo(null);
  };

  return (
    <main className="bg-[#1F2937] mt-4 rounded-xl p-4 space-y-6 shadow-lg text-white">
        
      <ul className="space-y-4">
        {paginatedTodos.map((todo) => (
          <li key={todo.id} className="bg-[#0F4C5C] hover:bg-[#0a3742] px-4 py-3 rounded-xl transition-colors">
            <Link
              href={`/todos/${todo.id}`}
              className="flex justify-between items-center font-medium"
            >
              <span>{todo.todo}</span>
              <span
                className={`text-sm px-2 py-1 rounded-full font-semibold ${todo.completed ? 'bg-green-600' : 'bg-yellow-500'}`}
              >
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
            </Link>

            <div className="flex gap-2 mt-2">
              <button
                className="px-2 py-1 bg-[#0F4C5C] text-white hover:bg-[#0a3742] rounded transition-colors"
                onClick={() => handleEditClick(todo)}
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => handleDeleteClick(todo.id)}
                className="px-2 py-1 bg-[#1F2937] text-red-500 border border-red-500 hover:bg-[#0a0e14] rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <nav className="flex justify-between items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-2 bg-[#0F4C5C] text-white hover:bg-[#0d3a45] disabled:bg-gray-500 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1"
        >
          <ChevronLeft size={16} />Previous
        </button>

        <span className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-2 bg-[#0F4C5C] text-white hover:bg-[#0d3a45] disabled:bg-gray-500 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-1"
        >
          Next <ChevronRight size={16} />
        </button>
      </nav>

      {selectedTodo && (
        <EditTodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </main>
  );
};

export default MyTodoList;