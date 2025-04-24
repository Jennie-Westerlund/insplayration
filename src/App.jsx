import { useState } from 'react'
import './App.css'
import React from 'react';
import MostPlayedGames from './components/containers/MostPlayedGames';

function App() {
  return (
    <main>
      <h1>Insplayration</h1>
      <p>Find your next gaming adventure from Steam's most popular titles</p>
      
      <MostPlayedGames />
    </main>
  );
}

export default App;
