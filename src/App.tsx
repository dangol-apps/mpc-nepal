import { useState } from "react";

interface player {
  playerId: number,
  name: string
}

interface round {
  roundId: number,
  roundDetails: roundDetail[]
}

interface roundDetail {
  playerId: number,
  maal: number,
  seen: boolean,
  winner: boolean,
  dubli: boolean
}

interface score {
  roundId: number,
  scoreDetails: scoreDetail[]
}

interface scoreDetail {
  playerId: number,
  point: number
}

const App = () => {
  const initialPlayers: player[] = [
    { playerId: 1, name: 'Adam' },
    { playerId: 2, name: 'Ben' },
    { playerId: 3, name: 'Cathey' },
    { playerId: 4, name: 'Dan' }
  ]
  const initialRate = 0.25;
  const initialRounds: round[] = [{
    roundId: 1,
    roundDetails: [
      { playerId: 1, maal: 10, seen: true, winner: true, dubli: false },
      { playerId: 2, maal: 5, seen: true, winner: false, dubli: false },
      { playerId: 3, maal: 0, seen: false, winner: false, dubli: false },
      { playerId: 4, maal: 0, seen: false, winner: false, dubli: false },
    ]
  }, {
    roundId: 2,
    roundDetails: [
      { playerId: 1, maal: 0, seen: false, winner: false, dubli: false },
      { playerId: 2, maal: 15, seen: true, winner: true, dubli: false },
      { playerId: 3, maal: 5, seen: false, winner: false, dubli: false },
      { playerId: 4, maal: 8, seen: true, winner: false, dubli: false },
    ]
  }, {
    roundId: 3,
    roundDetails: [
      { playerId: 1, maal: 8, seen: true, winner: false, dubli: false },
      { playerId: 2, maal: 5, seen: true, winner: false, dubli: false },
      { playerId: 3, maal: 2, seen: true, winner: true, dubli: false },
      { playerId: 4, maal: 4, seen: true, winner: false, dubli: false },
    ]
  }];

  const initialRound: round = {
    roundId: 4,
    roundDetails: [
      { playerId: 1, maal: 2, seen: true, winner: false, dubli: false },
      { playerId: 2, maal: 3, seen: true, winner: false, dubli: false },
      { playerId: 3, maal: 4, seen: true, winner: true, dubli: true },
      { playerId: 4, maal: 0, seen: false, winner: false, dubli: false },
    ]
  }

  const initialScores: score[] = [{
    roundId: 1,
    scoreDetails: [
      { playerId: 1, point: 11 },
      { playerId: 2, point: 21 },
      { playerId: 3, point: 31 },
      { playerId: 4, point: 41 },
    ]
  },
  {
    roundId: 2,
    scoreDetails: [
      { playerId: 1, point: 11 },
      { playerId: 2, point: 21 },
      { playerId: 3, point: 31 },
      { playerId: 4, point: 41 },
    ]
  },
  {
    roundId: 3,
    scoreDetails: [
      { playerId: 1, point: 12 },
      { playerId: 2, point: 22 },
      { playerId: 3, point: 32 },
      { playerId: 4, point: 42 },
    ]
  },]

  const initialTotalPoints: scoreDetail[] = [
    { playerId: 1, point: 10 },
    { playerId: 2, point: 20 },
    { playerId: 3, point: 30 },
    { playerId: 4, point: 40 },
  ]

  const [players, setPlayers] = useState(initialPlayers);
  const [rate, setRate] = useState(initialRate);
  const [rounds, setRounds] = useState(initialRounds);
  const [totalPoints, setTotalPoints] = useState(initialTotalPoints);
  const [round, setRound] = useState(initialRound);
  const [scores, setScores] = useState(initialScores);

  const handleNameInputChange = (id: number, e: any) => {
    const currentPlayer = players.find(player => player.playerId === id);
    if (currentPlayer) {
      const updatedPlayer: player = { ...currentPlayer, name: e.target.value };
      setPlayers(prevPlayers =>
        prevPlayers.map(player =>
          player.playerId === updatedPlayer.playerId ? updatedPlayer : player));
    }
  }

  const handleRateInputChange = (e: any) => {
    setRate(e.target.value);
  }

  const centerCalculation = (round: round): score => {
    const playerCount = round.roundDetails.length;
    const totalMaal = round.roundDetails.reduce((totalMaal, roundDetail) => totalMaal + roundDetail.maal, 0);

    const updatedScoreDetails: scoreDetail[] = round.roundDetails.map(
      roundDetail => {
        const finalPoint = (totalMaal + (roundDetail.seen ? 3 : 10) - (roundDetail.maal * playerCount)) * -1;
        return { playerId: roundDetail.playerId, point: roundDetail.winner ? 0 : finalPoint }
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

    const updatedScore: score = {
      roundId: round.roundId,
      scoreDetails: updatedScoreDetails
    };
    return updatedScore;
  }

  const totalCalculation = (scores: score[]): scoreDetail[] => {
    const totalPoints: scoreDetail[] = [];
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

    const updatedScore: score = centerCalculation(round);
    setScores([...scores, updatedScore]);

    //TODO: new round is render on ui but not available to use it on state variable yet. why???
    const updatedTotalPoints: scoreDetail[] = totalCalculation([...scores, updatedScore]);
    setTotalPoints(updatedTotalPoints);

    // Reset Round
    const newRoundId = round.roundId + 1;
    const newRoundDetail: roundDetail[] = round.roundDetails.map(round => {
      return { ...round, maal: 0, seen: false, winner: false, dubli: false }
    })
    setRound({ roundId: newRoundId, roundDetails: newRoundDetail });

  }

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

  return (
    <>
      <h1>MPC Nepal</h1>
      <h2>Setup</h2>
      {renderPlayerInput(1)}
      {renderPlayerInput(2)}
      {renderPlayerInput(3)}
      {renderPlayerInput(4)}
      {JSON.stringify(players)}

      <p>Rate</p>
      <input value={rate} onChange={handleRateInputChange}></input>
      {JSON.stringify(rate)}

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
    </>
  );
};

export default App;
