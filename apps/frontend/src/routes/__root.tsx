import { ThemeProvider } from '@/providers/theme/ThemeProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <Outlet />
      </ThemeProvider>
      <TanStackRouterDevtools />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  ),
});
