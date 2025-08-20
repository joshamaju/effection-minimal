import { defineConfig } from "stack54/config";
import tailwindcss from "@tailwindcss/vite";
import server from "./plugins/server.js";
import { loadEnv } from "vite";

export default defineConfig({
  entry: 'src/main.ts',
  integrations: [server()],
  views: ["src/views/**/*.{entry,page}.svelte"],
  vite: {
    server: { allowedHosts: true },
    plugins: [
      tailwindcss(),
      {
        name: "load-env",
        async config(c) {
          const env = loadEnv(c.mode, process.cwd(), "");

          for (const key in env) {
            process.env[key] = env[key];
          }

          return { define: { "process.env": env } };
        },
      },
    ],
  },
});
