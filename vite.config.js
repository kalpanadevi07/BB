import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "startling-deplored-striking.ngrok-free.dev",
    ],
  },
});