import { render } from "@testing-library/react";

import Dex from "./Dex";

import DexModes from "../services/DexModes";

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
}));

test("Test out default rendering", async () => {
  const { findByText } = render(<Dex pageMode={DexModes.DEX} />);
  const text = await findByText(/Bulbasaur/i);
  expect(text).toBeTruthy();
});
