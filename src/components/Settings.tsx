import React from "react";
import styled from "styled-components";

import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";
import PokemonService from "../services/pokemon";

const Dialog = styled.div`
  position: fixed;
  top: 5em;
  border-color: black;
  border-width: 1px 0;
  border-style: solid;
  padding: 2em;
  width: 100%;
  background: white;
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media (max-width: 768px) {
    bottom: 0;
  }

  @media (min-width: 769px) {
    max-height: 80vh;
    bottom: auto;
  }

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
    align-items: center;
  }
  label {
    margin-right: 10px;
    min-width: 10em;
    display: flex;
    align-items: center;
  }
  select {
    flex: 2;
    font-size: 16px;
    padding: 0.5em;
    border: 2px solid #e2e8f0;
    border-radius: 6px;
    background: white;
    color: #333;
    cursor: pointer;
    transition: all 0.2s ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75em center;
    background-size: 1em;
    padding-right: 2.5em;
  }
  select:hover {
    border-color: #3b82f6;
  }
  select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  @media (max-width: 768px) {
    select {
      font-size: 16px; /* Prevents zoom on iOS */
      padding: 1em;
      padding-right: 2.5em;
    }
  }
  button {
    width: 100%;
    padding: 0.75em 1em;
    border: 2px solid #3b82f6;
    background: white;
    color: #3b82f6;
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;
    margin-bottom: 0.5em;
  }
  button:hover {
    background: #3b82f6;
    color: white;
  }
  button:active {
    transform: translateY(1px);
  }
  .primary {
    background-color: #3b82f6;
    color: white;
    border: 2px solid #3b82f6;
  }
  .primary:hover {
    background: #2563eb;
    border-color: #2563eb;
  }
  .closeButton {
    background: transparent;
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    width: 1.5em;
    height: 1.5em;
    padding: 0;
    font-size: 1.75em;
    font-weight: bold;
    line-height: 1;
    border: none;
    color: #666;
    cursor: pointer;
    margin: 0;
    border-radius: 50%;
  }
  .closeButton:hover {
    background: #e0e0e0;
    color: #333;
  }
`;

interface SettingsProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  sortOrder: string;
  onSortOrderChange: (sortOrder: string) => void;
  pageMode: string;
}

export default function Settings({
  visible,
  onVisibleChange,
  sortOrder,
  onSortOrderChange,
  pageMode,
}: SettingsProps) {
  const [importData, setImportData] = React.useState("");
  const [importMessage, setImportMessage] = React.useState("");
  const pokemonService = new PokemonService();

  const hideSettings = () => {
    onVisibleChange(false);
  };

  const changeSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = e.target.value;
    onSortOrderChange(newSortOrder);
  };

  const handleExport = async () => {
    try {
      const data = pokemonService.exportAllData();

      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(data);
        setImportMessage("export: Data exported to clipboard!");
        setTimeout(() => setImportMessage(""), 3000);
      } else {
        // Fallback for mobile browsers
        const textArea = document.createElement("textarea");
        textArea.value = data;
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";
        textArea.style.width = "1px";
        textArea.style.height = "1px";
        textArea.style.opacity = "0";
        textArea.style.pointerEvents = "none";
        textArea.style.zIndex = "-1";
        document.body.appendChild(textArea);

        try {
          textArea.select();
          textArea.setSelectionRange(0, 99999);
          document.execCommand("copy");
          setImportMessage("export: Data exported to clipboard!");
          setTimeout(() => setImportMessage(""), 3000);
        } catch {
          setImportMessage(
            "export: Copy failed. Data is shown below - please copy manually.",
          );
          setTimeout(() => setImportMessage(""), 5000);
        }

        // Remove the textarea after a short delay to prevent viewport shifts
        setTimeout(() => {
          if (document.body.contains(textArea)) {
            document.body.removeChild(textArea);
          }
        }, 100);
      }
    } catch {
      setImportMessage("export: Export failed. Please try again.");
      setTimeout(() => setImportMessage(""), 3000);
    }
  };

  const handleImport = () => {
    if (!importData.trim()) {
      setImportMessage("Please enter data to import.");
      setTimeout(() => setImportMessage(""), 3000);
      return;
    }

    const success = pokemonService.importAllData(importData);
    if (success) {
      setImportMessage("Data imported successfully! Please refresh the page.");
      setImportData("");
      setTimeout(() => setImportMessage(""), 5000);
    } else {
      setImportMessage("Import failed. Please check your data format.");
      setTimeout(() => setImportMessage(""), 3000);
    }
  };

  return (
    <Dialog style={{ display: visible ? "block" : "none" }}>
      <button
        className="closeButton"
        onClick={hideSettings}
        aria-label="Close settings"
      >
        ✕
      </button>
      <h2>Settings</h2>

      <div>
        <label htmlFor="sortOrder">Sort order:</label>
        <select id="sortOrder" value={sortOrder} onChange={changeSortOrder}>
          {pageMode !== DexModes.UNOWN && (
            <option value={SortModes.ID}>Pokédex Number</option>
          )}
          <option value={SortModes.NAME}>Name</option>
          <option value={SortModes.CHECKED}>Checked</option>
        </select>
      </div>

      <div style={{ display: "block" }}>
        <h3>Data Management</h3>
        <p>Export or import your data to sync across devices.</p>

        <div style={{ marginBottom: "1em" }}>
          <button onClick={() => void handleExport()} className="primary">
            Export Data
          </button>
          {importMessage && importMessage.includes("export") && (
            <div
              style={{
                marginTop: "0.5em",
                padding: "0.5em",
                backgroundColor: importMessage.includes("failed")
                  ? "#f8d7da"
                  : "#d4edda",
                color: importMessage.includes("failed") ? "#721c24" : "#155724",
                borderRadius: "4px",
                fontSize: "0.9em",
              }}
            >
              {importMessage}
            </div>
          )}
        </div>

        <div style={{ display: "block" }}>
          <label
            htmlFor="importData"
            style={{ display: "block", marginBottom: "0.5em" }}
          >
            Import Data:
          </label>
          <textarea
            id="importData"
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder="Paste your exported data here..."
            style={{
              width: "100%",
              minHeight: "100px",
              marginBottom: "0.5em",
              padding: "0.5em",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "0.8em",
              boxSizing: "border-box",
            }}
          />
          <button onClick={handleImport} className="primary">
            Import Data
          </button>
          {importMessage && !importMessage.includes("export") && (
            <div
              style={{
                marginTop: "0.5em",
                padding: "0.5em",
                backgroundColor: importMessage.includes("success")
                  ? "#d4edda"
                  : "#f8d7da",
                color: importMessage.includes("success")
                  ? "#155724"
                  : "#721c24",
                borderRadius: "4px",
                fontSize: "0.9em",
              }}
            >
              {importMessage}
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
