import { Component, input } from '@angular/core';
import { IPlayer } from '../../../model/nba';

@Component({
  selector: 'app-player-info',
  standalone: true,
  imports: [],
  templateUrl: './player-info.html',
  styleUrl: './player-info.css',
})
export class PlayerInfo {
  players = input<IPlayer[]>([]);
  selectedSeason = input<number>(2024); // Default or latest season
}
