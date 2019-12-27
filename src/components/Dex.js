import React from "react";

import DexModes from "../services/DexModes";
import PokemonService from "../services/pokemon";
import SettingsService from "../services/settings";

import Header from "./Header";
import Progressbar from "./Progressbar";

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
        <div className="fixed-container">
          <Header
            title={DexModes.getPageTitle(pageMode)}
            settingsClick={toggleSettings}
          />
          <Progressbar value={owned} max={mons.length} />
        </div>

        <ul className="mon-list">
          {mons.map((mon) => (
            buildListItem(mon)
          ))}
        </ul>
      </div>

      {!loaded &&
        <img className="loading" src="/images/loading.gif" alt="Loading" />}

      <div className="dialog" style={{ display: showSettings ? "block": "none" }}>
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
      </div>
    </React.Fragment>
  );
}

export default Dex;
