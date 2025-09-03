// src/app/services/stats/stats.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { TeamStatsResponse } from '../../interfaces/team-stats';
import { environment } from './../../../environments/environment';
export interface MultiSeasonStats {
  [season: number]: TeamStatsResponse;
}

@Injectable({ providedIn: 'root' })
export class Stats {
  private http = inject(HttpClient);
  private baseUrl = "https://v3.football.api-sports.io/teams/statistics";
  private apiKey = environment.apiKey ? environment.apiKey : '';

  getStats(league: number, team: number, season: number): Observable<TeamStatsResponse> {
    const params = new HttpParams()
      .set('league', league.toString())
      .set('team', team.toString())
      .set('season', season.toString());

    const headers = new HttpHeaders({
      'x-apisports-key': this.apiKey,
      'Accept': 'application/json'
    });

    return this.http.get<TeamStatsResponse>(this.baseUrl, { headers, params });
  }

  getMultiSeasonStats(league: number, team: number, seasons: number[]): Observable<MultiSeasonStats> {
    const requests = seasons.map(season => 
      this.getStats(league, team, season).pipe(
        map(response => ({ season, data: response }))
      )
    );

    return forkJoin(requests).pipe(
      map(results => {
        const multiSeasonStats: MultiSeasonStats = {};
        results.forEach(result => {
          multiSeasonStats[result.season] = result.data;
        });
        return multiSeasonStats;
      })
    );
  }
}