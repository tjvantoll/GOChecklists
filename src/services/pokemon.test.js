import PokemonService from "./pokemon";
import DexModes from "../services/DexModes";
import SortModes from "../services/SortModes";

const pokemonService = new PokemonService();

test("Page filtering: Dex mode", () => {
  const mons = pokemonService.filter([
    { id: 1, available: false },
    { id: 2, available: true },
  ], DexModes.DEX);

  expect(mons.length).toBe(1);
  expect(mons[0].id).toBe(2);
});

test("Page filtering: Shiny mode", () => {
  const mons = pokemonService.filter([
    { id: 1, shinyAvailable: false },
    { id: 2, shinyAvailable: true },
  ], DexModes.SHINY);

  expect(mons.length).toBe(1);
  expect(mons[0].id).toBe(2);
});

test("Page filtering: Lucky mode", () => {
  const mons = pokemonService.filter([
    { id: 1, available: false, tradable: false },
    { id: 2, available: false, tradable: true },
    { id: 3, available: true, tradable: false },
    { id: 4, available: true, tradable: true },
  ], DexModes.LUCKY);

  expect(mons.length).toBe(1);
  expect(mons[0].id).toBe(4);
});

test("Page filtering: Shadow mode", () => {
  const mons = pokemonService.filter([
    { id: 1, shadow: true },
    { id: 2, shadow: false },
  ], DexModes.SHADOW);

  expect(mons.length).toBe(1);
  expect(mons[0].id).toBe(1);
});

test("ID based sorting", () => {
  const mons = pokemonService.sort([
    { id: 3 },
    { id: 1 },
    { id: 2 },
  ], SortModes.ID);

  expect(mons[0].id).toBe(1);
  expect(mons[1].id).toBe(2);
  expect(mons[2].id).toBe(3);
});

test("Name based sorting", () => {
  const mons = pokemonService.sort([
    { id: 4, name: "Charmander" },
    { id: 15, name: "Beedrill" },
    { id: 7, name: "Squirtle" },
  ], SortModes.NAME);

  expect(mons[0].id).toBe(15);
  expect(mons[1].id).toBe(4);
  expect(mons[2].id).toBe(7);
});

test("Checked based sorting", () => {
  const mons = pokemonService.sort([
    { id: 3, name: "Venusaur", owned: true },
    { id: 1, name: "Bulbasaur", owned: true },
    { id: 2, name: "Ivysaur", owned: false },
  ], SortModes.CHECKED);

  expect(mons[0].id).toBe(2);
  expect(mons[1].id).toBe(1);
});

test("Unown checked sorting", () => {
  const unowns = pokemonService.sort([
    { name: "C", owned: true },
    { name: "A", owned: true },
    { name: "B", owned: false },
  ], SortModes.CHECKED);

  expect(unowns[0].name).toBe("B");
  expect(unowns[1].name).toBe("A");
});

test("Grouping logic", () => {
  const groupedMons = pokemonService.getGroupedMons([
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]);

  expect(groupedMons).toEqual([
    [{id: 1}, {id: 2}, {id: 3}],
    [{id: 4}, {id: 5}, {id: 6}],
  ])
})