import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from outside the container
    port: 5173, // Default Vite port
    strictPort: true,
    watch: {
      usePolling: true, // Ensures file changes are detected in Docker
    },
  },
});
