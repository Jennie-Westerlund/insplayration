import React, { createContext, useContext } from "react";
import { useMostPlayedGames } from "../hooks/useGames";

const GamesContext = createContext();

export function useGamesContext() {
  return useContext(GamesContext);
}

export function GamesProvider({ children }) {
  const gamesData = useMostPlayedGames();

  return (
    <GamesContext.Provider value={gamesData}>{children}</GamesContext.Provider>
  );
}
