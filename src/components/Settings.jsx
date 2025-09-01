import React from "react";
import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";
import PokemonService from "../services/pokemon";
import styles from "./Settings.module.css";

export default function Settings(props) {
  const { visible, onVisibleChange, sortOrder, onSortOrderChange, pageMode } =
    props;

  const [importData, setImportData] = React.useState("");
  const [importMessage, setImportMessage] = React.useState("");
  const pokemonService = new PokemonService();

  const hideSettings = () => {
    onVisibleChange(false);
  };

  const changeSortOrder = (e) => {
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
        } catch (fallbackError) {
          // If copy fails, show the data for manual copy
          setImportMessage(
            "export: Copy failed. Data is shown below - please copy manually."
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
    } catch (error) {
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
    <div className={styles.dialog} style={{ display: visible ? "block" : "none" }}>
      <button
        className={styles.closeButton}
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
          <button onClick={handleExport} className={styles.primary}>
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
          <button onClick={handleImport} className={styles.primary}>
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
    </div>
  );
}
