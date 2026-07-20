import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Deployed to project repo `the-obsrvr/my-web-studio` with the custom domain
// `siddharth-bhargava.com` (see public/CNAME). Custom domains serve at the root,
// so base stays "/". If you ever remove the custom domain, change this to
// "/my-web-studio/" so assets resolve at https://the-obsrvr.github.io/my-web-studio/.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
