import { useState } from "react";
import { Player, Round, Score, ScoreDetail } from "./models";
import { seedData } from "./seed";
import Header from "./components/Header";
import Setup from "./components/Setup";
import Calculator from "./components/Calculator";
import Result from "./components/Result";

const App = () => {
  const { initialPlayers, initialRate, initialRounds, initialTotalPoints, initialRound, initialScores } = seedData();

  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [rate, setRate] = useState<number>(initialRate);
  const [rounds, setRounds] = useState<Round[]>(initialRounds);
  const [totalPoints, setTotalPoints] = useState<ScoreDetail[]>(initialTotalPoints);
  const [round, setRound] = useState<Round>(initialRound);
  const [scores, setScores] = useState<Score[]>(initialScores);

  return (
    <>
      <Header title='MPC Nepal'></Header >
      <Setup {...{ players, setPlayers, rate, setRate }}></Setup>
      <Calculator {...{ players, round, setRound, scores, setScores, totalPoints, setTotalPoints }}></Calculator>
      <Result {...{ players, rate, scores, totalPoints }}></Result>
    </>
  )
};

export default App;
