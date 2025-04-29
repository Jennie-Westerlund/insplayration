import React from "react";
import styles from "./Hero.module.css";
import skeletonStyles from "./HeroSkeleton.module.css";

const HeroSkeleton = () => {
  return (
    <div className={`${styles.hero} ${skeletonStyles.skeleton}`}>
      <div className={skeletonStyles.thumbnailHeader}>
        <div className={skeletonStyles.thumbnailImageSkeleton}></div>
      </div>

      <div
        className={`${styles.heroContent} ${skeletonStyles.heroContentSkeleton}`}
      >
        <div className={skeletonStyles.titleSkeleton}>
          <div className={skeletonStyles.titleLine}></div>
          <div className={skeletonStyles.titleLine}></div>
        </div>

        <div
          className={`${styles.description} ${skeletonStyles.descriptionSkeleton}`}
        >
          <div className={skeletonStyles.descriptionLine}></div>
          <div className={skeletonStyles.descriptionLine}></div>
          <div className={skeletonStyles.descriptionLine}></div>
        </div>

        <div
          className={`${styles.storeLink} ${skeletonStyles.storeLinkSkeleton}`}
        >
          <div className={skeletonStyles.storeButtonSkeleton}></div>
        </div>

        {/* @todo: Commented out achievement skeleton section for eventual future use
        <div className={skeletonStyles.achievementsSectionSkeleton}>
          <div className={skeletonStyles.achievementsTitleSkeleton}></div>
          <div className={skeletonStyles.achievementsListSkeleton}>
            <div className={skeletonStyles.achievementItemSkeleton}>
              <div className={skeletonStyles.achievementIconSkeleton}></div>
              <div className={skeletonStyles.achievementWheelSkeleton}>
                <div className={skeletonStyles.wheelCircleSkeleton}></div>
                <div className={skeletonStyles.wheelTextSkeleton}></div>
              </div>
            </div>
            <div className={skeletonStyles.achievementItemSkeleton}>
              <div className={skeletonStyles.achievementIconSkeleton}></div>
              <div className={skeletonStyles.achievementWheelSkeleton}>
                <div className={skeletonStyles.wheelCircleSkeleton}></div>
                <div className={skeletonStyles.wheelTextSkeleton}></div>
              </div>
            </div>
            <div className={skeletonStyles.achievementItemSkeleton}>
              <div className={skeletonStyles.achievementIconSkeleton}></div>
              <div className={skeletonStyles.achievementWheelSkeleton}>
                <div className={skeletonStyles.wheelCircleSkeleton}></div>
                <div className={skeletonStyles.wheelTextSkeleton}></div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default HeroSkeleton;
