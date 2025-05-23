import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// vite.config.js
export default defineConfig({
  base: "/", // or your repo name if hosted under a subpath
  plugins: [react()],
});
