import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173, // Default port
  },
  resolve: {
    alias: {
      "@": "/src", // Optional alias for easier imports
    },
  },
});
