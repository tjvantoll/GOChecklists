import React from "react";
import styles from "./Progressbar.module.css";

export default function Progressbar({ value, max }) {
  const getWidth = () => {
    if (!max) {
      return "0";
    }

    return (value / max) * 100 + "%";
  };

  const getBackgroundColor = () => {
    const percent = Math.round((value / max) * 100);
    return percent <= 6
      ? "#FB041E"
      : percent > 6 && percent <= 12
      ? "#FD2222"
      : percent > 12 && percent <= 18
      ? "#FC4926"
      : percent > 18 && percent <= 24
      ? "#FC6628"
      : percent > 24 && percent <= 30
      ? "#FE882A"
      : percent > 30 && percent <= 36
      ? "#FFA52E"
      : percent > 36 && percent <= 42
      ? "#FEC230"
      : percent > 42 && percent <= 48
      ? "#FFDE34"
      : percent > 48 && percent <= 54
      ? "#F4DE2B"
      : percent > 54 && percent <= 60
      ? "#E7DD25"
      : percent > 60 && percent <= 66
      ? "#DBDD1C"
      : percent > 66 && percent <= 72
      ? "#CEDC18"
      : percent > 72 && percent <= 78
      ? "#C3DC0E"
      : percent > 78 && percent <= 84
      ? "#B6DC07"
      : percent > 84 && percent <= 90
      ? "#A9DC03"
      : "#9ADA00";
  };

  return (
    <div className={styles.progressbarContainer}>
      <div className={styles.progressbar}>
        <div
          className={styles.progressbarContents}
          style={{
            width: getWidth(),
            backgroundColor: getBackgroundColor(),
          }}
        ></div>
      </div>
      {!!max && <span>{`${value} / ${max}`}</span>}
    </div>
  );
}
