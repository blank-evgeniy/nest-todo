import { useMutation } from '@tanstack/react-query';
import { todoService } from '../todo.service';
import { ToDoUpdateInput } from '@/shared/types/todo';
import { queryClient } from '@/providers/query/queryClient';

type MutationParams = {
  id: number;
  updateToDoData: ToDoUpdateInput;
};

export const useUpdateTodo = () =>
  useMutation({
    mutationFn: (params: MutationParams) =>
      todoService.updateTodo(params.id, params.updateToDoData),
    onSettled: async () => {
      queryClient.invalidateQueries({ queryKey: todoService.getQueryKey() });
    },
  });
