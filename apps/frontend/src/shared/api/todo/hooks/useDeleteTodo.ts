import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '../todo.service';
import { ToDo } from '@/shared/types/todo';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => todoService.deleteTodo(id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: todoService.getQueryKey() });
    },
    onSuccess: async (_data, id) => {
      queryClient.setQueryData(todoService.getQueryKey('list'), (old: ToDo[]) =>
        old.filter((todo) => todo.id !== id)
      );
    },
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: todoService.getQueryKey() });
    },
  });
};
