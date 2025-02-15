import { LoginForm } from '@/components/widgets/LoginForm/LoginForm';
import { RegisterForm } from '@/components/widgets/RegisterForm/RegisterForm';
import { ThemeToggle } from '@/components/widgets/ThemeToggle/ThemeToggler';
import { getAuthToken } from '@/shared/config/api/auth-token';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { FolderKeyIcon } from 'lucide-react';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  beforeLoad: () => {
    const isLogged = getAuthToken();

    if (isLogged) {
      throw redirect({ to: '/' });
    }
  },
});

function RouteComponent() {
  return (
    <div className='container mx-auto flex min-h-svh w-full flex-col items-center px-4 pb-4'>
      <header className='container flex justify-between py-2 sm:py-4'>
        <h2 className='group flex items-center gap-2 text-xl font-semibold'>
          <FolderKeyIcon /> NestAuth
        </h2>

        <div className='flex gap-4'>
          <ThemeToggle />
        </div>
      </header>
      <Tabs
        defaultValue='login'
        className='mt-4 flex w-full max-w-[420px] flex-1 flex-col lg:mt-20'
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='register'>Sign up</TabsTrigger>
        </TabsList>

        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
        <TabsContent value='register'>
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
