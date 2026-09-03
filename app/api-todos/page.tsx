import { getTasks } from '@/lib/tasks';

export default async function ApiTodosPage() {
  const { tasks } = await getTasks();

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Judul Utama */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Daftar Tugas (Todo List)
        </h1>

        {/* Card Container */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          {/* Header Card */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800 text-sm">Daftar Tugas</h2>
            <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2.5 py-1 rounded-full">
              {tasks.length} item
            </span>
          </div>

          {/* List Item */}
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-xs transition-all ${
                  task.completed
                    ? 'bg-emerald-50/30 border-emerald-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Kiri: Checkbox & Judul */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 accent-blue-600"
                  />
                  <span
                    className={`font-medium text-sm truncate ${
                      task.completed ? 'line-through text-gray-400' : 'text-gray-700'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {/* Kanan: Badge Tags */}
                <div className="flex items-center gap-1.5 shrink-0 font-medium text-[11px]">
                  <span className="bg-purple-100 text-purple-600 px-2.5 py-1 rounded-full">
                    ID: #{task.id}
                  </span>
                  <span className="bg-sky-100 text-sky-600 px-2.5 py-1 rounded-full">
                    User: {task.userId}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-full ${
                      task.completed
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-amber-100 text-amber-600'
                    }`}
                  >
                    {task.completed ? 'Selesai' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div> 
  );
}