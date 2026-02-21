import { render } from "@testing-library/react";

import Settings from "./Settings";
import DexModes from "../services/DexModes";

const defaultProps = {
  visible: true,
  onVisibleChange: () => {},
  sortOrder: "1",
  onSortOrderChange: () => {},
};

test("Number option should show in Dex mode", () => {
  const { queryByText } = render(
    <Settings {...defaultProps} pageMode={DexModes.DEX} />,
  );
  const text = queryByText(/number/i);
  expect(text).toBeTruthy();
});

test("Number option should NOT show in Unown mode", () => {
  const { queryByText } = render(
    <Settings {...defaultProps} pageMode={DexModes.UNOWN} />,
  );
  const text = queryByText(/number/i);
  expect(text).toBeNull();
});
