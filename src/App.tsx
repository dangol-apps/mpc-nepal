import { useState } from "react";

const App = () => {
  const initialPlayers = [
    { id: 1, name: 'Adam' },
    { id: 2, name: 'Ben' },
    { id: 3, name: 'Cathey' },
    { id: 4, name: 'Dan' }
  ]
  const initialRate = 0.25;
  const initialRounds = [{
    id: 1,
    scores: [
      { playerId: 1, point: 10 },
      { playerId: 2, point: 5 },
      { playerId: 3, point: 0 },
      { playerId: 4, point: 0 },
    ]
  }, {
    id: 2,
    scores: [
      { playerId: 1, point: 0 },
      { playerId: 2, point: 15 },
      { playerId: 3, point: -5 },
      { playerId: 4, point: 8 },
    ]
  }, {
    id: 3,
    scores: [
      { playerId: 1, point: 8 },
      { playerId: 2, point: -5 },
      { playerId: 3, point: -2 },
      { playerId: 4, point: 4 },
    ]
  }];

  const initialTotalPoints = [
    { playerId: 1, totalPoint: 10 },
    { playerId: 2, totalPoint: 20 },
    { playerId: 3, totalPoint: 30 },
    { playerId: 3, totalPoint: 40 },
  ]

  const [players, setPlayers] = useState(initialPlayers);
  const [rate, setRate] = useState(initialRate);
  const [rounds, setRounds] = useState(initialRounds);
  const [totalPoints, setTotalPoints] = useState(initialTotalPoints);

  return (
    <>
      <h1>MPC Nepal</h1>
      <h2>Setup</h2>

      <div>Player 1<input></input></div>
      <div>Player 2<input></input></div>
      <div>Player 3<input></input></div>
      <div>Player 4<input></input></div>
      <div>Player 5<input></input></div>
      <div>Player 6<input></input></div>

      <p>Rate</p>
      <input></input>

      <h2>Point Entry</h2>
      {
        players.map(player => (
          <div>
            {player.name} Points<input></input>
            Seen<input type="checkbox"></input>
            Winner<input type="checkbox"></input>
          </div>
        ))
      }

      <button>Calculate</button>

      <h2>Score</h2>
      <table>
        <thead>
          <th>Round</th>
          {
            players.map(player => <th>{player.name}</th>)
          }
        </thead>
        <tbody>
          {
            rounds.map(round =>
              <tr>
                <td>{round.id}</td>
                {
                  round.scores.map(score => <td>{score.point}</td>)
                }
              </tr>
            )
          }
          <tr>
            <td>Total Point</td>
            {
              totalPoints.map(totalPoint => <td>{totalPoint.totalPoint}</td>)
            }
          </tr>
          <tr>
            <td>Total Amount</td>
            {
              totalPoints.map(totalPoint => <td>${totalPoint.totalPoint * rate}</td>)
            }
          </tr>
        </tbody>
      </table >
    </>

  );
};

export default App;
