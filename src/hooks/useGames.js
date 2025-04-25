// src/hooks/useGames.js
import { useState, useEffect } from 'react';

export function useMostPlayedGames() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/most-played');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGames(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Failed to load games. Please try again later.');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
}