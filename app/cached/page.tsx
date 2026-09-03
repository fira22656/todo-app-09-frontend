import { getTasks } from '@/lib/tasks';
import CachedTodoList from './components/CachedTodoList';

export default async function CachedPage() {
  const { tasks } = await getTasks({ limit: 10, skip: 0 });

  return (
    <main className="min-h-screen bg-slate-50/60 py-12 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 space-y-6">
        
        {/* Header Judul dengan warna ungu pada (Todo List) */}
        <div className="text-center pb-2 border-b border-slate-100">
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Daftar Tugas <span className="text-indigo-600">(Todo List)</span>
          </h1>
        </div>

        {/* Client Component Caching */}
        <CachedTodoList initialTasks={tasks} />
      </div>
    </main>
  );
}