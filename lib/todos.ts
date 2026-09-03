import { Todo } from '@/types/todo';

export async function getTodos(): Promise<Todo[]> {
  return [
    {
      id: 1,
      title: 'Belajar Next.js App Router',
      description: 'Memahami Server dan Client Component',
      completed: true,
      createdAt: '2026-03-01',
    },
    {
      id: 2,
      title: 'Membuat Todo App dengan State',
      description: 'Mengelola state di dalam memori React',
      completed: false,
      createdAt: '2026-03-02',
    },
  ];
}