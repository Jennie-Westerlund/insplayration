import React from "react";
import styles from "./PercentageWheel.module.css";

const PercentageWheel = ({
  percentage = 0,
  title,
  className,
  loading,
  error,
}) => {
  const percentageWheel = className
    ? `${styles.PercentageWheel} ${className}`
    : styles.PercentageWheel;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const circleWidth = 150;
  const circleHeight = 150;
  const radius = 50;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <div className={styles.PercentageWheel}>
      <p>{title}</p>
      <div className={styles.circleContainer}>
        <svg
          width={`${circleWidth}px`}
          height={`${circleHeight}px`}
          viewBox={`0 0 ${circleWidth} ${circleHeight}`}
        >
          <circle
            cx={circleWidth / 2}
            cy={circleHeight / 2}
            strokeWidth="20px"
            r={radius}
            className={styles.circleBackground}
          />
          <circle
            cx={circleWidth / 2}
            cy={circleHeight / 2}
            strokeWidth="20px"
            r={radius}
            style={{
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
            }}
            transform={`rotate(-90 ${circleWidth / 2} ${circleHeight / 2})`}
            className={styles.circlePercentageBlue}
          />
        </svg>
        <p className={styles.percentageText}>{percentage}%</p>
      </div>
    </div>
  );
};

export default PercentageWheel;
