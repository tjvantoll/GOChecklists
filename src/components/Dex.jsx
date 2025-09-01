import React from "react";
import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";
import PokemonService from "../services/pokemon";
import SettingsService from "../services/settings";
import Render from "./Render.jsx";

import Header from "./Header.jsx";
import Progressbar from "./Progressbar.jsx";
import Settings from "./Settings.jsx";
import ImageLoader from "./ImageLoader.jsx";
import styles from "./Dex.module.css";

export default function Dex() {
  const pokemonService = new PokemonService();
  const settingsService = new SettingsService();
  const pageMode = pokemonService.getPageMode();

  const getSortOrder = () => {
    return (
      settingsService.readSortOrder(pageMode) ||
      DexModes.getDefaultSortOrder(pageMode)
    );
  };

  const [mons, setMons] = React.useState([]);
  const [groupedMons, setGroupedMons] = React.useState([]);
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

  const toggleOwned = (mon) => {
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
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  const getImagePath = (mon) => {
    const basePath = pageMode === DexModes.SHINY ? "shiny-sprites" : "sprites";

    if (pageMode === DexModes.UNOWN) {
      const name = mon.name === "?" ? "question" : mon.name.toLowerCase();
      return `/images/${basePath}/201-${name}.png`;
    }
    return `/images/${basePath}/${mon.id}.png`;
  };

  const buildListItem = (mon) => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleOwned(mon);
      }
    };

    return (
      <div
        key={mon.id || mon.name}
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
          className={`${styles.checkbox} unchecked`}
          src="/images/unchecked.png"
          alt="Unselect"
          loading="eager"
          decoding="async"
        />
        <img
          className={`${styles.checkbox} ${styles.checked}`}
          src="/images/checked.png"
          alt="Select"
          loading="eager"
          decoding="async"
        />
        <ImageLoader 
          src={getImagePath(mon)} 
          alt={mon.name}
          className={styles.sprite}
        />
      </div>
    );
  };

  const buildList = () => {
    return <div className={styles.monList}>{mons.map((mon) => buildListItem(mon))}</div>;
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
  const onSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    settingsService.writeSortOrder(newSortOrder, pageMode);
    sort();
  };
  const onVisibleChange = (newVisible) => {
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
