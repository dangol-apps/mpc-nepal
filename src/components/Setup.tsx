
import { Dispatch, SetStateAction } from "react";
import { Player } from "../models/models";
import { Button, TextField } from "@mui/material";

const Setup = ({ players, setPlayers, rate, setRate, setChangedPlayerId, handleResetClick }
    : {
        players: Player[], setPlayers: Dispatch<SetStateAction<Player[]>>,
        rate: number, setRate: Dispatch<SetStateAction<number>>,
        setChangedPlayerId: Dispatch<SetStateAction<number | null>>,
        handleResetClick: any
    }) => {


    const handleNameInputChange = (id: number, e: any) => {
        const updatedPlayers = players.some(player => player.playerId === id) ?
            players.map(player => player.playerId === id ? { ...player, name: e.target.value } : player) :
            [...players, { playerId: id, name: e.target.value }];

        setPlayers(updatedPlayers);
        localStorage.setItem("players", JSON.stringify(updatedPlayers));

        setChangedPlayerId(id);
    }

    const handleNameInputBlur = (id: number, e: any) => {
        if (e.target.value.trim() === '') {
            const updatedPlayers = players.filter(player => player.playerId !== id);
            setPlayers(updatedPlayers);
            localStorage.setItem("players", JSON.stringify(updatedPlayers));

            setChangedPlayerId(id);
        }
    }

    const handleRateInputChange = (e: any) => {
        setRate(e.target.value);
        const rateJson = JSON.stringify(e.target.value);
        localStorage.setItem("rate", rateJson);
    }

    const renderPlayerInput = (id: number) => (
        <TextField
            label={`Player#${id}`}
            variant="outlined"
            type="text"
            fullWidth
            placeholder={`Enter player#${id} name`}
            id={String(id)}
            value={players.find(player => player.playerId === id)?.name ?? ''}
            onChange={(e) => handleNameInputChange(id, e)}
            onBlur={(e) => handleNameInputBlur(id, e)} />
    )

    return (<>
        <h2>Setup</h2>
        <div className="player-setup">
            {renderPlayerInput(1)}
            {renderPlayerInput(2)}
            {renderPlayerInput(3)}
            {renderPlayerInput(4)}
            {renderPlayerInput(5)}
            {renderPlayerInput(6)}
        </div>
        <div className="rate-setup">
            <TextField
                label='Rate'
                variant="outlined"
                type="text"
                fullWidth
                placeholder='Enter Rate'
                value={rate}
                onChange={handleRateInputChange} />
        </div>
        <Button onClick={handleResetClick}>Reset</Button>
        {/* <div className="debug-json">{'players: ' + JSON.stringify(players)}</div>
        <div className="debug-json">{'rate:' + JSON.stringify(rate)}</div> */}
    </>);
}
export default Setup;