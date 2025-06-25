import { Component, inject, signal } from '@angular/core';
import { IApiResponse, IPlayer, ITeam } from '../../model/nba';
import { NbaService } from '../../services/nba-service';
import { PlayerInfo } from './player-info/player-info';

@Component({
  selector: 'app-players',
  imports: [PlayerInfo],
  templateUrl: './players.html',
  styleUrl: './players.css',
})
export class Players {
  teams = signal<ITeam[]>([]);
  selectedTeam = signal<ITeam | null>(null);
  players = signal<IPlayer[]>([]); // Signal to hold players data
  seasons = signal<number[]>([]); // Signal to hold available seasons
  selectedSeason = signal<number>(2024); // Default or latest season

  // Inject service
  nbaService = inject(NbaService);

  constructor() {
    this.getTeams();
    this.getSeason();
  }

  getTeams() {
    this.nbaService.getNBATeams().subscribe((data: IApiResponse) => {
      // The API response is a single IApiResponse object
      const teams = data.response as ITeam[];
      // Filter teams that have the 'nbaFranchise' property set to true
      this.teams.set(teams.filter((team) => team.nbaFranchise));
      console.log('NBA Teams:', this.teams());
    });
  }

  getSeason() {
    this.nbaService.getSeasons().subscribe((data: IApiResponse) => {
      const seasons = data.response as number[];
      this.seasons.set(seasons);
      console.log('NBA Seasons:', this.seasons());
    });
  }

  getPlayersByTeamIdAndSeason(teamId: number, season: number) {
    this.nbaService
      .getPlayersByTeamAndSeason(teamId, season)
      .subscribe((data: any) => {
        // The API response has a "response" property containing the players array
        const players = data.response;
        // Update the players signal with the fetched data
        this.players.set(players);
        console.log(
          `Players for team ID ${teamId} in season ${season}:`,
          players
        );
        return players;
      });
  }

  selectTeam(team: ITeam) {
    this.selectedTeam.set(team);
    this.getPlayersByTeamIdAndSeason(team.id, 2024);
  }

  onSeasonChange(season: number) {
    this.selectedSeason.set(+season);
    const team = this.selectedTeam();
    if (team) {
      this.getPlayersByTeamIdAndSeason(team.id, +season);
    }
  }
}
