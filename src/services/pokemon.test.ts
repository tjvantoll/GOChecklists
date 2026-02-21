import PokemonService from "./pokemon";
import type { Pokemon, Mon } from "./pokemon";
import DexModes from "./DexModes";
import SortModes from "./SortModes";

const pokemonService = new PokemonService();

test("Page filtering: Dex mode", () => {
  const mons = pokemonService.filter([
    { id: 1, name: "Bulbasaur", available: false },
    { id: 2, name: "Ivysaur", available: true },
  ], DexModes.DEX);

  expect(mons.length).toBe(1);
  expect(mons[0].id).toBe(2);
});

test("Page filtering: Shiny mode", () => {
  const mons = pokemonService.filter([
    { id: 1, name: "Bulbasaur", shinyAvailable: false },
    { id: 2, name: "Ivysaur", shinyAvailable: true },
  ], DexModes.SHINY);

  expect(mons.length).toBe(1);
  expect(mons[0].id).toBe(2);
});

test("Page filtering: Lucky mode", () => {
  const mons = pokemonService.filter([
    { id: 1, name: "Bulbasaur", available: false, tradable: false },
    { id: 2, name: "Ivysaur", available: false, tradable: true },
    { id: 3, name: "Venusaur", available: true, tradable: false },
    { id: 4, name: "Charmander", available: true, tradable: true },
  ], DexModes.LUCKY);

  expect(mons.length).toBe(1);
  expect(mons[0].id).toBe(4);
});

test("Page filtering: Shadow mode", () => {
  const mons = pokemonService.filter([
    { id: 1, name: "Bulbasaur", shadow: true },
    { id: 2, name: "Ivysaur", shadow: false },
  ], DexModes.SHADOW);

  expect(mons.length).toBe(1);
  expect(mons[0].id).toBe(1);
});

test("ID based sorting", () => {
  const mons = pokemonService.sort([
    { id: 3, name: "Venusaur" } as Pokemon,
    { id: 1, name: "Bulbasaur" } as Pokemon,
    { id: 2, name: "Ivysaur" } as Pokemon,
  ], SortModes.ID);

  expect((mons[0] as Pokemon).id).toBe(1);
  expect((mons[1] as Pokemon).id).toBe(2);
  expect((mons[2] as Pokemon).id).toBe(3);
});

test("Name based sorting", () => {
  const mons = pokemonService.sort([
    { id: 4, name: "Charmander" } as Pokemon,
    { id: 15, name: "Beedrill" } as Pokemon,
    { id: 7, name: "Squirtle" } as Pokemon,
  ], SortModes.NAME);

  expect((mons[0] as Pokemon).id).toBe(15);
  expect((mons[1] as Pokemon).id).toBe(4);
  expect((mons[2] as Pokemon).id).toBe(7);
});

test("Checked based sorting", () => {
  const mons = pokemonService.sort([
    { id: 3, name: "Venusaur", owned: true } as Pokemon,
    { id: 1, name: "Bulbasaur", owned: true } as Pokemon,
    { id: 2, name: "Ivysaur", owned: false } as Pokemon,
  ], SortModes.CHECKED);

  expect((mons[0] as Pokemon).id).toBe(2);
  expect((mons[1] as Pokemon).id).toBe(1);
});

test("Unown checked sorting", () => {
  const unowns: Mon[] = [
    { name: "C", owned: true },
    { name: "A", owned: true },
    { name: "B", owned: false },
  ];
  const sorted = pokemonService.sort(unowns, SortModes.CHECKED);

  expect(sorted[0].name).toBe("B");
  expect(sorted[1].name).toBe("A");
});

test("Grouping logic", () => {
  const groupedMons = pokemonService.getGroupedMons([
    { id: 4, name: "Charmander" } as Pokemon,
    { id: 5, name: "Charmeleon" } as Pokemon,
    { id: 6, name: "Charizard" } as Pokemon,
    { id: 1, name: "Bulbasaur" } as Pokemon,
    { id: 2, name: "Ivysaur" } as Pokemon,
    { id: 3, name: "Venusaur" } as Pokemon,
  ]);

  expect(groupedMons[0].map((m) => (m as Pokemon).id)).toEqual([1, 2, 3]);
  expect(groupedMons[1].map((m) => (m as Pokemon).id)).toEqual([4, 5, 6]);
});
