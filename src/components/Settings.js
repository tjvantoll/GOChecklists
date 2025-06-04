import React from "react";

import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";


export default function Settings(props) {
  const { visible, onVisibleChange, sortOrder,
      onSortOrderChange, pageMode } = props;

  const hideSettings = () => {
    onVisibleChange(false);
  }

  const changeSortOrder = (e) => {
    const newSortOrder = e.target.value;
    onSortOrderChange(newSortOrder);
  }

  return (
    <div
      className="fixed top-[10em] border-y border-black p-8 w-full bg-white box-border"
      style={{ display: visible ? "block" : "none" }}
    >
      <h2 className="m-0 text-[1.75em]">Settings</h2>

      <div className="my-8 flex">
        <label htmlFor="sortOrder" className="mr-[10px] min-w-[10em]">Sort order:</label>
        <select id="sortOrder" value={sortOrder} onChange={changeSortOrder} className="flex-1 text-base">
          {pageMode !== DexModes.UNOWN && <option value={SortModes.ID}>Pokédex Number</option>}
          <option value={SortModes.NAME}>Name</option>
          <option value={SortModes.CHECKED}>Checked</option>
        </select>
      </div>

      <button className="w-full border border-[#2AB3FF] p-4 bg-white text-[#2AB3FF] text-[0.9em] cursor-pointer" onClick={hideSettings}>Close</button>
    </div>
  );
}
