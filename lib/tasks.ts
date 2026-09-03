import { todoService, FetchTodosParams } from '@/services/todoServices';
import { ApiTodo, TaskItem } from '@/types/api-todo';

export function formatApiTodoToTask(raw: ApiTodo): TaskItem {
  return {
    id: raw.id,
    title: raw.todo,
    completed: raw.completed,
    userId: raw.userId,
    source: 'dummyjson-api',
  };
}

export async function getTasks(params?: FetchTodosParams): Promise<{ tasks: TaskItem[]; total: number }> {
  const data = await todoService.fetchTodos(params);
  return {
    tasks: data.todos.map(formatApiTodoToTask),
    total: data.total ?? data.todos.length,
  };
}

export async function getTaskById(id: string | number): Promise<TaskItem> {
  const raw = await todoService.fetchTodoById(id);
  return formatApiTodoToTask(raw);
}