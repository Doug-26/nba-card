import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IPlayer, ITeam } from '../model/nba';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NbaService {
  private http = inject(HttpClient);
  private teamApiUrl = `${environment.apiBaseUrl}/teams`;
  private playerApiUrl = `${environment.apiBaseUrl}/players`;
  private seasonApiUrl = `${environment.apiBaseUrl}/seasons`;
  private headers = new HttpHeaders({
    'x-rapidapi-key': environment.rapidApiKey,
    'x-rapidapi-host': environment.rapidApiHost,
  });

  getNBATeams(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.teamApiUrl, {
      headers: this.headers,
    });
  }

  getPlayersByTeamAndSeason(
    teamId: number,
    season: number
  ): Observable<IPlayer[]> {
    const url = `${this.playerApiUrl}?team=${teamId}&season=${season}`;
    return this.http.get<IPlayer[]>(url, { headers: this.headers });
  }

  getSeasons(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.seasonApiUrl, {
      headers: this.headers,
    });
  }
}
