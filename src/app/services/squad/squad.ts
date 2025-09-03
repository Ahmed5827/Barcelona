import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { squad } from '../../interfaces/squad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class squadservice {
  
  private http = inject(HttpClient);
  private baseUrl = "https://v3.football.api-sports.io/players/squads"
  private apikey = environment.apiKey ? environment.apiKey : '';
  
  getSquad(teamId: number): Observable<squad> {

    const params = {
      team: teamId.toString()
    };

    const headers = {
      'x-apisports-key': this.apikey,
      'Accept': 'application/json'
    };

    return this.http.get<squad>(this.baseUrl, { headers, params });
}
}