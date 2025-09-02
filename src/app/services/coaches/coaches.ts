// src/app/services/coaches/coaches.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoachesResponse } from './../../interfaces/coaaches'; // Fixed path - should be 'coaches' not 'coaaches'
import { environment } from './../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class Coaches {
  private http = inject(HttpClient);
  private baseUrl = "https://v3.football.api-sports.io/coachs";
  private apiKey = environment.apiKey ? environment.apiKey : '';

  getCoachesByTeam(teamId: number): Observable<CoachesResponse> {
    console.log('API Key:', this.apiKey); // Debugging line to check if API key is loaded
    const params = new HttpParams()
      .set('team', teamId.toString());

    const headers = new HttpHeaders({
      'x-apisports-key': this.apiKey,
      'Accept': 'application/json'
    });

    console.log('Making API call to:', this.baseUrl);
    console.log('With team ID:', teamId);

    return this.http.get<CoachesResponse>(this.baseUrl, { headers, params });
  }
}