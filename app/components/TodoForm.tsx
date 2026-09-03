'use client';

import React, { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    // Kirim data ke komponen induk
    onAddTodo(trimmedTitle);

    // Reset input form
    setTitle('');
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-xl border border-gray-200">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Tambah tugas baru..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!title.trim()}
          variant="default"
          size="md"
        >
          Tambah
        </Button>
      </form>
    </div>
  );
}