import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import { useCreateTodo } from '@/shared/api/todo/hooks/useCreateTodo';
import { AddTodoForm, addTodoFormSchema } from '@/shared/lib/validation/add-todo.validation';
import { Button, buttonVariants } from '@/shared/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Input } from '@/shared/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Textarea } from '@/shared/ui/textarea';
import { PlusIcon } from 'lucide-react';

export const AddTodo = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { mutate, isPending } = useCreateTodo();

  const form = useForm<AddTodoForm>({
    resolver: zodResolver(addTodoFormSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(values: AddTodoForm) {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        setPopoverOpen(false);
      },
    });
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ size: 'default', variant: 'default', className: 'cursor-pointer' })
        )}
      >
        New ToDo <PlusIcon />
      </PopoverTrigger>
      <PopoverContent align='start' className='w-72 min-[360px]:w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>New ToDo</h4>
            <p className='text-sm text-muted-foreground'>Enter the data of the new ToDo</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder='ToDo...' {...field} autoComplete='off' />
                    </FormControl>
                    <FormDescription>It's the name of your ToDo.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Description...' {...field} autoComplete='off' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                variant={'outline'}
                className='ml-auto cursor-pointer'
                disabled={isPending}
              >
                Create
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
