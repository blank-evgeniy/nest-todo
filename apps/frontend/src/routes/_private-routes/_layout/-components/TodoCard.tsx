import { useDeleteTodo } from '@/shared/api/todo/hooks/useDeleteTodo';
import { useUpdateTodo } from '@/shared/api/todo/hooks/useUpdateTodo';
import { ToDo } from '@/shared/types/todo';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { TrashIcon } from 'lucide-react';

interface TodoCardProps {
  data: ToDo;
}

export const TodoCard = ({ data }: TodoCardProps) => {
  const { mutate: deleteMutate, isPending: deleteIsPending } = useDeleteTodo();
  const { mutate: updateMutate, isPending: updateIsPending } = useUpdateTodo();

  const isPending = deleteIsPending || updateIsPending;

  const handleToggleComplete = () => {
    updateMutate({ id: data.id, updateToDoData: { complete: !data.complete } });
  };

  return (
    <article className='flex items-start gap-4 rounded-sm border p-2 shadow-sm'>
      <Checkbox
        className='mt-2'
        defaultChecked={data.complete}
        disabled={isPending}
        onClick={handleToggleComplete}
      />
      <div className='flex flex-col'>
        <h2 className='text-lg font-semibold'>{data.title}</h2>
        <p className='text-accent-foreground line-clamp-2'>{data.content}</p>
      </div>
      <div className='ml-auto flex gap-2'>
        {/* <Button className='cursor-pointer' size={'icon'} variant='outline'>
          <Edit2Icon />
        </Button> */}
        <Button
          className='cursor-pointer'
          size={'icon'}
          variant='destructive'
          onClick={() => deleteMutate(data.id)}
          disabled={isPending}
        >
          <TrashIcon />
        </Button>
      </div>
    </article>
  );
};
