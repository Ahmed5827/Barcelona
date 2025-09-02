// src/app/interfaces/coaches.ts
export interface CoachesResponse {
  get: string;
  parameters: {
    team: string;
  };
  errors: any[];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: Coach[];
}

export interface Coach {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: {
    date: string;
    place: string | null;
    country: string;
  };
  nationality: string;
  height: string | null;
  weight: string | null;
  photo: string;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  career: CareerEntry[];
}

export interface CareerEntry {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  start: string;
  end: string | null;
}