import React from "react";
import styled from "styled-components";

import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";
import PokemonService from "../services/pokemon";
import SettingsService from "../services/settings";
import Render from "./Render";

import Header from "./Header";
import Progressbar from "./Progressbar";
import Settings from "./Settings";

const FixedContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: white;
  z-index: 2;
`;

const MonList = styled.div`
  padding: 5.7em 0 0.5em 0;
  margin: 0.25em;
  touch-action: manipulation;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .card-group {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: middle;
    margin: 0em 0.25em;
  }

  .card {
    width: 9em;
    margin: 0.25em;
    border: 1px solid #DCE7DC;
    border-radius: 10px;
    cursor: pointer;
    height: 7em;
    position: relative;
    font-size: 0.8em;
  }
  @media (max-width: 500px) {
    .card { font-size: 0.75em; }
  }
  @media (max-width: 370px) {
    .card { font-size: 0.70em; }
  }
  .selected {
    background-color: #F5F5F5;
  }
  .card span {
    position: absolute;
    top: 0.5em;
    left: 0.5em;
  }
  .checkbox {
    position: absolute;
    top: 0.5em;
    right: 0.25em;
    width: 1.75em;
  }
  .card .gender {
    top: auto;
    bottom: 0.5em;
  }
  .checked {
    display: none;
  }
  .selected .checked {
    display: inline;
  }
  .sprite {
    position: absolute;
    top: 1.25em;
    left: 0;
    right: 0;
    text-align: center;
    margin: 0 auto;
    width: 6em;
  }
`;

export default function Dex() {
  const pokemonService = new PokemonService();
  const settingsService = new SettingsService();
  const pageMode = pokemonService.getPageMode();

  console.log(pokemonService.getLocalStorageInformation())

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
        className={"card " + (mon.owned ? "selected" : "")}
        onClick={() => toggleOwned(mon)}
      >
        <span>{mon.name}</span>
        <img className="checkbox unchecked" src="/images/unchecked.png" alt="Unselect" />
        <img className="checkbox checked" src="/images/checked.png" alt="Select" />
        <img
          className="sprite"
          alt=""
          src={getImagePath(mon)}
        />
      </div>
    )
  }

  const buildList = () => {
    return (
      <MonList>
        {mons.map((mon) => (
          buildListItem(mon)
        ))}
      </MonList>
    );
  }

  const buildPokedexSortedList = () => {
    return (
      <MonList>
        {groupedMons.map((group, index) => (
          <div className="card-group" key={index}>
            {group.map(mon => {
              return buildListItem(mon);
            })}
          </div>
        ))}
      </MonList>
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
        <FixedContainer>
          <Header
            title={DexModes.getPageTitle(pageMode)}
            settingsClick={toggleSettings}
          />
          <Progressbar value={owned} max={mons.length} />
        </FixedContainer>

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
