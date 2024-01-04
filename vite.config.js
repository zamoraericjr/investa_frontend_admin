import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      "/investors": "http://localhost:3001",
      "/products": "http://localhost:3001",
      "/selected": "http://localhost:3001",
    },
  },
});