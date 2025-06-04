import React from "react";
import { Link } from "react-router-dom";

import Header from "./Header";


function Home() {
  React.useEffect(() => {
    document.title = "GOChecklists: Up-to-date checklists for Pokémon GO";
  }, []);

  return (
    <React.Fragment>
      <Header title="GO Checklists"></Header>

      <ul className="text-[1.25em]">
        <li className="m-5">
          <Link to="/dex">Dex</Link>
          <ul className="text-[0.8em] m-0">
            <li className="m-0">Track your main Pokédex completion in Pokémon GO.</li>
          </ul>
        </li>
        <li className="m-5">
          <Link to="/shiny">ShinyDex</Link>
          <ul className="text-[0.8em] m-0">
            <li className="m-0">Track which of the available shinies you’ve caught.</li>
          </ul>
        </li>
        <li className="m-5">
          <Link to="/lucky">LuckyDex</Link>
          <ul className="text-[0.8em] m-0">
            <li className="m-0">Track how many lucky Pokémon you’ve acquired.</li>
          </ul>
        </li>
        <li className="m-5">
          <Link to="/unown">UnownDex</Link>
          <ul className="text-[0.8em] m-0">
            <li className="m-0">Track how many Unown you own.</li>
          </ul>
        </li>
        <li className="m-5">
          <Link to="/shadow">ShadowDex</Link>
          <ul className="text-[0.8em] m-0">
            <li className="m-0">Track how many shadow Pokémon you have.</li>
          </ul>
        </li>
      </ul>
    </React.Fragment>
  )
}

export default Home;
