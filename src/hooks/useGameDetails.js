import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.DEV ? "http://localhost:3001" : "";

export function useGameDetails(gameId) {
  const [gameSchema, setGameSchema] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [storeDetails, setStoreDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!gameId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch game schema (for achievements)
        const schemaResponse = await fetch(
          `${API_BASE_URL}/api/game-schema/${gameId}`
        );
        if (!schemaResponse.ok) {
          throw new Error(
            `Failed to fetch game schema: ${schemaResponse.status}`
          );
        }
        const schemaData = await schemaResponse.json();
        setGameSchema(schemaData);

        // Fetch store details from our server endpoint
        try {
          console.log(
            `Fetching store details for game ${gameId} from ${API_BASE_URL}/api/store-details/${gameId}`
          );
          const storeResponse = await fetch(
            `${API_BASE_URL}/api/store-details/${gameId}`
          );

          if (storeResponse.ok) {
            const storeData = await storeResponse.json();
            console.log("Successfully fetched store details:", storeData);
            setStoreDetails(storeData);
          } else {
            console.warn(
              `Failed to fetch store details: ${storeResponse.status}`
            );
            const errorText = await storeResponse.text();
            console.warn("Error response:", errorText);
          }
        } catch (storeError) {
          console.error("Error fetching store details:", storeError);
        }

        // Process achievements
        const achievementDetails = {};
        if (
          schemaData &&
          schemaData.game &&
          schemaData.game.availableGameStats &&
          schemaData.game.availableGameStats.achievements
        ) {
          schemaData.game.availableGameStats.achievements.forEach(
            (achievement) => {
              achievementDetails[achievement.name] = {
                displayName: achievement.displayName,
                description: achievement.description,
                icon: achievement.icon,
                icongray: achievement.icongray,
              };
            }
          );
        }

        try {
          const achievementsResponse = await fetch(
            `${API_BASE_URL}/api/achievements/${gameId}`
          );
          if (achievementsResponse.ok) {
            const achievementsData = await achievementsResponse.json();

            if (
              achievementsData &&
              achievementsData.achievementpercentages &&
              achievementsData.achievementpercentages.achievements
            ) {
              const enhancedAchievements =
                achievementsData.achievementpercentages.achievements
                  .map((achievement) => ({
                    ...achievement,
                    displayName:
                      achievementDetails[achievement.name]?.displayName ||
                      achievement.name,
                    description:
                      achievementDetails[achievement.name]?.description || "",
                    icon: achievementDetails[achievement.name]?.icon || null,
                    icongray:
                      achievementDetails[achievement.name]?.icongray || null,
                  }))
                  .sort((a, b) => b.percent - a.percent);

              setAchievements(enhancedAchievements);
            }
          }
        } catch (achievementError) {
          console.warn(
            "Failed to fetch achievements, continuing with other data:",
            achievementError
          );
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching game details:", err);
        setError(`Failed to load game details: ${err.message}`);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  return { gameSchema, achievements, storeDetails, loading, error };
}
