import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Player, Round, RoundDetail, Score, ScoreDetail } from "../models";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

const Calculator = ({ players, scores, setScores, setTotalPoints, initialRound, changedPlayerId, setChangedPlayerId }
    : {
        players: Player[],
        scores: Score[], setScores: Dispatch<SetStateAction<Score[]>>,
        setTotalPoints: Dispatch<SetStateAction<ScoreDetail[]>>,
        initialRound: Round,
        changedPlayerId: number | null, setChangedPlayerId: Dispatch<SetStateAction<number | null>>

    }) => {
    const [round, setRound] = useState<Round>(initialRound);

    // Keep track of players to update the Round
    useEffect(() => {
        if (changedPlayerId !== null) {
            setRound(prevRound => ({
                ...prevRound,
                roundDetails: prevRound.roundDetails.some(roundDetail => roundDetail.playerId === changedPlayerId) ?
                    // Update existing 
                    [...prevRound.roundDetails]
                    :
                    // Create new if not exists
                    [...prevRound.roundDetails,
                    { playerId: changedPlayerId, maal: 0, seen: false, winner: false, dubli: false }]
            }));
        }
    }, [players, changedPlayerId])

    const handlePointInputChange = (id: number, e: any) => {
        setRound(prevRound => ({
            ...prevRound,
            roundDetails: prevRound.roundDetails.some(roundDetail => roundDetail.playerId === id) ?
                // Update existing 
                prevRound.roundDetails.map(roundDetail =>
                    roundDetail.playerId === id ?
                        { ...roundDetail, maal: e.target.value } :
                        roundDetail)
                :
                // Create new if not exists
                [...prevRound.roundDetails,
                { playerId: id, maal: e.target.value, seen: false, winner: false, dubli: false }]
        }));
    }

    const handleCheckboxInputChange = (id: number, checkboxName: string, e: any) => {
        setRound(prevRound => ({
            ...prevRound,
            roundDetails: prevRound.roundDetails.some(roundDetail => roundDetail.playerId === id) ?
                // Update existing 
                prevRound.roundDetails.map(roundDetail =>
                    roundDetail.playerId === id ?
                        {
                            ...roundDetail,
                            [checkboxName.toLowerCase()]: e.target.checked
                        } :
                        roundDetail)
                :
                // Create new if not exists
                [...prevRound.roundDetails,
                {
                    playerId: id,
                    maal: 0,
                    seen: checkboxName.toLowerCase() === 'seen' && e.target.checked,
                    winner: checkboxName.toLowerCase() === 'winner' && e.target.checked,
                    dubli: checkboxName.toLowerCase() === 'dubli' && e.target.checked
                }]
        }));
    }

    const centerCalculation = (round: Round): Score => {
        const playerCount = round.roundDetails.length;
        const isDubliWinner = round.roundDetails.some(roundDetail => roundDetail.winner && roundDetail.dubli);

        let totalMaal = round.roundDetails.reduce((totalMaal, roundDetail) => totalMaal + Number(roundDetail.maal), 0);
        totalMaal = isDubliWinner ? totalMaal + 5 : totalMaal;

        const updatedScoreDetails: ScoreDetail[] = round.roundDetails.map(
            roundDetail => {
                const finalPoint = (totalMaal +
                    (roundDetail.seen ? (roundDetail.dubli ? 0 : 3) : 10) -
                    (roundDetail.maal * playerCount)) * -1;
                return {
                    playerId: roundDetail.playerId,
                    point: roundDetail.winner ? 0 : finalPoint
                }
            }
        );

        const nonWinnersPlayerIds = round.roundDetails
            .filter(player => !player.winner)
            .map(player => player.playerId);

        const totalPointsForNonWinners = updatedScoreDetails
            .filter(score => nonWinnersPlayerIds.includes(score.playerId))
            .reduce((total, score) => total + score.point, 0);

        const winnerPlayer = round.roundDetails.find(player => player.winner);
        if (winnerPlayer) {
            const winnerPlayerIndex = updatedScoreDetails.findIndex(score => score.playerId === winnerPlayer.playerId);
            if (winnerPlayerIndex !== -1) {
                updatedScoreDetails[winnerPlayerIndex].point = totalPointsForNonWinners * -1;
            }
        }

        const updatedScore: Score = {
            roundId: round.roundId,
            scoreDetails: updatedScoreDetails
        };
        return updatedScore;
    }

    const totalCalculation = (scores: Score[]): ScoreDetail[] => {
        const totalPoints: ScoreDetail[] = [];
        scores.forEach(score => {
            score.scoreDetails.forEach(score => {
                const playerIndex = totalPoints.findIndex(player => player.playerId === score.playerId);
                if (playerIndex !== -1) {
                    totalPoints[playerIndex].point += score.point;
                } else {
                    totalPoints.push({ playerId: score.playerId, point: score.point });
                }
            });
        });
        return totalPoints;
    }

    const handleCalculateClick = () => {
        const updatedScore: Score = centerCalculation(round);
        setScores([...scores, updatedScore]);

        //TODO: new round is render on ui but not available to use it on state variable yet. why???
        const updatedTotalPoints: ScoreDetail[] = totalCalculation([...scores, updatedScore]);
        setTotalPoints(updatedTotalPoints);

        // Reset Round
        const newRoundId = round.roundId + 1;
        const newRoundDetail: RoundDetail[] = round.roundDetails.map(round => {
            return { ...round, maal: 0, seen: false, winner: false, dubli: false }
        })
        setRound({ roundId: newRoundId, roundDetails: newRoundDetail });

    }

    const renderCheckbox = (checkboxName: string, playerId: number, value: boolean) => (
        <FormControlLabel
            control={
                <Checkbox
                    checked={value}
                    onChange={(e) => handleCheckboxInputChange(playerId, checkboxName, e)} />}
            label={checkboxName} />
    )

    return (<>
        <h2>Point Entry</h2>
        <div className="point-entry-main">
            {
                players.map(player => (
                    <div key={player.playerId}>

                        <div className="point-entry-player">
                            <h4>{player.name}</h4>
                            <TextField
                                label='Maal'
                                variant="outlined"
                                type="text"
                                placeholder={`Enter ${player.name}'s Maal`}
                                key={player.playerId}
                                value={round.roundDetails.find(score => score.playerId === player.playerId)?.maal ?? 0}
                                onChange={(e) => handlePointInputChange(player.playerId, e)}
                            />
                            <div className="point-entry-checkbox">
                                {renderCheckbox('Seen', player.playerId, round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.seen ?? false)}
                                {renderCheckbox('Winner', player.playerId, round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.winner ?? false)}
                                {renderCheckbox('Dubli', player.playerId, round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.dubli ?? false)}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCalculateClick}>Calculate</Button>
        </div>
    </>);
}
export default Calculator;