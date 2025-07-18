import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import elmstronaut from "elmstronaut";

const { NODE_TLS_REJECT_UNAUTHORIZED } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = NODE_TLS_REJECT_UNAUTHORIZED;
// https://astro.build/config
export default defineConfig({
  server: { port: 4322, host: true },
  prefetch: true,
  integrations: [elmstronaut()],
});
