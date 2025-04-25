// import express from "express";
// import axios from "axios";
// import cors from "cors";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(cors());
// app.use(express.json());

// const STEAM_API_KEY = process.env.STEAM_API_KEY;

// app.get("/api/most-played", async (req, res) => {
//   try {
//     const chartsResponse = await axios.get(
//       "https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1/"
//     );
    
//     if (!chartsResponse.data?.response?.ranks) {
//       throw new Error("Invalid response format from Steam Charts API");
//     }
    
//     const games = chartsResponse.data.response.ranks;
//     const nameCache = {};
    
//     const getGameName = async (appid) => {
//       if (nameCache[appid]) {
//         return nameCache[appid];
//       }
      
//       try {
//         const response = await axios.get(
//           `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=basic`
//         );
        
//         if (response.data && response.data[appid]?.success) {
//           nameCache[appid] = response.data[appid].data.name;
//           return nameCache[appid];
//         }
        
//         return `Game ${appid}`;
//       } catch (error) {
//         return `Game ${appid}`;
//       }
//     };
    
//     const enhancedGames = [];
//     const limit = Math.min(games.length, 50);
    
//     for (let i = 0; i < limit; i++) {
//       const game = games[i];
//       const name = await getGameName(game.appid);
//       enhancedGames.push({
//         ...game,
//         name
//       });
//     }
    
//     res.json(enhancedGames);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch most played games" });
//   }
// });

// app.get("/api/achievements/:appId", async (req, res) => {
//   try {
//     const { appId } = req.params;
//     const response = await axios.get(
//       "https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/",
//       {
//         params: {
//           gameid: appId,
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch achievement stats" });
//   }
// });

// app.get("/api/game-schema/:appId", async (req, res) => {
//   try {
//     const { appId } = req.params;
//     const response = await axios.get(
//       "https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/",
//       {
//         params: {
//           key: STEAM_API_KEY,
//           appid: appId,
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch game schema" });
//   }
// });

// app.get("/api/test", (req, res) => {
//   res.json({ message: "Server is working!" });
// });

// app.use(express.static(path.join(__dirname, 'dist')));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

const distPath = path.join(__dirname, 'dist');
console.log(`Looking for dist directory at: ${distPath}`);

app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});