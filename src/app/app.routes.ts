import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'leagues',
    loadChildren: () => import('@libs/leagues').then((m) => m.leaguesRoutes),
  },
  {
    path: 'teams',
    loadChildren: () => import('@libs/teams').then((m) => m.teamsRoutes),
  },
  {
    path: '',
    redirectTo: '/leagues',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/leagues',
  },
];
