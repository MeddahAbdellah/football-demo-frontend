import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Player, type Team } from '../model';
import { of, switchMap } from 'rxjs';
import { ClientService } from '@libs/client';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

@Component({
  selector: 'app-leagues',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzAutocompleteModule,
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss',
})
export class TeamsComponent {
  clientService = inject(ClientService);
  players = inject(ActivatedRoute).paramMap.pipe(
    switchMap((params) => {
      return params.get('teamId')
        ? this.clientService.get<Player[]>(
            `/teams/${params.get('teamId')}/players`,
          )
        : of([]);
    }),
  );
}
