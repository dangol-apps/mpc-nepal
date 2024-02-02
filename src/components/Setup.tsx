
import { Dispatch, SetStateAction } from "react";
import { Player } from "../models";

const Setup = ({ players, setPlayers, rate, setRate, changedPlayerId, setChangedPlayerId }
    : {
        players: Player[], setPlayers: Dispatch<SetStateAction<Player[]>>,
        rate: number, setRate: Dispatch<SetStateAction<number>>
        changedPlayerId: number | null, setChangedPlayerId: Dispatch<SetStateAction<number | null>>
    }) => {
    const handleNameInputChange = (id: number, e: any) => {
        setPlayers(players.some(player => player.playerId === id) ?
            prevPlayers => prevPlayers.map(player => player.playerId === id ? { ...player, name: e.target.value } : player) :
            [...players, { playerId: id, name: e.target.value }]
        );

        setChangedPlayerId(id);
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