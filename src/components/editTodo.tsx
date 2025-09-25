'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, X, Loader2 } from 'lucide-react';
import type { Todo, EditTodoModalProps, TodoResponse } from '../types/todo';

const EditTodoModal: React.FC<EditTodoModalProps> = ({ todo, onClose }) => {
  const [editedTodo, setEditedTodo] = useState<string>(todo.todo);
  const queryClient = useQueryClient();

  const mutation = useMutation<TodoResponse, Error, void>({
    mutationFn: async (): Promise<TodoResponse> => {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: editedTodo }),
      });
      const data: TodoResponse = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update');
      return data;
    },
    onSuccess: (data: TodoResponse) => {
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old ? old.map((t) => (t.id === data.id ? { ...t, todo: data.todo } : t)) : []
      );
      onClose();
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedTodo(e.target.value);
  };

  const handleUpdate = (): void => {
    if (editedTodo.trim()) {
      mutation.mutate();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Enter' && !mutation.isPending) handleUpdate();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, mutation.isPending]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
      <div className="bg-[#1F2937] text-white rounded-xl relative border border-gray-600 p-6 max-w-md w-full mx-4">
        {/* Title */}
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Pencil className="text-[#0F4C5C]" size={20} /> Edit Todo
        </h3>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 w-8 h-8 rounded-full bg-[#0F4C5C] text-white hover:bg-[#0a3742] flex items-center justify-center"
          aria-label="Close edit modal"
        >
          <X size={18} />
        </button>

        {/* Input */}
        <input
          type="text"
          value={editedTodo}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 bg-[#0F4C5C] text-white rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Edit todo title"
          autoFocus
        />

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition-colors"
            onClick={onClose}
            aria-label="Cancel editing"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1"
            disabled={mutation.isPending}
            onClick={handleUpdate}
            aria-label="Update todo"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
