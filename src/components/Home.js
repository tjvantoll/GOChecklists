import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";

const List = styled.ul`
  font-size: 1.25em;

  li {
    margin: 20px;
  }
  ul {
    font-size: 0.8em;
    margin: 0;
  }
  ul li {
    margin: 0;
  }
`;

function Home() {
  React.useEffect(() => {
    document.title = "GOChecklists: Up-to-date checklists for Pokémon GO";
  }, []);

  return (
    <React.Fragment>
      <Header title="GO Checklists"></Header>

      <List>
        <li>
          <Link to="/dex">Dex</Link>
          <ul>
            <li>Track your main Pokédex completion in Pokémon GO.</li>
          </ul>
        </li>
        <li>
          <Link to="/shiny">ShinyDex</Link>
          <ul>
            <li>Track which of the available shinies you’ve caught.</li>
          </ul>
        </li>
        <li>
          <Link to="/lucky">LuckyDex</Link>
          <ul>
            <li>Track how many lucky Pokémon you’ve acquired.</li>
          </ul>
        </li>
        <li>
          <Link to="/unown">UnownDex</Link>
          <ul>
            <li>Track how many Unown you own.</li>
          </ul>
        </li>
        <li>
          <Link to="/shadow">ShadowDex</Link>
          <ul>
            <li>Track how many shadow Pokémon you have.</li>
          </ul>
        </li>
      </List>
    </React.Fragment>
  )
}

export default Home;
