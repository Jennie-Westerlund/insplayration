import React from "react";
import styles from "./GameCard.module.css";
import PercentageWheel from "./percentageWheel/PercentageWheel";
import { useGameDetails } from "../../../hooks/useGameDetails";
import Button, { buttonStyles } from "../../common/Button";

const GameCard = ({ game, onClose }) => {
  const { gameSchema, achievements, storeDetails, loading, error } =
    useGameDetails(game?.appid);

  if (!game) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getHeaderImage = () => {
    if (!storeDetails) return null;

    if (storeDetails.screenshots && storeDetails.screenshots.length > 0) {
      return storeDetails.screenshots[0].path_full;
    }

    if (storeDetails.header_image) {
      return storeDetails.header_image;
    }

    if (storeDetails.movies && storeDetails.movies.length > 0) {
      return storeDetails.movies[0].thumbnail;
    }

    return null;
  };

  const getSteamStoreUrl = () => {
    return `https://store.steampowered.com/app/${game.appid}`;
  };

  const backgroundStyle = {};
  const bgImage = storeDetails?.background_raw || storeDetails?.background;

  if (bgImage) {
    backgroundStyle.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${bgImage})`;
  }

  const headerImage = getHeaderImage();

  const gameDescription = storeDetails?.short_description;

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.card} style={backgroundStyle}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        {headerImage && (
          <div className={styles.thumbnailHeader}>
            <img
              src={headerImage}
              alt={`${game.name} thumbnail`}
              className={styles.thumbnailImage}
            />
          </div>
        )}

        <h2 className={styles.title}>{game.name}</h2>
        <p className={styles.players}>
          <strong>Current Players:</strong> {game.peak_in_game || "N/A"}
        </p>

        {gameDescription && (
          <div className={styles.description}>
            <p>{gameDescription}</p>
          </div>
        )}

        <Button className={buttonStyles.buttonBlue1} style={{justifySelf:"center", margin:"1rem 0"}}>
          <a
            href={getSteamStoreUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.steamButton}
          >
            View on Steam Store
          </a>
        </Button>

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
                    {achievements.slice(0, 3).map((achievement) => (
                      <div
                        key={achievement.name}
                        className={styles.achievementItem}
                      >
                        {achievement.icon && (
                          <div
                            className={styles.achievementIcon}
                            title={achievement.description}
                            tabIndex={0}
                            role="button"
                            aria-label={`${achievement.displayName} achievement: ${achievement.description || "No description available"}`}
                          >
                            <img
                              src={achievement.icon}
                              alt={achievement.displayName}
                              className={styles.achievementIconImg}
                            />
                            <span className={styles.achievementTooltip}>
                              {achievement.description !== "" &&
                              achievement.description != null
                                ? achievement.description
                                : "No description available"}
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

              {achievements.length > 0 ? (
                <div className={styles.achievementsSection}>
                  <h3>Rare Achievements</h3>
                  <div className={styles.achievementList}>
                    {achievements
                      .slice(achievements.length - 3)
                      .map((achievement) => (
                        <div
                          key={achievement.name}
                          className={styles.achievementItem}
                        >
                          {achievement.icon && (
                            <div
                              className={styles.achievementIcon}
                              title={achievement.description}
                              tabIndex={0}
                              role="button"
                              aria-label={`${achievement.displayName} achievement: ${achievement.description || "No description available"}`}
                            >
                              <img
                                src={achievement.icon}
                                alt={achievement.displayName}
                                className={styles.achievementIconImg}
                              />
                              <span className={styles.achievementTooltip}>
                                {achievement.description !== "" &&
                                achievement.description != null
                                  ? achievement.description
                                  : "No description available"}
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
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCard;
