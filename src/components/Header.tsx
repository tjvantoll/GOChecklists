import { useNavigate } from "@tanstack/react-router";
import styles from "./Header.module.css";

interface HeaderProps {
  title: string;
  settingsClick?: () => void;
}

export default function Header({ title, settingsClick }: HeaderProps) {
  const navigate = useNavigate();

  const navigateHome = () => {
    void navigate({ to: "/" });
  };

  return (
    <header className={styles.container}>
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
