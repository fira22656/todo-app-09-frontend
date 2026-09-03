import Link from 'next/link';



// Data dummy untuk mencegah error undefined

const dummyTasks: Record<string, { id: string; title: string; description: string; completed: boolean; createdAt: string }> = {

  "1": {

    id: "1",

    title: "Belajar React Server Components (RSC)",

    description: "Mempelajari konsep dasar Server Components pada Next.js dan perbedaannya dengan Client Components.",

    completed: true,

    createdAt: "2026-08-20",

  },

};



type PageProps = {

  params: Promise<{ id: string }> | { id: string };

};



export default async function TaskDetailPage({ params }: PageProps) {

  const resolvedParams = await params;

  const taskId = resolvedParams?.id || "1";



  // Ambil data sesuai ID URL, atau gunakan data default jika tidak ditemukan

  const todo = dummyTasks[taskId] || {

    id: taskId,

    title: "Belajar React Server Components (RSC)",

    description: "Mempelajari konsep dasar Server Components pada Next.js dan perbedaannya dengan Client Components.",

    completed: true,

    createdAt: "2026-08-20",

  };



  return (

    <main className="min-h-screen bg-gray-100 p-8 flex justify-center items-start pt-12">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">

       

        {/* Header: Judul & Tombol Kembali */}

        <div className="flex items-center justify-between pb-3 border-b border-gray-100">

          <h1 className="text-xl font-bold text-gray-800">Detail Tugas</h1>

          <Link

            href="/"

            className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-md transition"

          >

            Kembali ke Daftar

          </Link>

        </div>



        {/* ID Tugas */}

        <div>

          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ID TUGAS</p>

          <p className="text-sm font-semibold text-gray-700 mt-1">#{todo.id}</p>

        </div>



        {/* Judul Tugas */}

        <div>

          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">JUDUL TUGAS</p>

          <h2 className="text-base font-bold text-gray-900 mt-1">

            {todo.title}

          </h2>

        </div>



        {/* Deskripsi */}

        <div>

          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">DESKRIPSI</p>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs text-gray-600 leading-relaxed">

            {todo.description}

          </div>

        </div>



        {/* Status */}

        <div>

          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">STATUS</p>

          <span

            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${

              todo.completed

                ? 'bg-green-100 text-green-700'

                : 'bg-yellow-100 text-yellow-700'

            }`}

          >

            {todo.completed ? '✓ Selesai' : 'Belum Selesai'}

          </span>

        </div>



        {/* Tanggal Dibuat */}

        <div>

          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">TANGGAL DIBUAT</p>

          <p className="text-xs text-gray-600 mt-1">{todo.createdAt}</p>

        </div>



      </div>

    </main>

  );

}