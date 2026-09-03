import { NextResponse } from 'next/server';
import { getTasks } from '@/lib/tasks';

export async function GET() {
  try {
    // Mengambil 10 data tugas dari fungsi getTasks
    const { tasks, total } = await getTasks({ limit: 10, skip: 0 });

    return NextResponse.json({
      success: true,
      message: 'Koneksi ke DummyJSON API berhasil! Data berhasil diambil.',
      count: tasks.length,
      total: total || 254,
      data: {
        tasks: tasks,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengambil data dari API',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}