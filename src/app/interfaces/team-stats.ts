export interface TeamStatsResponse {
  get: string;
  parameters: {
    league: string;
    team: string;
    season: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: TeamStats;
}

export interface TeamStats {
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  form: string;
  fixtures: {
    played: SeasonRecord;
    wins: SeasonRecord;
    draws: SeasonRecord;
    loses: SeasonRecord;
  };
  goals: {
    for: GoalStats;
    against: GoalStats;
  };
  biggest: {
    streak: {
      wins: number;
      draws: number;
      loses: number;
    };
    wins: {
      home: string;
      away: string;
    };
    loses: {
      home: string;
      away: string;
    };
    goals: {
      for: {
        home: number;
        away: number;
      };
      against: {
        home: number;
        away: number;
      };
    };
  };
  clean_sheet: SeasonRecord;
  failed_to_score: SeasonRecord;
  penalty: {
    scored: {
      total: number;
      percentage: string;
    };
    missed: {
      total: number;
      percentage: string;
    };
    total: number;
  };
  lineups: Array<{
    formation: string;
    played: number;
  }>;
  cards: {
    yellow: TimeIntervalStats;
    red: TimeIntervalStats;
  };
}

export interface SeasonRecord {
  home: number;
  away: number;
  total: number;
}

export interface GoalStats {
  total: SeasonRecord;
  average: {
    home: string;
    away: string;
    total: string;
  };
  minute: TimeIntervalStats;
  under_over: {
    [key: string]: {
      over: number;
      under: number;
    };
  };
}

export interface TimeIntervalStats {
  [key: string]: {
    total: number | null;
    percentage: string | null;
  };
}