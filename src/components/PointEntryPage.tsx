import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Player from '../models/Player';

interface SettingsPageProps {
    params: { ratePerPoint: number; players: Player[] };
    setParams: React.Dispatch<React.SetStateAction<{ ratePerPoint: number; players: Player[] }>>;
}

const PointEntryPage: React.FC<SettingsPageProps> = ({ params, setParams }) => {
    const [enteredPoints, setEnteredPoints] = useState<number[]>(Array(6).fill(0));

    const handlePointsChange = (index: number, value: number) => {
        setEnteredPoints((prevPoints) =>
            prevPoints.map((point, i) => (i === index ? value : point))
        );
    };

    const handleFinishGame = () => {
        // TODO: Add logic to finish the game with entered points
    };

    return (
        <div>
            <h1>Enter Points</h1>
            <div>
                <h2>Players:</h2>
                {params.players.map((player, index) => (
                    <div key={player.id}>
                        <label>{`${player.name}: `}</label>
                        <input
                            type="number"
                            value={enteredPoints[index]}
                            onChange={(e) => handlePointsChange(index, Number(e.target.value))}
                        />
                    </div>
                ))}
            </div>
            <Link to="/result" onClick={handleFinishGame}>Finish Game</Link>

        </div>
    );
};

export default PointEntryPage;
