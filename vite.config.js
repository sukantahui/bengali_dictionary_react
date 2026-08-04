import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({

    base: mode === "production"
        ? "/dictionary/"
        : "/",

    plugins: [
        react(),
        tailwindcss(),
    ],

    build: {
        chunkSizeWarningLimit: 1000,
    },

}));