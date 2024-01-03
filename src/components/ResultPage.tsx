// ResultPage.tsx

import React from 'react';

interface Player {
    id: number;
    name: string;
    points: number;
}

interface ResultPageProps {
    players: Player[];
}

const ResultPage: React.FC<ResultPageProps> = ({ players }) => {
    return (
        <div>
            <h1>Game Result</h1>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        {player.name}: {player.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultPage;
