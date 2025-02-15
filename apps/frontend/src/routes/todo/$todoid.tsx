import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todo/$todoid')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/todo/$todoid"!</div>
}
