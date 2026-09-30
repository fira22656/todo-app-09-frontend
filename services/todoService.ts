import { apiClient } from './api';
import { ApiTodo, TodosApiResponse as DummyJsonTodosResponse } from '@/types/api-todo';

export interface BackendTodo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodosResponse {
  success: boolean;
  message: string;
  data: BackendTodo[];
}

export interface SingleTodoResponse {
  success: boolean;
  message: string;
  data: BackendTodo;
}

export interface FetchTodosParams {
  limit?: number;
  skip?: number;
}

export interface CreateTodoInput {
  todo: string;
  completed?: boolean;
  userId?: number;
}

export const todoService = {
  async getTodos(): Promise<BackendTodo[]> {
    const res = await apiClient<TodosResponse>('/todos?perPage=50');
    return res.data || [];
  },

  async getTodoById(id: number | string): Promise<BackendTodo> {
    try {
      // 1. Coba fetch langsung dari endpoint detail
      const res = await apiClient<SingleTodoResponse>(`/todos/${id}`);
      if (res && res.data) {
        return res.data;
      }
      throw new Error('Data tidak ada di response');
    } catch (err) {
      // 2. Fallback: Kalau endpoint /todos/{id} error/404, ambil semua todo lalu filter manual
      console.warn(`Fallback fetch list untuk ID #${id}`);
      const allTodos = await this.getTodos();
      const found = allTodos.find((t) => String(t.id) === String(id));
      
      if (!found) {
        throw new Error(`Todo dengan ID #${id} tidak ditemukan`);
      }
      return found;
    }
  },

  async createTodo(payload: string | CreateTodoInput): Promise<BackendTodo> {
    const task = typeof payload === 'string' ? payload : payload.todo;
    const res = await apiClient<SingleTodoResponse>('/todos', {
      method: 'POST',
      body: JSON.stringify({ task }),
    });
    return res.data;
  },

  async updateTodo(
    id: number | string,
    payload: { task?: string; is_completed?: boolean }
  ): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteTodo(id: number | string): Promise<void> {
    await apiClient(`/todos/${id}`, {
      method: 'DELETE',
    });
  },

  async fetchTodos(params: FetchTodosParams = { limit: 15, skip: 0 }): Promise<DummyJsonTodosResponse> {
    try {
      const todos = await this.getTodos();
      const mapped: ApiTodo[] = todos.map((t) => ({
        id: t.id,
        todo: t.todo,
        completed: t.completed,
        userId: 1,
      }));
      return {
        todos: mapped,
        total: mapped.length,
        skip: params.skip || 0,
        limit: params.limit || 15,
      };
    } catch {
      return { todos: [], total: 0, skip: 0, limit: 15 };
    }
  },

  async fetchTodoById(id: number | string): Promise<ApiTodo> {
    const todo = await this.getTodoById(id);
    return {
      id: todo.id,
      todo: todo.todo,
      completed: todo.completed,
      userId: 1,
    };
  },

  async updateTodoStatus(id: number | string, completed: boolean): Promise<BackendTodo> {
    await this.updateTodo(id, { is_completed: completed });
    return {
      id: Number(id),
      todo: '',
      completed,
    };
  },
};