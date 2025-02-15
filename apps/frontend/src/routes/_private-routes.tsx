import { getAuthToken } from '@/shared/config/api/auth-token';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_private-routes')({
  beforeLoad: () => {
    const isLogged = getAuthToken();

    if (!isLogged) {
      throw redirect({ to: '/auth' });
    }
  },
});
