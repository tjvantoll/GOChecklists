import React from "react";
import { render } from "@testing-library/react";

import Dex from "./Dex";

import PokemonService from "../services/pokemon";
import DexModes from "../services/DexModes";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

test("Test out default rendering", async () => {
  const mockGetPageMode = jest.fn(() => {
    return DexModes.DEX;
  });
  PokemonService.prototype.getPageMode = mockGetPageMode;

  const { findByText } = render(<Dex />);
  const text = await findByText(/Bulbasaur/i);
  expect(text).toBeTruthy();
});
