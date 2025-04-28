import React from "react";
import styles from "./GameCard.module.css";
import PercentageWheel from "./percentageWheel/PercentageWheel";
import { useGameDetails } from "../../../hooks/useGameDetails";

const GameCard = ({ game, onClose }) => {
  const { gameSchema, achievements, loading, error } = useGameDetails(
    game?.appid
  );

  if (!game) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const logAchievementStructure = () => {
    if (achievements && achievements.length > 0) {
      console.log("Achievement structure:", achievements[0]);
    }
  };

  React.useEffect(() => {
    if (achievements && achievements.length > 0) {
      logAchievementStructure();
    }
  }, [achievements]);

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.card}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>{game.name}</h2>
        <p className={styles.players}>
          <strong>Current Players:</strong> {game.peak_in_game || "N/A"}
        </p>

        {loading ? (
          <div className={styles.loading}>Loading game stats...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.content}>
            <div className={styles.statsSection}>
              <h3>Game Statistics</h3>

              {achievements.length > 0 ? (
                <div className={styles.achievementsSection}>
                  <h3>Top Achievements</h3>
                  <div className={styles.achievementList}>
                    {achievements.slice(0, 5).map((achievement) => (
                      <div
                        key={achievement.name}
                        className={styles.achievementItem}
                      >
                        {achievement.icon && (
                          <div
                            className={styles.achievementIcon}
                            title={achievement.description}
                          >
                            <img
                              src={achievement.icon}
                              alt={achievement.displayName}
                              className={styles.achievementIconImg}
                            />
                            <span className={styles.achievementTooltip}>
                              {achievement.description}
                            </span>
                          </div>
                        )}
                        <div className={styles.achievementContent}>
                          <PercentageWheel
                            percentage={Math.round(achievement.percent)}
                            title={achievement.displayName}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>No achievement data available for this game.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
