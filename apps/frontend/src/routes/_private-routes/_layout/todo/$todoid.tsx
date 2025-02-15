import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_private-routes/_layout/todo/$todoid')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/todo/$todoid"!</div>;
}
