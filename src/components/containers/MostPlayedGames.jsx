import React, { useState } from 'react';
import GameList from '../features/games/GameList';
import GameCard from '../features/games/GameCard';
import { useMostPlayedGames } from '../../hooks/useGames';

function MostPlayedGames() {
  const { games, loading, error } = useMostPlayedGames();
  const [selectedGame, setSelectedGame] = useState(null);
  
  console.log("MostPlayedGames rendering with:", { 
    gamesCount: games?.length || 0,
    loading,
    error,
    hasSelectedGame: !!selectedGame
  });
  
  const handleGameSelect = (game) => {
    console.log("Game selected:", game);
    setSelectedGame(game);
  };
  
  const handleCloseCard = () => {
    setSelectedGame(null);
  };
  
  return (
    <>
      <GameList 
        games={games} 
        loading={loading} 
        error={error} 
        title="Top Most Played Games on Steam this week"
        tableHeaders={["Rank", "Game", "Amount of players"]}
        onGameSelect={handleGameSelect}
      />
      
      {selectedGame && (
        <GameCard 
          game={selectedGame} 
          onClose={handleCloseCard}
        />
      )}
    </>
  );
}

export default MostPlayedGames;