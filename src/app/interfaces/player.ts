export interface player {
    get:        string;
    parameters: Parameters;
    errors:     any[];
    results:    number;
    paging:     Paging;
    response:   Response[];
}

export interface Paging {
    current: number;
    total:   number;
}

export interface Parameters {
    player: string;
}

export interface Response {
    league:  string;
    country: Country;
    season:  string;
    place:   Place;
}

export enum Country {
    Europe = "Europe",
    Germany = "Germany",
    Poland = "Poland",
    Spain = "Spain",
    World = "World",
    Holland = "Holland",
    Italy = "Italy",
    England = "England",
    Denmark = "Denmark",
    Croatia = "Croatia",
    Portugal = "Portugal",
}

export enum Place {
    The2NdPlace = "2nd Place",
    Winner = "Winner",
}
