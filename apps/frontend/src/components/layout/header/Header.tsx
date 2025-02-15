import { ThemeToggle } from '@/components/widgets/ThemeToggle/ThemeToggler';
import { authService } from '@/shared/api/auth/auth.service';
import { useProfile } from '@/shared/api/profile/hooks/useProfile';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Skeleton } from '@/shared/ui/skeleton';
import { useNavigate } from '@tanstack/react-router';
import { SquareCheck } from 'lucide-react';
import { useCallback, useEffect } from 'react';

export const Header = () => {
  const { data: profile, isLoading, error } = useProfile();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) navigate({ to: '/auth' });
  }, [error, navigate]);

  const handleLogout = useCallback(() => {
    authService.logout();
    navigate({ to: '/auth' });
  }, [navigate]);

  const userName = profile?.name ?? profile?.email;

  return (
    <header className='container flex justify-between py-2 sm:py-4'>
      <h2 className='group flex items-center gap-2 text-xl font-semibold'>
        <SquareCheck /> NestToDo
      </h2>

      <div className='flex gap-4'>
        {isLoading || !userName ? (
          <Skeleton className='h-10 w-10 shrink-0 rounded-full' />
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className='cursor-pointer'>
                <Avatar>
                  <AvatarFallback className='font-semibold'>{userName?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end' sideOffset={8} className='w-56'>
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Button
                    onClick={handleLogout}
                    variant={'destructive'}
                    className='w-full cursor-pointer'
                    size={'sm'}
                  >
                    Log out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};
