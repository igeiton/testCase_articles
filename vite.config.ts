import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "@assets/variables": "./src/assets/variables.scss",
      "@assets/mixins": "./src/assets/mixins.scss",
    },
  },
});
