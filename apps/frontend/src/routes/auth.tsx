import { LoginForm } from '@/components/widgets/loginForm/LoginForm';
import { RegisterForm } from '@/components/widgets/registerForm/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-4 md:p-10'>
      <Tabs defaultValue='login' className='w-full max-w-[420px]'>
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
