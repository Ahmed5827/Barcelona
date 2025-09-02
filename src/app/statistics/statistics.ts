// src/app/statistics/statistics.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { Stats, MultiSeasonStats } from '../services/stats/stats';
import { TeamStatsResponse, TeamStats } from './../interfaces/team-stats';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css']
})
export class Statistics implements OnInit {
  private statsService = inject(Stats);
  
  multiSeasonStats$: Observable<MultiSeasonStats | null> = of(null);
  errorMessage: string | null = null;
  loading = false;
  
  // Configuration
  readonly LEAGUE_ID = 140; // La Liga
  readonly TEAM_ID = 529;   // Barcelona
  readonly SEASONS = [2021, 2022, 2023];
  
  selectedSeason = 2021;

  ngOnInit(): void {
    this.loadMultiSeasonStats();
  }

  private loadMultiSeasonStats(): void {
    this.loading = true;
    this.errorMessage = null; // Clear previous errors when reloading

    this.multiSeasonStats$ = this.statsService.getMultiSeasonStats(
      this.LEAGUE_ID, 
      this.TEAM_ID, 
      this.SEASONS
    ).pipe(
      catchError(error => {
        console.error('Error fetching statistics:', error);
        this.errorMessage = 'Failed to load statistics. Please try again later.';
        // Don't set loading = false here, finalize will handle it.
        // Return an observable with null to handle the error state in the template.
        return of(null); 
      }),
      finalize(() => { // <--- CORRECT POSITION
          this.loading = false; // This will now always run after success or error
      })
    );
  }

  selectSeason(season: number): void {
    this.selectedSeason = season;
  }

  getWinPercentage(stats: TeamStats): number {
    if (stats.fixtures.played.total === 0) return 0;
    return Math.round((stats.fixtures.wins.total / stats.fixtures.played.total) * 100);
  }

  getFormattedForm(form: string, limit: number = 10): string {
    return form.slice(-limit).split('').join(' ');
  }

  getGoalDifference(stats: TeamStats): number {
    return stats.goals.for.total.total - stats.goals.against.total.total;
  }
}