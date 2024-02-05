import { useEffect, useState } from "react";
import { Player, Round, Score, ScoreDetail } from "./models/models";
import { initialPlayers, initialRate, initialRound, initialScores, initialTotalScore } from "./models/seed";
import Header from "./components/Header";
import Setup from "./components/Setup";
import Calculator from "./components/Calculator";
import Result from "./components/Result";
import './styles/App.css'

const App = () => {
  const [changedPlayerId, setChangedPlayerId] = useState<number | null>(null);
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [round, setRound] = useState<Round>(initialRound);
  const [rate, setRate] = useState<number>(initialRate);
  const [totalScores, setTotalScores] = useState<ScoreDetail[]>(initialTotalScore);
  const [scores, setScores] = useState<Score[]>(initialScores);

  // Keep track of players to update the Round
  useEffect(() => {
    if (changedPlayerId !== null) {
      const updatedRound = {
        ...round,
        roundDetails: round.roundDetails.some(roundDetail => roundDetail.playerId === changedPlayerId) ?
          // Update existing 
          [...round.roundDetails.filter(roundDetail => players.some(player => player.playerId === roundDetail.playerId))]
          :
          // Create new if not exists
          [...round.roundDetails,
          { playerId: changedPlayerId, maal: 0, seen: false, winner: false, dubli: false }]
      };
      setRound(updatedRound);
      localStorage.setItem('round', JSON.stringify(updatedRound));

    }
  }, [players, changedPlayerId])

  const handleResetClick = () => {
    localStorage.removeItem('totalScores');
    localStorage.removeItem('scores');
    localStorage.removeItem('round');
    localStorage.removeItem('rate');
    localStorage.removeItem('players');
  }

  return (
    <>
      <Header title='MPC Nepal'></Header >
      <Setup {...{ players, setPlayers, rate, setRate, changedPlayerId, setChangedPlayerId, handleResetClick }}></Setup>
      <Calculator {...{ players, scores, setScores, totalScores, setTotalScores, round, setRound }}></Calculator>
      <Result {...{ players, rate, scores, totalScores }}></Result>
    </>
  )
};

export default App;
