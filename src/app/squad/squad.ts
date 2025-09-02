import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { squadservice } from './../services/squad/squad';
import { squad, Player, Position } from '../interfaces/squad';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-squad',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './squad.html',
  styleUrl: './squad.css'
})
export class Squad implements OnInit {
  private TEAM_ID = 529; // Example team ID, you can change this as needed
  private squadservice = inject(squadservice); // Inject the Squad service

  // Component properties to hold the data
  squadData$: Observable<squad | null> = of(null);
  isLoading = false;
  error: string | null = null;

  // Position enum for template access
  Position = Position;

  ngOnInit(): void {
    this.loadSquadData();
  }
 constructor(private router: Router) { }
  private loadSquadData(): void {
    this.isLoading = true;
    this.error = null; // Clear previous errors when reloading

    this.squadData$ = this.squadservice.getSquad(this.TEAM_ID).pipe(
      catchError(error => {
        console.error('Error fetching squad data:', error);
        this.error = 'Failed to load squad data. Please try again.';
        // Return an observable with null to handle the error state
        return of(null);
      }),
      finalize(() => {
        this.isLoading = false; // This will always run after success or error
      })
    );
  }

  // Helper method to get players by position
  getPlayersByPosition(position: Position, squadData: squad | null): Player[] {
    if (!squadData?.response?.[0]?.players) {
      return [];
    }
    return squadData.response[0].players.filter(player => player.position === position);
  }

  // Helper method to retry loading data
  retry(): void {
    this.loadSquadData();
  }

  navigateToPlayer(player: Player): void {
  this.router.navigate(['/players', player.id], {
    state: player
  });
}

}