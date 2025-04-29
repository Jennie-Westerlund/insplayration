import { useState } from "react";
import "./App.css";
import React from "react";
import MostPlayedGames from "./components/containers/MostPlayedGames";
import Hero from "./components/containers/Hero";
import Button, { buttonStyles } from "./components/common/Button";

function App() {
  const [showGames, setShowGames] = useState(false);

  const toggleGames = () => {
    setShowGames(!showGames);
  };

  return (
    <main>
      <img src="/logo-white.svg" alt="Insplayration logotyp" className="logo" />
      <Hero />
      <Button className={buttonStyles.buttonBlue} onClick={toggleGames}>
        {showGames ? "Hide" : "Show"} Most Played Games on Steam
      </Button>

      {showGames && <MostPlayedGames />}
    </main>
  );
}

export default App;
