'use client';

import React, { useState, useEffect } from 'react';
import { TaskItem } from '@/types/api-todo';

const CACHE_KEY = 'TODO_LIST_CACHE';

interface CachedTodoListProps {
  initialTasks: TaskItem[];
}

export default function CachedTodoList({ initialTasks }: CachedTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [inputTask, setInputTask] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Ambil data dari localStorage saat pertama dimuat
  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      try {
        setTasks(JSON.parse(cachedData));
      } catch (e) {
        console.error('Gagal membaca cache:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Simpan ke localStorage setiap kali tasks berubah
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // Tambah Tugas Baru
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTask.trim()) return;

    const newTask: TaskItem = {
      id: Date.now(),
      title: inputTask,
      completed: false,
      userId: 1,
      source: 'dummyjson-api', // <-- Sudah disesuaikan dengan type TaskItem
    };

    setTasks([newTask, ...tasks]);
    setInputTask('');
  };

  // Toggle Checkbox Status
  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Hapus Tugas
  const handleDeleteTask = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset Cache ke Data Awal API
  const handleResetCache = () => {
    localStorage.removeItem(CACHE_KEY);
    setTasks(initialTasks);
  };

  return (
    <div className="space-y-6">
      {/* Form Input + Tombol Tambah Biru Soft */}
      <form onSubmit={handleAddTask} className="flex gap-3">
        <input
          type="text"
          placeholder="Tambahkan tugas baru..."
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 text-sm text-slate-700"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-sky-100"
        >
          Tambah
        </button>
      </form>

      {/* Indikator LocalStorage & Reset Link */}
      <div className="flex items-center justify-between text-xs pt-1">
        <div className="flex items-center gap-2 text-emerald-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Cache aktif (localStorage: {CACHE_KEY})
        </div>
        <button
          onClick={handleResetCache}
          className="text-slate-400 hover:text-indigo-600 underline font-medium transition-colors"
        >
          Reset ke Data Awal
        </button>
      </div>

      {/* Sub Header & Counter */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-sm font-bold text-slate-700">Daftar Tugas</h2>
        <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-3 py-1 rounded-full border border-slate-200">
          {tasks.length} item
        </span>
      </div>

      {/* Task Item List */}
      <div className="space-y-3.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggleTask(task.id)}
            className={`group flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
              task.completed
                ? 'bg-emerald-50/40 border-emerald-200/80'
                : 'bg-white border-slate-200/80 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50/50'
            }`}
          >
            <div className="flex items-center gap-3.5 flex-1 pr-3">
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="h-5 w-5 rounded border-slate-300 text-indigo-600 cursor-pointer accent-indigo-600"
              />
              <span
                className={`text-sm font-medium transition-colors ${
                  task.completed
                    ? 'line-through text-slate-400'
                    : 'text-slate-700 group-hover:text-indigo-600'
                }`}
              >
                {task.title}
              </span>
            </div>

            {/* Tombol Action (Detail & Hapus) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className="px-3 py-1 bg-sky-100 hover:bg-sky-200 text-sky-600 text-xs font-semibold rounded-lg transition-colors"
              >
                Detail →
              </button>
              <button
                type="button"
                onClick={(e) => handleDeleteTask(e, task.id)}
                className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}