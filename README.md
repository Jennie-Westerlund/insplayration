# Insplayration

<div align="center">
  <img src="public/logo-white.svg" alt="Insplayration Logo" width="400">
  <p>A platform showing data from the Steam API to help you discover what to play next.</p>
</div>

## 🎮 About

Insplayration helps gamers find their next favorite game by providing insights and inspiration based on Steam's most popular games. The application displays current trending games, player statistics, and achievement data to help you make informed decisions about what to play next.

### Features

- **Weekly Game Recommendations**: Discover curated game suggestions
- **Most Played Games**: View the top trending games on Steam with current player counts
- **Achievement Stats**: See which game achievements are common and which are rare
- **Game Details**: Get quick access to game descriptions and Steam store links

## 🚀 Tech Stack

- **Frontend**: React 19, CSS Modules
- **Backend**: Node.js, Express
- **Build Tool**: Vite
- **API**: Steam Web API

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js v18.19.0 or higher
- A Steam API key (for development and deployment)

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/Jennie-Westerlund/insplayration.git
cd insplayration
```

2. **Install dependencies**

```bash
npm install
```

3. **Create environment configuration**

Copy the example environment file and add your Steam API key:

```bash
cp .env.example .env
```

Edit the `.env` file and replace `your_steam_api_key` with your actual Steam API key.

4. **Start the development server**

```bash
npm run dev
```

5. **Start the backend server**

```bash
node server.js
```

The application will start on [http://localhost:5173](http://localhost:5173) with the backend API running on port 3001.

## 🌐 API Endpoints

The backend server provides the following endpoints:

- `GET /api/most-played` - Retrieves the most played games on Steam
- `GET /api/store-details/:appId` - Gets detailed information about a specific game
- `GET /api/achievements/:appId` - Retrieves achievement statistics for a specific game
- `GET /api/game-schema/:appId` - Gets the game schema including achievement details
- `GET /api/test` - Simple endpoint to verify the server is running

## 📁 Project Structure

```
insplayration/
├── public/               # Static files
│   └── logo-white.svg    # Logo
├── src/                  # Source files
│   ├── components/       # React components
│   │   ├── common/       # Reusable components
│   │   ├── containers/   # Container components
│   │   └── features/     # Feature-specific components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── server.js             # Express server
├── .env.example          # Example environment variables
└── package.json          # Dependencies and scripts
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API) for providing the game data
- [React](https://react.dev/) for the UI framework
- [Vite](https://vitejs.dev/) for the build system
- [Express](https://expressjs.com/) for the backend API

---

Made with ❤️ by [Jennie Westerlund](https://github.com/Jennie-Westerlund) and [Viktor Tohver Stridh](https://github.com/Viktor-TPD)
