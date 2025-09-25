'use client';

import { Search, Filter } from 'lucide-react';
import type { SearchFilterProps, TodoStatusFilter } from '@/types/todo';

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  searchTodo, 
  setSearchTodo, 
  todoStatusFilter, 
  setTodoStatusFilter 
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTodoStatusFilter(e.target.value as TodoStatusFilter);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-[#1F2937] rounded-xl p-4 mb-6 shadow-sm">
      <Search size={16} />
      <input
        type="text"
        placeholder="Search your tasks here..."
        value={searchTodo}
        onChange={(e) => setSearchTodo(e.target.value)}
        className="w-full md:w-2/3 px-3 py-2 bg-[#1F2937] text-white placeholder:text-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Filter size={16} />
      <select
        value={todoStatusFilter}
        onChange={handleFilterChange}
        className="w-full md:w-1/3 px-3 py-2 bg-[#1F2937] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};


export default SearchFilter;