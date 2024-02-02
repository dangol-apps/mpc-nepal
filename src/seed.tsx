import { Player, Round, Score, ScoreDetail } from "./models";

export const seedData = () => {
    const initialPlayers: Player[] = [
        // { playerId: 1, name: 'Adam' },
        // { playerId: 2, name: 'Ben' },
        // { playerId: 3, name: 'Cathey' },
        // { playerId: 4, name: 'Dan' },
        // { playerId: 5, name: 'Dan' },
        // { playerId: 6, name: 'Dan' },
    ];
    const initialRate = 0.25;

    const initialRounds: Round[] = [
        // {
        //     roundId: 1,
        //     roundDetails: [
        //         { playerId: 1, maal: 10, seen: true, winner: true, dubli: false },
        //         { playerId: 2, maal: 5, seen: true, winner: false, dubli: false },
        //         { playerId: 3, maal: 0, seen: false, winner: false, dubli: false },
        //         { playerId: 4, maal: 0, seen: false, winner: false, dubli: false },
        //     ]
        // }, {
        //     roundId: 2,
        //     roundDetails: [
        //         { playerId: 1, maal: 0, seen: false, winner: false, dubli: false },
        //         { playerId: 2, maal: 15, seen: true, winner: true, dubli: false },
        //         { playerId: 3, maal: 5, seen: false, winner: false, dubli: false },
        //         { playerId: 4, maal: 8, seen: true, winner: false, dubli: false },
        //     ]
        // }, {
        //     roundId: 3,
        //     roundDetails: [
        //         { playerId: 1, maal: 8, seen: true, winner: false, dubli: false },
        //         { playerId: 2, maal: 5, seen: true, winner: false, dubli: false },
        //         { playerId: 3, maal: 2, seen: true, winner: true, dubli: false },
        //         { playerId: 4, maal: 4, seen: true, winner: false, dubli: false },
        //     ]
        // }
    ];

    const initialRound: Round = {
        roundId: 1,
        roundDetails: [
            //{ playerId: 1, maal: 0, seen: false, winner: false, dubli: false },
            // { playerId: 2, maal: 3, seen: true, winner: false, dubli: false },
            // { playerId: 3, maal: 4, seen: true, winner: true, dubli: true },
            // { playerId: 4, maal: 0, seen: false, winner: false, dubli: false },
        ]
    };

    const initialScores: Score[] = [
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
        // {
        //     roundId: 3,
        //     scoreDetails: [
        //         { playerId: 1, point: 12 },
        //         { playerId: 2, point: 22 },
        //         { playerId: 3, point: 32 },
        //         { playerId: 4, point: 42 },
        //     ]
        // },
    ];

    const initialTotalPoints: ScoreDetail[] = [
        // { playerId: 1, point: 10 },
        // { playerId: 2, point: 20 },
        // { playerId: 3, point: 30 },
        // { playerId: 4, point: 40 },
    ];
    return { initialPlayers, initialRate, initialRounds, initialTotalPoints, initialRound, initialScores };
}