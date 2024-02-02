import { Dispatch, SetStateAction } from "react";
import { Player, Round, RoundDetail, Score, ScoreDetail } from "../models";

const Calculator = ({ players, round, setRound, scores, setScores, totalPoints, setTotalPoints }
    : {
        players: Player[],
        round: Round, setRound: Dispatch<SetStateAction<Round>>,
        scores: Score[], setScores: Dispatch<SetStateAction<Score[]>>
        totalPoints: ScoreDetail[], setTotalPoints: Dispatch<SetStateAction<ScoreDetail[]>>
    }) => {
    const handlePointInputChange = (id: number, e: any) => {
        const updatedRound = {
            roundId: round.roundId,
            roundDetails: round.roundDetails.map(roundDetail =>
                roundDetail.playerId === id ?
                    { ...roundDetail, maal: Number(e.target.value) } : roundDetail)
        };
        setRound(updatedRound);
    }
    //TODO: combine Inputchanges into single function
    const handleSeenInputChange = (id: number, e: any) => {
        const updatedRound = {
            roundId: round.roundId,
            roundDetails: round.roundDetails.map(roundDetail =>
                roundDetail.playerId === id ?
                    { ...roundDetail, seen: e.target.checked } : roundDetail)
        };
        setRound(updatedRound);
    }

    const handleWinnerInputChange = (id: number, e: any) => {
        const updatedRound = {
            roundId: round.roundId,
            roundDetails: round.roundDetails.map(roundDetail =>
                roundDetail.playerId === id ?
                    { ...roundDetail, winner: e.target.checked } : roundDetail)
        };
        setRound(updatedRound);
    }

    const handleDubliInputChange = (id: number, e: any) => {
        const updatedRound = {
            roundId: round.roundId,
            roundDetails: round.roundDetails.map(roundDetail =>
                roundDetail.playerId === id ?
                    { ...roundDetail, dubli: e.target.checked } : roundDetail)
        };
        setRound(updatedRound);
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

    return (<>
        <h2>Point Entry</h2>
        {
            players.map(player => (
                <div key={player.playerId}>
                    {player.name}
                    Points
                    <input
                        key={player.playerId}
                        value={round.roundDetails.find(score => score.playerId === player.playerId)?.maal}
                        onChange={(e) => handlePointInputChange(player.playerId, e)}
                    />

                    <input
                        checked={round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.seen}
                        onChange={(e) => handleSeenInputChange(player.playerId, e)} type="checkbox" />
                    Seen

                    <input
                        checked={round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.winner}
                        onChange={(e) => handleWinnerInputChange(player.playerId, e)} type="checkbox" />
                    Winner
                    <input
                        checked={round.roundDetails.find(roundDetail => roundDetail.playerId === player.playerId)?.dubli}
                        onChange={(e) => handleDubliInputChange(player.playerId, e)} type="checkbox" />
                    Dubli
                </div>
            ))
        }
        {JSON.stringify(round)}
        <button onClick={handleCalculateClick}>Calculate</button>
    </>);
}
export default Calculator;