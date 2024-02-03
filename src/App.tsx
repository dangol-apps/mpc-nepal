import { useState } from "react";
import { Player, Round, Score, ScoreDetail } from "./models";
import { seedData } from "./seed";
import Header from "./components/Header";
import Setup from "./components/Setup";
import Calculator from "./components/Calculator";
import Result from "./components/Result";

const App = () => {
  const { initialPlayers, initialRate, initialTotalPoints, initialRound, initialScores } = seedData();

  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [rate, setRate] = useState<number>(initialRate);
  const [totalPoints, setTotalPoints] = useState<ScoreDetail[]>(initialTotalPoints);
  const [scores, setScores] = useState<Score[]>(initialScores);
  const [changedPlayerId, setChangedPlayerId] = useState<number | null>(null);

  return (
    <>
      <Header title='MPC Nepal'></Header >
      <Setup {...{ players, setPlayers, rate, setRate, changedPlayerId, setChangedPlayerId }}></Setup>
      <Calculator {...{ players, scores, setScores, totalPoints, setTotalPoints, initialRound, changedPlayerId, setChangedPlayerId }}></Calculator>
      <Result {...{ players, rate, scores, totalPoints }}></Result>
    </>
  )
};

export default App;
