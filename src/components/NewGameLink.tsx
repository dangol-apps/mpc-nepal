import React from 'react';
import { Link } from 'react-router-dom';

const NewGameLink: React.FC = () => {
    return (
        <div className="new-game-link-container">
            <h1>Welcome to MPC Nepal Calculator</h1>
            <Link to="/settings">Start New Game</Link>
        </div>
    );
};

export default NewGameLink;
