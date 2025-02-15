import { useQuery } from '@tanstack/react-query';
import { todoService } from '../todo.service';

export const useTodo = (id: number) =>
  useQuery({
    queryKey: todoService.getQueryKey([`${id}`]),
    queryFn: () => todoService.getTodoById(id),
  });
