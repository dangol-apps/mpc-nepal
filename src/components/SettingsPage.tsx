import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Player from '../models/Player';

interface SettingsPageProps {
    params: { ratePerPoint: number; players: Player[] };
    setParams: React.Dispatch<React.SetStateAction<{ ratePerPoint: number; players: Player[] }>>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ params, setParams }) => {
    const handlePlayerNameChange = (id: number, name: string) => {
        setParams((prevParams) => ({
            ...prevParams,
            players: prevParams.players.map((player) =>
                player.id === id ? { ...player, name } : player
            ),
        }));
    };

    const handleRatePerPointChange = (value: number) => {
        setParams((prevParams) => ({
            ...prevParams,
            ratePerPoint: value,
        }));
    };

    return (
        <div>
            <h1>Settings</h1>
            <div>
                <label>Rate per Point: </label>
                <input
                    type="number"
                    value={params.ratePerPoint}
                    onChange={(e) => handleRatePerPointChange(Number(e.target.value))}
                />
            </div>
            <div>
                <h2>Players:</h2>
                {params.players.map((player) => (
                    <div key={player.id}>
                        <label>{`Player ${player.id}: `}</label>
                        <input
                            type="text"
                            value={player.name}
                            onChange={(e) => handlePlayerNameChange(player.id, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <Link to="/game">
                Start Game
            </Link>
        </div>
    );
};

export default SettingsPage;