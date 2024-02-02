export interface Player {
    playerId: number;
    name: string;
}
export interface Round {
    roundId: number;
    roundDetails: RoundDetail[];
}
export interface RoundDetail {
    playerId: number;
    maal: number;
    seen: boolean;
    winner: boolean;
    dubli: boolean;
}
export interface Score {
    roundId: number;
    scoreDetails: ScoreDetail[];
}
export interface ScoreDetail {
    playerId: number;
    point: number;
}
