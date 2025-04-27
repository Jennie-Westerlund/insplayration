import { useState } from 'react'
import './App.css'
import React from 'react';
import MostPlayedGames from './components/containers/MostPlayedGames';
import PercentageWheel from "./components/features/games/percentageWheel/PercentageWheel";

function App() {
  return (
    <main>
      <h1>Insplayration</h1>
      <p>Find your next gaming adventure from Steam's most popular titles</p>
      
      <MostPlayedGames />
      <PercentageWheel 
      percentage={50}
      title="Teeest"
      />
    </main>
  );
}

export default App;
