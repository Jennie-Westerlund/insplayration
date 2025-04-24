// src/components/containers/MostPlayedGames.jsx
import React from 'react';
import GameList from '../features/games/GameList';
import { useMostPlayedGames } from '../../hooks/useGames';

function MostPlayedGames() {
  const { games, loading, error } = useMostPlayedGames();
  
  return (
    <GameList 
      games={games} 
      loading={loading} 
      error={error} 
      title="Top Most Played Games on Steam this week" 
    />
  );
}

export default MostPlayedGames;