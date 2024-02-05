import { Player, Round, Score, ScoreDetail } from "./models";

export const initialPlayers = (): Player[] => {
    const mockPlayers: Player[] = [
        // { playerId: 1, name: 'Adam' },
        // { playerId: 2, name: 'Ben' },
        // { playerId: 3, name: 'Cathey' },
        // { playerId: 4, name: 'Dan' }
    ];
    const players = JSON.parse(localStorage.getItem('players') ?? '[]') as Player[];
    return players.length === 0 ? mockPlayers : players;
}

export const initialRate = (): number => {
    const mockRate: string = '0.25';
    localStorage.setItem('rate', '0.25');
    return JSON.parse(localStorage.getItem('rate')?.toString() ?? mockRate) as number;
}

export const initialRound = (): Round => {
    const mockRound: Round = {
        roundId: 1,
        roundDetails: [
            //{ playerId: 1, maal: 0, seen: false, winner: false, dubli: false },
            // { playerId: 2, maal: 3, seen: true, winner: false, dubli: false },
            // { playerId: 3, maal: 4, seen: true, winner: true, dubli: true },
            // { playerId: 4, maal: 0, seen: false, winner: false, dubli: false },
        ]
    }
    const round = JSON.parse(localStorage.getItem('round') ?? '{}');
    return JSON.stringify(round) === '{}' ? mockRound : round;
}

export const initialScores = () => {

    const mockScores: Score[] = [
        // {
        //     roundId: 1,
        //     scoreDetails: [
        //         { playerId: 1, point: 11 },
        //         { playerId: 2, point: 21 },
        //         { playerId: 3, point: 31 },
        //         { playerId: 4, point: 41 },
        //     ]
        // },
        // {
        //     roundId: 2,
        //     scoreDetails: [
        //         { playerId: 1, point: 11 },
        //         { playerId: 2, point: 21 },
        //         { playerId: 3, point: 31 },
        //         { playerId: 4, point: 41 },
        //     ]
        // },
    ];
    const scores = JSON.parse(localStorage.getItem('scores') ?? '[]') as Score[];
    return scores.length === 0 ? mockScores : scores;
}

export const initialTotalScore = () => {
    const mockTotalScore: ScoreDetail[] = [
        // { playerId: 1, point: 10 },
        // { playerId: 2, point: 20 },
        // { playerId: 3, point: 30 },
        // { playerId: 4, point: 40 },
    ];
    const scores = localStorage.getItem('totalScores');
    return !scores || scores == null ? mockTotalScore : JSON.parse(scores)
}