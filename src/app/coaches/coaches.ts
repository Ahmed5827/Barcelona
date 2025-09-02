import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs'; // Import Observable and of
import { catchError, finalize, tap } from 'rxjs/operators'; // Import operators
import { CoachesResponse } from './../interfaces/coaaches'; // fixed path - ensure this path is correct
import { Coaches } from './../services/coaches/coaches';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coaches.html', // This template will need updates too!
  styleUrls: ['./coaches.css']
})
export class CoachesComponent implements OnInit {
  private coachesService = inject(Coaches); // Renamed for clarity, good practice

  // Observable to hold the coaches data, can be null initially or on error
  coachesResponse$: Observable<CoachesResponse | null> = of(null); 
  
  // State variables for loading and errors
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Configuration (you might want to make these inputs if team ID changes)
  readonly TEAM_ID = 529;

  ngOnInit(): void {
    console.log('CoachesComponent initialized');
    this.loadCoaches(); // Call the method to fetch coaches
  }

  private loadCoaches(): void {
    this.isLoading = true; // Set loading to true before the call
    this.errorMessage = null; // Clear any previous error messages

    this.coachesResponse$ = this.coachesService.getCoachesByTeam(this.TEAM_ID).pipe(
      tap(data => {
        // Use tap for side effects like logging without modifying the stream
        console.log('Coaches data received:', data);
        console.log('Results count:', data.results);
        console.log('Errors:', data.errors);
        console.log('Response array length:', data.response?.length);
      }),
      catchError(error => {
        console.error('Error fetching coaches:', error);
        this.errorMessage = 'Failed to load coaches. Please try again later.';
        // Return an observable with a dummy error response, so the template can display it
        return of({ 
          get: 'coachs',
          parameters: { team: this.TEAM_ID.toString() }, // Ensure type matches
          errors: [this.errorMessage], 
          results: 0, 
          paging: { current: 1, total: 1 },
          response: [] 
        });
      }),
      finalize(() => {
        this.isLoading = false; // Always set loading to false after completion or error
        console.log('Coaches subscription completed');
      })
    );
  }

  trackByCoachId(index: number, coach: any): any {
    // Robust trackBy: returns coach.id if it exists, otherwise the index
    return coach?.id ?? index;
  }

  trackByCareerTeamId(index: number, career: any): any {
    // Robust trackBy: returns career.team.id if it exists, otherwise the index
    return career?.team?.id ?? index;
  }

  onImageError(event: Event, name: string): void {
    const target = event.target as HTMLImageElement;
    target.src = `https://via.placeholder.com/150x150/570df8/ffffff?text=${name?.charAt(0) || '?'}`;
  }
}