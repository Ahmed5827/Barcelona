import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { player } from '../../interfaces/player';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class Playerservice {
  private http = inject(HttpClient);
  private baseUrl = "https://v3.football.api-sports.io/trophies"
  private apikey = environment.apiKey ? environment.apiKey : '';

  getPlayers(playerId: number): Observable<player> {
    const params = {
      player: playerId.toString()
    };
        const headers = {
      'x-apisports-key': this.apikey,
      'Accept': 'application/json'
    };
    return this.http.get<player>(this.baseUrl, { headers, params });
  }
}
