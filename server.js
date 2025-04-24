import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const STEAM_API_KEY = process.env.STEAM_API_KEY;

// Route to get most played games
app.get("/api/most-played", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/"
    );
    
    if (response.data && response.data.response && response.data.response.ranks) {
      
      const games = response.data.response.ranks;
      res.json(games);
    } else {
      throw new Error("Invalid response format from Steam API");
    }
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});