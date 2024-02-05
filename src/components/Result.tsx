import { Player, Score, ScoreDetail } from "../models/models";

const Result = ({ players, rate, scores, totalScores }
    : { players: Player[], rate: number, scores: Score[], totalScores: ScoreDetail[] }) => {
    return (<>
        <h2>Score</h2>
        <table>
            <thead>
                <tr>
                    <th>Round</th>
                    {players.map(player => <th key={player.playerId}>{player.name}</th>)}
                </tr>
            </thead>
            <tbody>
                {scores.map(score =>
                    <tr key={score.roundId}>
                        <td key={score.roundId}>{score.roundId}</td>
                        {
                            score.scoreDetails.map(score => <td key={score.playerId}>{score.point}</td>)
                        }
                    </tr>)}
                <tr>
                    <td className="total-point-row">Total Point</td>
                    {totalScores.map(totalPoint => <td className="total-point-row" key={totalPoint.playerId}>{totalPoint.point}</td>)}
                </tr>
                <tr>
                    <td className="total-amount-row">Total Amount</td>
                    {totalScores.map(totalPoint => <td className="total-amount-row" key={totalPoint.playerId}>${totalPoint.point * rate}</td>)}
                </tr>
            </tbody>
        </table >
        {/* <div className="debug-json">{'scores: ' + JSON.stringify(scores)}</div>
        <div className="debug-json">{'totalScores: ' + JSON.stringify(totalScores)}</div> */}
    </>);
}
export default Result;