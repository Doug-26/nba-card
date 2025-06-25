export interface LeagueInfo {
  conference: string | null;
  division: string | null;
}

export interface Leagues {
  standard?: LeagueInfo;
  vegas?: LeagueInfo;
  utah?: LeagueInfo;
  sacramento?: LeagueInfo;
  africa?: LeagueInfo;
}

export interface ITeam {
  id: number;
  name: string;
  nickname: string;
  code: string;
  city: string | null;
  logo: string | null;
  allStar: boolean;
  nbaFranchise: boolean;
  leagues: Leagues;
}

export interface PlayerBirth {
  date: string | null;
  country: string | null;
}

export interface PlayerNBA {
  start: number;
  pro: number;
}

export interface PlayerHeight {
  feets: string | null;
  inches: string | null;
  meters: string | null;
}

export interface PlayerWeight {
  pounds: string | null;
  kilograms: string | null;
}

export interface PlayerLeagueInfo {
  jersey: number | null;
  active: boolean;
  pos: string | null;
}

export interface PlayerLeague {
  standard?: PlayerLeagueInfo;
  vegas?: PlayerLeagueInfo;
  utah?: PlayerLeagueInfo;
  sacramento?: PlayerLeagueInfo;
  africa?: PlayerLeagueInfo;
}

export interface IPlayer {
  id: number;
  firstname: string;
  lastname: string;
  birth: PlayerBirth;
  nba: PlayerNBA;
  height: PlayerHeight;
  weight: PlayerWeight;
  college: string | null;
  affiliation: string | null;
  leagues: PlayerLeague;
}

export interface IApiResponse {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  response: ITeam[] | IPlayer[] | number[]; // Adjusted to handle both teams and players
}
