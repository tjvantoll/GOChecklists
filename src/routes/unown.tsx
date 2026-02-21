import { createFileRoute } from "@tanstack/react-router";
import Dex from "../components/Dex";
import DexModes from "../services/DexModes";

export const Route = createFileRoute("/unown")({
  component: () => <Dex pageMode={DexModes.UNOWN} />,
});
