import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    netlify(),
    tanstackStart({
      spa: { enabled: true },
    }),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    viteReact(),
  ],
});
