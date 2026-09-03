import React from 'react';
import Link from 'next/link';

type TaskDetailCardProps = {
  todo: any;
};

export default function TaskDetailCard({ todo }: TaskDetailCardProps) {
  return (
    <main className="min-h-screen bg-gray-100 p-8 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        
        {/* Header: Judul & Tombol Kembali */}
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-xl font-bold text-gray-800">Detail Tugas</h1>
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-md transition"
          >
            Kembali ke Daftar
          </Link>
        </div>

        {/* ID Tugas */}
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">ID TUGAS</p>
          <p className="text-sm font-semibold text-gray-700 mt-1">#{todo?.id}</p>
        </div>

        {/* Judul Tugas */}
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">JUDUL TUGAS</p>
          <h2 className="text-base font-bold text-gray-900 mt-1">
            {todo?.title || todo?.name || 'Tanpa Judul'}
          </h2>
        </div>

        {/* Deskripsi */}
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">DESKRIPSI</p>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs text-gray-600 leading-relaxed">
            {todo?.description || '-'}
          </div>
        </div>

        {/* Status */}
        <div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">STATUS</p>
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
              todo?.completed
                ? 'bg-green-100 text-green-600'
                : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {todo?.completed ? '✓ Selesai' : 'Belum Selesai'}
          </span>
        </div>

        {/* Tanggal Dibuat */}
        {todo?.createdAt && (
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">TANGGAL DIBUAT</p>
            <p className="text-xs text-gray-600 mt-1">{todo.createdAt}</p>
          </div>
        )}

      </div>
    </main>
  );
}