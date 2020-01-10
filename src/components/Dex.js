import React from "react";
import styled from "styled-components";

import DexModes from "../services/DexModes";
import PokemonService from "../services/pokemon";
import SettingsService from "../services/settings";

import Header from "./Header";
import Progressbar from "./Progressbar";
import Loading from "./Loading";

const Dialog = styled.div`
  position: fixed;
  top: 10em;
  border-color: black;
  border-width: 1px 0;
  border-style: solid;
  padding: 2em;
  width: 100%;
  background: white;
  box-sizing: border-box;

  h2 {
    margin: 0em;
    font-size: 1.75em;
  }
  p {
    margin: 0 0 1.5em 0;
  }
  > div {
    margin: 2em 0;
    display: flex;
  }
  label {
    margin-right: 10px;
    min-width: 10em;
  }
  select {
    flex: 2;
    font-size: 16px;
  }
  button {
    width: 100%;
    border: 1px solid black;
    padding: 1em;
    border: 1px solid #2AB3FF;
    background: white;
    color: #2AB3FF;
    font-size: 0.9em;
    cursor: pointer;
  }
  .primary {
    background-color: #2AB3FF;
    color: white;
    border: none;
    margin-bottom: 1em;
  }
`;

const FixedContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  background-color: white;
  z-index: 2;
`;

const MonList = styled.ul`
  list-style-type: none;
  padding: 5.7em 0 0.5em 0;
  margin: 0.25em;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  touch-action: manipulation;

  .card {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 25%;
    margin: 0.25em;
    border: 1px solid #DCE7DC;
    border-radius: 10px;
    cursor: pointer;
    height: 7em;
    position: relative;
    font-size: 0.8em;
  }
  @media (min-width: 500px) {
    .card { flex-basis: 20%; }
  }
  @media (min-width: 600px) {
    .card { flex-basis: 18%; }
  }
  @media (min-width: 750px) {
    .card { flex-basis: 15%; }
  }
  @media (min-width: 900px) {
    .card { flex-basis: 12%; }
  }
  @media (min-width: 1050px) {
    .card { flex-basis: 10%; }
  }
  @media (min-width: 1200px) {
    .card { flex-basis: 8%; }
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

function Dex() {
  const pokemonService = new PokemonService();
  const settingsService = new SettingsService();
  const pageMode = window.location.pathname.replace("/", "");

  const getSortOrder = () => {
    return settingsService.readSortOrder(pageMode) ||
      DexModes.getDefaultSortOrder(pageMode);
  };

  const [mons, setMons] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [owned, setOwned] = React.useState(0);
  const [showSettings, setShowSettings] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState(getSortOrder());

  React.useEffect(() => {
    document.title = "GOChecklists: " + DexModes.getPageTitle(pageMode);

    pokemonService
      .getMons(pageMode)
      .then(data => {
        const sortedMons = pokemonService.sort(data, sortOrder);
        setMons(sortedMons);
        setOwned(() => {
          return data.filter(mon => mon.owned).length;
        });
        setLoaded(true);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  }
  const hideSettings = () => {
    setShowSettings(false);
  }

  const changeSortOrder = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
    settingsService.writeSortOrder(newSortOrder, pageMode);
    sort();
  }

  const buildListItem = (mon) => {
    return (
      <li
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
      </li>
    )
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

        <MonList>
          {mons.map((mon) => (
            buildListItem(mon)
          ))}
        </MonList>
      </div>

      {!loaded && <Loading />}

      <Dialog style={{ display: showSettings ? "block": "none" }}>
        <h2>Settings</h2>

        <div>
          <label htmlFor="sortOrder">Sort order:</label>
          <select id="sortOrder" value={sortOrder} onChange={changeSortOrder}>
            {pageMode !== DexModes.UNOWN &&
              <option value="1">Pokédex Number</option>}
            <option value="2">Name</option>
            <option value="3">Checked</option>
          </select>
        </div>

        <button onClick={hideSettings}>Close</button>
      </Dialog>
    </React.Fragment>
  );
}

export default Dex;
