import { useState } from "react";
import "./App.css";
import React from "react";
import MostPlayedGames from "./components/containers/MostPlayedGames";
import Hero from "./components/containers/Hero";
import Button, { buttonStyles } from "./components/common/Button"


function App() {
  return (
    <main>
      <img
      src="../public/logo-white.svg"
      alt="Insplayration logotyp"
      className="logo"
      />
      <p>Find your next gaming adventure from Steam's most popular titles</p>
      <Hero />
      <Button className={buttonStyles.buttonBlue}>
      Most Played Games on Steam this week
      </Button>
      <MostPlayedGames />
    </main>
  );
}

export default App;
