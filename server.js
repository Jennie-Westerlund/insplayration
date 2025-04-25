import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const STEAM_API_KEY = process.env.STEAM_API_KEY;

// Route to get most played games with names
app.get("/api/most-played", async (req, res) => {
  try {
    // Get the most played games
    const chartsResponse = await axios.get(
      "https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/"
    );
    
    if (!chartsResponse.data?.response?.ranks) {
      throw new Error("Invalid response format from Steam Charts API");
    }
    
    const games = chartsResponse.data.response.ranks;
    
    // Create a more efficient cache for storing game names
    const nameCache = {};
    
    // Function to get game name - uses a simpler API
    const getGameName = async (appid) => {
      if (nameCache[appid]) {
        return nameCache[appid];
      }
      
      try {
        // Using Steam store API which doesn't require API key
        const response = await axios.get(
          `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=basic`
        );
        
        if (response.data && response.data[appid]?.success) {
          nameCache[appid] = response.data[appid].data.name;
          return nameCache[appid];
        }
        
        return `Game ${appid}`;
      } catch (error) {
        console.error(`Error fetching name for game ${appid}:`, error);
        return `Game ${appid}`;
      }
    };
    
    // Get names for top 50 games (or less if fewer are returned)
    const enhancedGames = [];
    const limit = Math.min(games.length, 50);
    
    for (let i = 0; i < limit; i++) {
      const game = games[i];
      const name = await getGameName(game.appid);
      enhancedGames.push({
        ...game,
        name
      });
    }
    
    res.json(enhancedGames);
  } catch (error) {
    console.error("Error fetching most played games:", error);
    res.status(500).json({ error: "Failed to fetch most played games" });
  }
});

// Route to get global achievement percentages for a game
app.get("/api/achievements/:appId", async (req, res) => {
  try {
    const { appId } = req.params;
    const response = await axios.get(
      "https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/",
      {
        params: {
          gameid: appId,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching achievement stats:", error);
    res.status(500).json({ error: "Failed to fetch achievement stats" });
  }
});

// Route to get game schema (achievement details)
app.get("/api/game-schema/:appId", async (req, res) => {
  try {
    const { appId } = req.params;
    const response = await axios.get(
      "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/",
      {
        params: {
          key: STEAM_API_KEY,
          appid: appId,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching game schema:", error);
    res.status(500).json({ error: "Failed to fetch game schema" });
  }
});

// Route for testing
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});