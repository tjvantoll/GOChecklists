import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

test("Hello World", () => {
  const { getByText } = render(<App />);
  const element = getByText(/go checklists/i);
  expect(element).toBeTruthy();
});
