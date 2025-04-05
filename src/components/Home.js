import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Download from "./Download";

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

const StyledButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  font-size: 1em;
  font-size: 14px;
  width: 130px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004494;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
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
        <li>
          <StyledButton onClick={Download}>Download</StyledButton>
          <ul>
            <li>Download your Pokémon history.</li>
          </ul>
        </li>
      </List>
    </React.Fragment>
  )
}

export default Home;
