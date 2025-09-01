import React from "react";
import Header from "./Header.jsx";
import styles from "./Home.module.css";

function Home() {

  const navigationItems = [
    {
      path: "/dex",
      title: "Dex",
      description: "Track your main Pokédex completion in Pokémon GO",
      icon: "📚",
    },
    {
      path: "/shiny",
      title: "ShinyDex",
      description: "Track which of the available shinies you've caught",
      icon: "✨",
    },
    {
      path: "/lucky",
      title: "LuckyDex",
      description: "Track how many lucky Pokémon you've acquired",
      icon: "🍀",
    },
    {
      path: "/unown",
      title: "UnownDex",
      description: "Track how many Unown you own",
      icon: "🔤",
    },
    {
      path: "/shadow",
      title: "ShadowDex",
      description: "Track how many shadow Pokémon you have",
      icon: "😈",
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <Header title="GO Checklists" />

      <div className={styles.content}>
        <div className={styles.navigationGrid}>
          {navigationItems.map((item, index) => (
            <a key={index} href={item.path} className={styles.navigationCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{item.icon}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <p className={styles.cardDescription}>{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
