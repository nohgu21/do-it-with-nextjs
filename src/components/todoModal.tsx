'use client';

import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import type { TodoFormData, TodoResponse, Todo } from '@/types/todo';

interface AddTodoModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AddTodoModal: React.FC<AddTodoModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm<TodoFormData>({
    mode: 'onChange', 
    defaultValues: {
      todo: ''
    }
  });

  const todoValue = watch('todo');

  const mutation = useMutation<TodoResponse, Error, TodoFormData>({
    mutationFn: async (formData: TodoFormData): Promise<TodoResponse> => {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: formData.todo,
          completed: false,
          userId: 1,
        }),
      });

      const data: TodoResponse = await response.json();
      console.log("New task added:", data);

      if (!response.ok) throw new Error(data.message || 'Failed to add task');
      return data;
    },

    onSuccess: (data: TodoResponse) => {
      queryClient.setQueryData<Todo[]>(['todos'], (old) => old ? [...old, data] : [data]);
      reset();
      setIsOpen(false);
    },
  });

  const onSubmit = (data: TodoFormData): void => {
    if (data.todo.trim()) {
      mutation.mutate(data);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        reset();
      }
      if (e.key === 'Enter' && todoValue?.trim() && !mutation.isPending) {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, todoValue, mutation.isPending, handleSubmit, reset]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#0F4C5C] text-white font-semibold rounded-xl border-3 border-[#0d3a45] hover:bg-[#0d3a45] transition-colors flex items-center gap-2"
      >
        <Plus size={16} />Add Todo
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Add a New Task</h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="e.g. Bake plantain pie"
                className={`w-full p-3 border rounded-lg mb-4 bg-[#1F2937] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.todo ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register('todo', {
                  required: 'Todo is required',
                  minLength: {
                    value: 1,
                    message: 'Todo must be at least 1 character'
                  },
                  validate: (value: string) => value.trim().length > 0 || 'Todo cannot be empty'
                })}
                autoFocus
              />
              
              {errors.todo && (
                <p className="text-red-500 text-sm mb-4">{errors.todo.message}</p>
              )}

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="px-4 py-2 border border-red-500 text-red-500 bg-white hover:bg-red-600 hover:text-white rounded-xl transition-colors flex items-center gap-1"
                  onClick={() => {
                    reset();
                    setIsOpen(false);
                  }}
                >
                  <X size={16} className='font-red-500' />Cancel
                </button>

                <button
                  type="submit"
                  disabled={!isValid || mutation.isPending}
                  className="px-4 py-2 border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition-colors disabled:opacity-50 flex items-center gap-1"
                >
                  <Plus size={16} />
                  {mutation.isPending ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodoModal;