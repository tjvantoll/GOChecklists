import React from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Sparkles, Clover, Puzzle, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./Home.module.css";

import Header from "./Header";

interface NavItem {
  path: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

function Home() {
  React.useEffect(() => {
    document.title = "GOChecklists: Up-to-date checklists for Pokémon GO";
  }, []);

  const navigationItems: NavItem[] = [
    {
      path: "/dex",
      title: "Dex",
      description: "Track your main Pokédex completion in Pokémon GO",
      icon: BookOpen,
    },
    {
      path: "/shiny",
      title: "ShinyDex",
      description: "Track which of the available shinies you've caught",
      icon: Sparkles,
    },
    {
      path: "/lucky",
      title: "LuckyDex",
      description: "Track how many lucky Pokémon you've acquired",
      icon: Clover,
    },
    {
      path: "/unown",
      title: "UnownDex",
      description: "Track how many Unown you own",
      icon: Puzzle,
    },
    {
      path: "/shadow",
      title: "ShadowDex",
      description: "Track how many shadow Pokémon you have",
      icon: Zap,
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <Header title="GO Checklists" />

      <div className={styles.content}>
        <div className={styles.navigationGrid}>
          {navigationItems.map((item, index) => (
            <Link key={index} to={item.path} className={styles.navigationCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>
                  <item.icon size={24} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <p className={styles.cardDescription}>{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
