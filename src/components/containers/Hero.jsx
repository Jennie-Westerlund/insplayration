import React from "react";
import styles from "./Hero.module.css";
import PercentageWheel from "../features/games/percentageWheel/PercentageWheel";
import { useGameDetails } from "../../hooks/useGameDetails";
import HeroSkeleton from "./HeroSkeleton";
import Button, { buttonStyles } from "../common/Button";

const Hero = () => {
  // Use hardcoded game ID: 1519880
  const { gameSchema, achievements, storeDetails, loading, error } =
    useGameDetails(1519880);

  if (loading) return <HeroSkeleton />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!storeDetails)
    return (
      <div className={styles.error}>
        Featured game information not available
      </div>
    );

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
    return `https://store.steampowered.com/app/1519880`;
  };

  const backgroundStyle = {};
  const bgImage = storeDetails?.background_raw || storeDetails?.background;

  if (bgImage) {
    backgroundStyle.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${bgImage})`;
  }

  const headerImage = getHeaderImage();
  const gameDescription = storeDetails?.short_description;

  return (
    <section>
      <h2 className={styles.recommendationTitle}>This week's recommendation</h2>
      <div className={styles.hero} style={backgroundStyle}>
        {headerImage && (
          <div className={styles.thumbnailHeader}>
            <img
              src={headerImage}
              alt={`${storeDetails.name} image`}
              className={styles.thumbnailImage}
            />
          </div>
        )}

        <div className={styles.heroContent}>
          <h2 className={styles.title}>{storeDetails.name}</h2>

          {gameDescription && (
            <div className={styles.description}>
              <p>{gameDescription}</p>
            </div>
          )}

          <Button
            className={buttonStyles.buttonGreen}
            style={{ alignSelf: "center" }}
          >
            <a
              href={getSteamStoreUrl()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              View on Steam Store
            </a>
          </Button>

          {/* {achievements.length > 0 && (
          <div className={styles.achievementsSection}>
            <h3>Top Achievements</h3>
            <div className={styles.achievementList}>
              {achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.name} className={styles.achievementItem}>
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
        )} */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
