
import React, { createContext, useContext } from 'react';
import { useMostPlayedGames } from '../hooks/useGames';

// Create a context for games data
const GamesContext = createContext();

// Custom hook to use the games context
export function useGamesContext() {
  return useContext(GamesContext);
}

// Provider component that will wrap the app
export function GamesProvider({ children }) {
  // Use the existing hook to fetch data
  const gamesData = useMostPlayedGames();
  
  return (
    <GamesContext.Provider value={gamesData}>
      {children}
    </GamesContext.Provider>
  );
}