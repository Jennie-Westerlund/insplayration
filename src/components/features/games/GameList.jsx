// src/components/games/GameList.jsx
import React from 'react';
import styles from './GameList.module.css';


function GameList({ games, loading, error, title = 'Games List' }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!games || games.length === 0) return <div>No games found.</div>;

  return (
    <>
      <h2>{title}</h2>
      <table className={styles.gameTable}>
        <thead>
          <tr className={styles.tableTitles}>
            <th>Rank</th>
            <th>Game</th>
            <th>Amount of players</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr key={game.appid} className={index % 2 === 0 ? styles.evenGame : styles.oddGame}>
              <td>{index + 1}</td>
              <td>{game.name}</td>
              <td>{game.peak_in_game || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GameList;