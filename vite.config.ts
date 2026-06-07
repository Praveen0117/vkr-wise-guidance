import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server", preset: "node-server" },
  },
  vite: {
    preview: {
      allowedHosts: ["vkr-wise-guidance-master.onrender.com",'vkrtaxtech.com'],
    },
  }
});
