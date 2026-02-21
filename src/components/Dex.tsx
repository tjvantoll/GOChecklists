import React from "react";
import styled from "styled-components";

import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";
import PokemonService from "../services/pokemon";
import type { Mon, Pokemon } from "../services/pokemon";
import SettingsService from "../services/settings";
import Render from "./Render";

import Header from "./Header";
import Progressbar from "./Progressbar";
import Settings from "./Settings";

const FixedContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
`;

const ProgressSection = styled.div`
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const MonList = styled.div`
  padding: 7.5em 0 0.5em 0;
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
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    cursor: pointer;
    height: 7em;
    position: relative;
    font-size: 0.8em;
    background-color: white;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 500px) {
    .card {
      font-size: 0.75em;
    }
  }
  @media (max-width: 370px) {
    .card {
      font-size: 0.7em;
    }
  }
  .selected {
    background-color: #dbeafe;
    border-color: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  }
  @media (hover: hover) {
    .card:hover,
    .card:focus {
      border-color: #3b82f6;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    }
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
        className={"card " + (mon.owned ? "selected" : "")}
        onClick={() => toggleOwned(mon)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`${mon.owned ? "Uncheck" : "Check"} ${mon.name}`}
        aria-pressed={mon.owned}
      >
        <span>{mon.name}</span>
        <img
          className="checkbox unchecked"
          src="/images/unchecked.png"
          alt="Unselect"
        />
        <img
          className="checkbox checked"
          src="/images/checked.png"
          alt="Select"
        />
        <img className="sprite" alt="" src={getImagePath(mon)} />
      </div>
    );
  };

  const buildList = () => {
    return <MonList>{mons.map((mon) => buildListItem(mon))}</MonList>;
  };

  const buildPokedexSortedList = () => {
    return (
      <MonList>
        {groupedMons.map((group, index) => (
          <div className="card-group" key={index}>
            {group.map((mon) => {
              return buildListItem(mon);
            })}
          </div>
        ))}
      </MonList>
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
        <FixedContainer>
          <Header
            title={DexModes.getPageTitle(pageMode)}
            settingsClick={toggleSettings}
          />
          <ProgressSection>
            <Progressbar value={owned} max={mons.length} />
          </ProgressSection>
        </FixedContainer>

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
