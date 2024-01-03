import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewGameLink from './components/NewGameLink';
import SettingsPage from './components/SettingsPage';
import PointEntryPage from './components/PointEntryPage';

import './App.css';
import ResultPage from './components/ResultPage';
import './components/NewGameLink.css';
import './models/Player'
import Player from './models/Player';

const App: React.FC = () => {
  const initialParam = {
    ratePerPoint: 0.25,
    players: [
      { id: 1, name: 'Player 1' },
      { id: 2, name: 'Player 2' },
      { id: 3, name: 'Player 3' },
      { id: 4, name: 'Player 4' },
    ]
  };

  const [params, setParams] = useState<{ ratePerPoint: number; players: Player[] }>(initialParam);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<NewGameLink />} />
          <Route path="/settings" element={<SettingsPage params={params} setParams={setParams} />} />
          <Route path="/game" element={<PointEntryPage params={params} setParams={setParams} />} />
          {/* <Route path="/result" element={<ResultPage params={params} setParams={setParams} />} /> */}
        </Routes>
      </Router>
      Debug:
      {JSON.stringify(params)}
    </div>

  );
};

export default App;
