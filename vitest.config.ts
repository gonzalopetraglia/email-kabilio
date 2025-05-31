import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./app/tests/setup.ts",
    env: {
      DATABASE_URL: "postgresql://user:password@localhost:5432/test_db"
    }
  }
});
