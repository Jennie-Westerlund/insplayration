import React from "react";
import styles from "./GameList.module.css";

function GameList({
  games,
  loading,
  error,
  title = "Games List",
  tableHeaders = [],
  onGameSelect,
}) {
  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <h2>{title}</h2>
        <div className={styles.loadingMessage}>Loading games data...</div>
      </div>
    );

  if (error)
    return (
      <div className={styles.errorContainer}>
        <h2>{title}</h2>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );

  if (!games || games.length === 0)
    return (
      <div className={styles.emptyContainer}>
        <h2>{title}</h2>
        <div className={styles.emptyMessage}>No games found.</div>
      </div>
    );

  const handleKeyDown = (event, game) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleGameClick(game);
    }
  };

  const handleGameClick = (game) => {
    if (typeof onGameSelect === "function") {
      onGameSelect(game);
    } else {
      console.warn("onGameSelect is not a function or not provided");
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <table className={styles.gameTable}>
        <thead>
          <tr className={styles.tableTitles}>
            {tableHeaders &&
              tableHeaders.map((tableHeader, index) => (
                <th key={`header-${index}`}>{tableHeader}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr
              key={game.appid}
              className={`${index % 2 === 0 ? styles.evenGame : styles.oddGame} ${styles.gameRow}`}
              onClick={() => handleGameClick(game)}
              onKeyDown={(e) => handleKeyDown(e, game)}
              tabIndex={0}
              role="button"
            >
              <td>{index + 1}</td>
              <td>{game.name}</td>
              <td>{game.peak_in_game || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default GameList;
