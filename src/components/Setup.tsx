
import { Dispatch, SetStateAction } from "react";
import { Player } from "../models";

const Setup = ({ players, setPlayers, rate, setRate }
    : {
        players: Player[], setPlayers: Dispatch<SetStateAction<Player[]>>,
        rate: number, setRate: Dispatch<SetStateAction<number>>
    }) => {
    const handleNameInputChange = (id: number, e: any) => {
        if (!players.some(player => player.playerId === id)) {
            setPlayers([...players, { playerId: id, name: e.target.value }]);
        }

        const currentPlayer = players.find(player => player.playerId === id);
        if (currentPlayer) {
            const updatedPlayer: Player = { ...currentPlayer, name: e.target.value };
            setPlayers(prevPlayers => prevPlayers.map(player => player.playerId === updatedPlayer.playerId ? updatedPlayer : player));
        }
    }

    const handleNameInputBlur = (id: number, e: any) => {
        if (e.target.value.trim() === '') {
            setPlayers(players.filter(player => player.playerId !== id));
        }
    }

    const handleRateInputChange = (e: any) => {
        setRate(e.target.value);
    }

    const renderPlayerInput = (id: number) => (
        <div>
            Player#{id}
            <input
                id={String(id)}
                value={players.find(player => player.playerId === id)?.name ?? ''}
                onChange={(e) => handleNameInputChange(id, e)}
                onBlur={(e) => handleNameInputBlur(id, e)} />
        </div>

    )

    return (<>
        <h2>Setup</h2>
        {renderPlayerInput(1)}
        {renderPlayerInput(2)}
        {renderPlayerInput(3)}
        {renderPlayerInput(4)}
        {renderPlayerInput(5)}
        {renderPlayerInput(6)}
        {JSON.stringify(players)}

        <p>Rate</p>
        <input value={rate} onChange={handleRateInputChange}></input>
        {JSON.stringify(rate)}
    </>);
}
export default Setup;