
import { Dispatch, SetStateAction } from "react";
import { Player } from "../models";

const Setup = ({ players, setPlayers, rate, setRate }: { players: Player[], setPlayers: Dispatch<SetStateAction<Player[]>>, rate: number, setRate: Dispatch<SetStateAction<number>> }) => {
    const handleNameInputChange = (id: number, e: any) => {
        const currentPlayer = players.find(player => player.playerId === id);
        if (currentPlayer) {
            const updatedPlayer: Player = { ...currentPlayer, name: e.target.value };
            setPlayers(prevPlayers =>
                prevPlayers.map(player =>
                    player.playerId === updatedPlayer.playerId ? updatedPlayer : player));
        }
    }

    const handleRateInputChange = (e: any) => {
        setRate(e.target.value);
    }
    const renderPlayerInput = (id: number) => (
        <div>
            <div>
                Player#{id}
                <input
                    id={String(id)}
                    value={players.find(player => player.playerId === id)?.name}
                    onChange={(e) => handleNameInputChange(id, e)} />
            </div>
        </div >
    )

    return (<>
        <h2>Setup</h2>
        {renderPlayerInput(1)}
        {renderPlayerInput(2)}
        {renderPlayerInput(3)}
        {renderPlayerInput(4)}
        {JSON.stringify(players)}

        <p>Rate</p>
        <input value={rate} onChange={handleRateInputChange}></input>
        {JSON.stringify(rate)}
    </>);
}
export default Setup;