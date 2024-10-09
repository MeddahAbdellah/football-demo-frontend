import { Route } from '@angular/router';
import { LeaguesComponent } from '../components/leagues.component';

export const leaguesRoutes: Route[] = [
  {
    path: '',
    component: LeaguesComponent,
  },
  {
    path: ':leagueId/teams',
    component: LeaguesComponent,
  },
];
