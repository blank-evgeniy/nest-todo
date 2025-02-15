import { useQuery } from '@tanstack/react-query';
import { todoService } from '../todo.service';

export const useTodoList = () =>
  useQuery({
    queryKey: todoService.getQueryKey('list'),
    queryFn: () => todoService.getTodos(),
  });
