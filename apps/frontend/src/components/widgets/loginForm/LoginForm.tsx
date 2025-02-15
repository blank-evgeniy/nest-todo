import { useLogin } from '@/shared/api/auth/hooks/useLogin';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useNavigate } from '@tanstack/react-router';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const navigate = useNavigate();

  const { mutate, isPending } = useLogin({
    onSuccess: () => navigate({ to: '/' }),
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const requestData = { password, email };

    mutate(requestData);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input name='email' id='email' type='email' placeholder='m@example.com' required />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input name='password' id='password' type='password' required />
              </div>
              <Button type='submit' className='w-full' disabled={isPending}>
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
