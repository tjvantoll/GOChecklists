import React from "react";
import styles from "./Dex.module.css";

import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";
import PokemonService from "../services/pokemon";
import type { Mon, Pokemon } from "../services/pokemon";
import SettingsService from "../services/settings";
import Render from "./Render";

import Header from "./Header";
import Progressbar from "./Progressbar";
import Settings from "./Settings";

interface DexProps {
  pageMode: string;
}

export default function Dex({ pageMode }: DexProps) {
  const pokemonService = new PokemonService();
  const settingsService = new SettingsService();

  const getSortOrder = () => {
    return (
      settingsService.readSortOrder(pageMode) ||
      DexModes.getDefaultSortOrder(pageMode)
    );
  };

  const [mons, setMons] = React.useState<Mon[]>([]);
  const [groupedMons, setGroupedMons] = React.useState<Mon[][]>([]);
  const [owned, setOwned] = React.useState(0);
  const [showSettings, setShowSettings] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState(getSortOrder());

  React.useEffect(() => {
    document.title = "GOChecklists: " + DexModes.getPageTitle(pageMode);

    const mons = pokemonService.getMons(pageMode);
    const sortedMons = pokemonService.sort(mons, sortOrder);
    setMons(sortedMons);
    setGroupedMons(pokemonService.getGroupedMons(sortedMons));
    setOwned(() => {
      return mons.filter((mon) => mon.owned).length;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMode, sortOrder]);

  const sort = () => {
    const sortedMons = pokemonService.sort(mons, getSortOrder());
    setMons(sortedMons);
  };

  const toggleOwned = (mon: Mon) => {
    if (showSettings) {
      return;
    }

    mon.owned = !mon.owned;
    setOwned(mon.owned ? owned + 1 : owned - 1);
    setMons([...mons]);
    pokemonService.save(mons, pageMode);
    setTimeout(() => {
      sort();
    }, 100);

    // Remove focus from the clicked element to prevent scrolling
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const getImagePath = (mon: Mon) => {
    const basePath = pageMode === DexModes.SHINY ? "shiny-sprites" : "sprites";

    if (pageMode === DexModes.UNOWN) {
      const name = mon.name === "?" ? "question" : mon.name.toLowerCase();
      return `/images/${basePath}/201-${name}.png`;
    }
    return `/images/${basePath}/${(mon as Pokemon).id}.png`;
  };

  const buildListItem = (mon: Mon) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleOwned(mon);
      }
    };

    return (
      <div
        key={(mon as Pokemon).id ?? mon.name}
        className={`${styles.card} ${mon.owned ? styles.selected : ""}`}
        onClick={() => toggleOwned(mon)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${mon.owned ? "Uncheck" : "Check"} ${mon.name}`}
        aria-pressed={mon.owned}
      >
        <span>{mon.name}</span>
        <img
          className={styles.checkbox}
          src="/images/unchecked.png"
          alt="Unselect"
        />
        <img
          className={`${styles.checkbox} ${styles.checked}`}
          src="/images/checked.png"
          alt="Select"
        />
        <img className={styles.sprite} alt="" src={getImagePath(mon)} />
      </div>
    );
  };

  const buildList = () => {
    return (
      <div className={styles.monList}>
        {mons.map((mon) => buildListItem(mon))}
      </div>
    );
  };

  const buildPokedexSortedList = () => {
    return (
      <div className={styles.monList}>
        {groupedMons.map((group, index) => (
          <div className={styles.cardGroup} key={index}>
            {group.map((mon) => {
              return buildListItem(mon);
            })}
          </div>
        ))}
      </div>
    );
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  const onSortOrderChange = (newSortOrder: string) => {
    setSortOrder(newSortOrder);
    settingsService.writeSortOrder(newSortOrder, pageMode);
    sort();
  };
  const onVisibleChange = (newVisible: boolean) => {
    setShowSettings(newVisible);
  };

  return (
    <React.Fragment>
      <div style={{ opacity: showSettings ? 0.2 : 1 }}>
        <div className={styles.fixedContainer}>
          <Header
            title={DexModes.getPageTitle(pageMode)}
            settingsClick={toggleSettings}
          />
          <div className={styles.progressSection}>
            <Progressbar value={owned} max={mons.length} />
          </div>
        </div>

        <Render if={sortOrder === SortModes.ID}>
          {buildPokedexSortedList()}
        </Render>
        <Render if={sortOrder !== SortModes.ID}>{buildList()}</Render>
      </div>

      <Settings
        pageMode={pageMode}
        visible={showSettings}
        onVisibleChange={onVisibleChange}
        sortOrder={sortOrder}
        onSortOrderChange={onSortOrderChange}
      />
    </React.Fragment>
  );
}
