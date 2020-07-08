import React from "react";
import { render, waitForElement } from "@testing-library/react";

import Dex from "./Dex";

import PokemonService from "../services/pokemon";
import DexModes from "../services/DexModes";

jest.mock("react-router-dom", () => ({
  useHistory: () => {
    push: jest.fn()
  }
}));

test("Test out default rendering", async (done) => {
  const mockGetPageMode = jest.fn(() => {
    return DexModes.DEX;
  });
  PokemonService.prototype.getPageMode = mockGetPageMode;

  const { container, queryByText } = render(<Dex />);
  const text = await waitForElement(() => {
    setTimeout(() => {
      const text = queryByText(/Bulbasaur/i);
      expect(text).toBeTruthy();
      done();
    });
  });
});
