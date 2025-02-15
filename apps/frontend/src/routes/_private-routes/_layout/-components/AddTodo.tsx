import { Button, buttonVariants } from '@/shared/ui/button';
import { PlusIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/lib/utils';
import { useCreateTodo } from '@/shared/api/todo/hooks/useCreateTodo';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

const formSchema = z.object({
  title: z.string().min(2).max(20),
  content: z.string().min(2).max(50).optional(),
});

export const AddTodo = () => {
  const { mutate, isPending } = useCreateTodo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Popover>
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
            <p className='text-muted-foreground text-sm'>Enter the data of the new ToDo</p>
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
                      <Input placeholder='ToDo...' {...field} />
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
                      <Textarea placeholder='Description...' {...field} />
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
