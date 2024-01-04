import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    proxy: {
      // "/investors": "http://localhost:3001",
      // "/products": "http://localhost:3001",
      // "/selected": "http://localhost:3001",
      "/investors": "http://investa-api.onrender.com",
      "/products": "http://investa-api.onrender.com",
      "/selected": "http://investa-api.onrender.com",
    },
  },
});