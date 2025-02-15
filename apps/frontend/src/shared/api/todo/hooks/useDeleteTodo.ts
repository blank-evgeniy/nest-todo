import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../todo.service';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => todoService.deleteTodo(id),
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: todoService.getQueryKey() });
    },
  });
};
