import React from "react";
import PokemonService from "../services/pokemon";

export default function Download() {
  const pokemonService = new PokemonService();
  const pokemonServiceGetInformation = pokemonService.getLocalStorageInformation();
  const finalArray = [];
  finalArray.push(pokemonServiceGetInformation);


  const csvContent =
    "data:text/csv;charset=utf-8," +
    ["ID,Dex,Shadows,Unown", ...finalArray.map((item) => `${item.id},${item.dex},${item.shadows},${item.unown}`)].join(
      "\n"
    );

  const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = "pokemon_data.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log(blob)
  console.log()
}