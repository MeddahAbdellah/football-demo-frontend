import { Route } from '@angular/router';
import { TeamsComponent } from '../components/teams.component';

export const teamsRoutes: Route[] = [
  {
    path: '',
    component: TeamsComponent,
  },
  {
    path: ':teamId/players',
    component: TeamsComponent,
  },
];
