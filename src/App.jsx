import { useState } from "react";
import "./App.css";
import React from "react";
import MostPlayedGames from "./components/containers/MostPlayedGames";
import Hero from "./components/containers/Hero";
import PercentageWheel from "./components/features/games/percentageWheel/PercentageWheel";

function App() {
  return (
    <main>
      <h1>Insplayration</h1>
      <p>Find your next gaming adventure from Steam's most popular titles</p>
      <Hero />
      <MostPlayedGames />
    </main>
  );
}

export default App;
