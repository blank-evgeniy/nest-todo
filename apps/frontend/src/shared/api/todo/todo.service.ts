import { axiosWithAuth } from '../../config/api/api';
import { ToDo, ToDoCreateInput, ToDoUpdateInput } from '@/shared/types/todo';

class TodoService {
  private BASE_URL = '/todo';

  getQueryKey(otherKeys?: string[] | string) {
    if (!otherKeys) return [this.BASE_URL];

    if (typeof otherKeys === 'string') return [this.BASE_URL, otherKeys];

    return [this.BASE_URL, ...otherKeys];
  }

  async getTodos() {
    const response = await axiosWithAuth.get<ToDo[]>(this.BASE_URL);

    return response.data;
  }

  async getTodoById(id: number) {
    const response = await axiosWithAuth.get<ToDo>(`${this.BASE_URL}/${id}`);

    return response.data;
  }

  async createTodo(newToDoData: ToDoCreateInput) {
    const response = await axiosWithAuth.post<ToDo>(this.BASE_URL, newToDoData);

    return response.data;
  }

  async updateTodo(id: number, updateToDoData: ToDoUpdateInput) {
    const response = await axiosWithAuth.patch<ToDo>(`${this.BASE_URL}/${id}`, updateToDoData);

    return response.data;
  }

  async deleteTodo(id: number) {
    await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
  }
}

export const todoService = new TodoService();
