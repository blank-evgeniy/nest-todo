import { createFileRoute } from '@tanstack/react-router';
import { TodoCard } from './-components/TodoCard';
import { AddTodo } from './-components/AddTodo';
import { useTodoList } from '@/shared/api/todo/hooks/useTodoList';

export const Route = createFileRoute('/_private-routes/_layout/')({ component: Index });

function Index() {
  const { data } = useTodoList();

  return (
    <div className='mx-auto max-w-[720px] py-4'>
      <AddTodo />
      <div className='mt-4 flex flex-col gap-4'>
        {!!data && !!data.length && data.map((todo) => <TodoCard data={todo} key={todo.id} />)}
      </div>
    </div>
  );
}
