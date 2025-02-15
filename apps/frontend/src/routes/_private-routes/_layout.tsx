import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Footer, Header } from '../../components/layout';

export const Route = createFileRoute('/_private-routes/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='container mx-auto overflow-hidden px-4'>
      <div className='flex h-full min-h-screen flex-col'>
        <Header />

        <main className='flex-1'>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
