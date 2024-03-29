import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    federation({
      name: "stockApp",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./App": "./src/loadApp.js",
      },
    }),
  ],
  base: "./",
});
