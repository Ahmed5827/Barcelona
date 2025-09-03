import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'statistics',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'coaches',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'players',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'players/**',  // This catches all /players/:id routes
    renderMode: RenderMode.Server  // Use Server-side rendering instead of prerendering
  }
];