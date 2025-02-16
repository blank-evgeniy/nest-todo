import { useCreateTodo } from '@/shared/api/todo/hooks/useCreateTodo';
import { AddTodoForm, addTodoFormSchema } from '@/shared/lib/validation/add-todo.validation';
import { Button } from '@/shared/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

export const FirstTodo = () => {
  const { mutate, isPending } = useCreateTodo();

  const form = useForm<AddTodoForm>({
    resolver: zodResolver(addTodoFormSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(values: AddTodoForm) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col items-start gap-4 rounded-sm border p-2 shadow-sm sm:flex-row'
      >
        <div className='w-full space-y-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Enter the name of your first ToDo'
                    {...field}
                    autoComplete='off'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder='Enter a description as desired' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='ml-auto flex gap-2'>
          <Button type='submit' className='cursor-pointer' size={'sm'} disabled={isPending}>
            Create first ToDo <PlusIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};
