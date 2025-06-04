import React from "react";

import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";
import PokemonService from "../services/pokemon";
import SettingsService from "../services/settings";
import Render from "./Render";

import Header from "./Header";
import Progressbar from "./Progressbar";
import Settings from "./Settings";

export default function Dex() {
  const pokemonService = new PokemonService();
  const settingsService = new SettingsService();
  const pageMode = pokemonService.getPageMode();

  const getSortOrder = () => {
    return settingsService.readSortOrder(pageMode) ||
      DexModes.getDefaultSortOrder(pageMode);
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
      return mons.filter(mon => mon.owned).length;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageMode, sortOrder]);

  const sort = () => {
    const sortedMons = pokemonService.sort(mons, getSortOrder());
    setMons(sortedMons);
  }

  const toggleOwned = (mon) => {
    if (showSettings) {
      return;
    }

    mon.owned = !mon.owned;
    setOwned(mon.owned ? (owned + 1) : (owned - 1));
    setMons([...mons]);
    pokemonService.save(mons, pageMode);
    setTimeout(() => { sort() }, 100);
  }

  const getImagePath = (mon) => {
    const basePath = (pageMode === DexModes.SHINY) ? "shiny-sprites" : "sprites";

    if (pageMode === DexModes.UNOWN) {
      const name = mon.name === "?" ? "question" : mon.name.toLowerCase();
      return `/images/${basePath}/201-${name}.png`;
    }
    return `/images/${basePath}/${mon.id}.png`;
  }

  const buildListItem = (mon) => {
    return (
      <div
        key={mon.id || mon.name}
        className={`${mon.owned ? "bg-[#F5F5F5]" : ""} w-[9em] m-1 border border-[#DCE7DC] rounded-lg cursor-pointer h-[7em] relative text-[0.8em] max-[500px]:text-[0.75em] max-[370px]:text-[0.70em]`}
        onClick={() => toggleOwned(mon)}
      >
        <span className="absolute top-[0.5em] left-[0.5em]">{mon.name}</span>
        <img
          className={`checkbox unchecked absolute top-[0.5em] right-[0.25em] w-[1.75em] ${mon.owned ? "hidden" : "inline"}`}
          src="/images/unchecked.png"
          alt="Unselect"
        />
        <img
          className={`checkbox checked absolute top-[0.5em] right-[0.25em] w-[1.75em] ${mon.owned ? "inline" : "hidden"}`}
          src="/images/checked.png"
          alt="Select"
        />
        <img
          className="sprite absolute top-[1.25em] left-0 right-0 text-center m-auto w-[6em]"
          alt=""
          src={getImagePath(mon)}
        />
      </div>
    )
  }

  const buildList = () => {
    return (
      <div className="pt-[5.7em] pb-[0.5em] m-1 touch-manipulation flex flex-wrap justify-center">
        {mons.map((mon) => (
          buildListItem(mon)
        ))}
      </div>
    );
  }

  const buildPokedexSortedList = () => {
    return (
      <div className="pt-[5.7em] pb-[0.5em] m-1 touch-manipulation flex flex-wrap justify-center">
        {groupedMons.map((group, index) => (
          <div className="inline-flex flex-wrap justify-center items-center mx-1" key={index}>
            {group.map(mon => {
              return buildListItem(mon);
            })}
          </div>
        ))}
      </div>
    )
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  }
  const onSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    settingsService.writeSortOrder(newSortOrder, pageMode);
    sort();
  }
  const onVisibleChange = (newVisible) => {
    setShowSettings(newVisible);
  }

  return (
    <React.Fragment>
      <div style={{ opacity: showSettings ? 0.2 : 1 }}>
        <div className="fixed w-full top-0 bg-white z-20">
          <Header
            title={DexModes.getPageTitle(pageMode)}
            settingsClick={toggleSettings}
          />
          <Progressbar value={owned} max={mons.length} />
        </div>

        <Render if={sortOrder === SortModes.ID}>
          {buildPokedexSortedList()}
        </Render>
        <Render if={sortOrder !== SortModes.ID}>
          {buildList()}
        </Render>
      </div>

      <Settings
        pageMode={pageMode}
        visible={showSettings}
        onVisibleChange={onVisibleChange}
        sortOrder={sortOrder}
        onSortOrderChange={onSortOrderChange} />
    </React.Fragment>
  );
}
