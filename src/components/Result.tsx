import { Player, Score, ScoreDetail } from "../models";

const Result = ({ players, rate, scores, totalPoints }
    : { players: Player[], rate: number, scores: Score[], totalPoints: ScoreDetail[] }) => {
    return (<>
        <h2>Score</h2>
        <table>
            <thead>
                <tr>
                    <th>Round</th>
                    {
                        players.map(player => <th key={player.playerId}>{player.name}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    scores.map(score =>
                        <tr key={score.roundId}>
                            <td key={score.roundId}>{score.roundId}</td>
                            {
                                score.scoreDetails.map(score => <td key={score.playerId}>{score.point}</td>)
                            }
                        </tr>
                    )
                }
                <tr>
                    <td>Total Point</td>
                    {
                        totalPoints.map(totalPoint => <td key={totalPoint.playerId}>{totalPoint.point}</td>)
                    }
                </tr>
                <tr>
                    <td>Total Amount</td>
                    {
                        totalPoints.map(totalPoint => <td key={totalPoint.playerId}>${totalPoint.point * rate}</td>)
                    }
                </tr>
            </tbody>
        </table >
        scores:{JSON.stringify(scores)}
        <br></br>
        totalPoints:{JSON.stringify(totalPoints)}
    </>);
}
export default Result;