import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <div>Not Found Page</div>,
  defaultErrorComponent: () => <div>Error Page</div>,
});

export default router;
