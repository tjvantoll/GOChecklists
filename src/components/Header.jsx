import React from "react";
import styles from "./Header.module.css";

export default function Header({ title, settingsClick }) {
  const navigateHome = () => {
    window.location.href = "/";
  };

  return (
    <header className={styles.headerContainer}>
      {settingsClick && (
        <button className={styles.home} onClick={navigateHome}>
          Home
        </button>
      )}

      <span className={styles.title}>{title}</span>

      {settingsClick && (
        <button
          className={styles.settings}
          onClick={settingsClick}
          aria-label="Settings"
        ></button>
      )}
    </header>
  );
}
