import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { type League } from '../model';
import { type Team } from '@libs/teams';
import { of, startWith, switchMap } from 'rxjs';
import { ClientService } from '@libs/client';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzAutocompleteModule,
    NzInputModule,
  ],
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.scss',
})
export class LeaguesComponent {
  router = inject(Router);
  clientService = inject(ClientService);
  teams = inject(ActivatedRoute).paramMap.pipe(
    switchMap((params) => {
      return params.get('leagueId')
        ? this.clientService.get<Team[]>(
            `/leagues/${params.get('leagueId')}/teams`,
          )
        : of([]);
    }),
  );
  leagueFromControl = new FormControl();
  leagues = this.clientService.get<League[]>(`/leagues`).pipe(
    switchMap((leagues) =>
      this.leagueFromControl.valueChanges.pipe(
        switchMap((value) =>
          this.clientService.get<League[]>(`/leagues?name=${value}`),
        ),
        startWith(leagues),
      ),
    ),
  );

  onLeagueChange(leagueId: string) {
    if (leagueId) {
      this.router.navigate(['/leagues', leagueId, 'teams']);
    }
  }

  onTeamSelected(teamId: string) {
    this.router.navigate(['/teams', teamId, 'players']);
  }
}
