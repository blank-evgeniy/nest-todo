import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../todo.service';
import { ToDoCreateInput } from '@/shared/types/todo';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newToDoData: ToDoCreateInput) => todoService.createTodo(newToDoData),
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: todoService.getQueryKey() });
    },
  });
};
