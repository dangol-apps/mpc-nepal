import { Dispatch, SetStateAction, useState } from "react";
import { Player, Round, RoundDetail, Score, ScoreDetail } from "../models";

const Calculator = ({ players, scores, setScores, totalPoints, setTotalPoints, initialRound }
    : {
        players: Player[],
        scores: Score[], setScores: Dispatch<SetStateAction<Score[]>>,
        totalPoints: ScoreDetail[], setTotalPoints: Dispatch<SetStateAction<ScoreDetail[]>>,
        initialRound: Round

    }) => {
    const [round, setRound] = useState<Round>(initialRound);

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
        let totalMaal = round.roundDetails.reduce((totalMaal, roundDetail) => totalMaal + roundDetail.maal, 0);
        totalMaal = isDubliWinner ? totalMaal + 5 : totalMaal;

        alert(totalMaal);
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
        <div key={checkboxName}>
            <input
                key={checkboxName}
                checked={value}
                onChange={(e) => handleCheckboxInputChange(playerId, checkboxName, e)} type="checkbox" />
            {checkboxName}
        </div>
    )

    return (<>
        <h2>Point Entry</h2>
        {
            players.map(player => (
                <div key={player.playerId}>
                    {player.name}
                    Maal
                    <input
                        key={player.playerId}
                        value={round.roundDetails.find(score => score.playerId === player.playerId)?.maal}
                        onChange={(e) => handlePointInputChange(player.playerId, e)}
                    />
                    {renderCheckbox('Seen', player.playerId, round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.seen ?? false)}
                    {renderCheckbox('Winner', player.playerId, round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.winner ?? false)}
                    {renderCheckbox('Dubli', player.playerId, round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.dubli ?? false)}
                </div>
            ))
        }
        {JSON.stringify(round)}
        <button onClick={handleCalculateClick}>Calculate</button>
    </>);
}
export default Calculator;