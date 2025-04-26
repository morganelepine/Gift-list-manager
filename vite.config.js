import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
    envPrefix: "VITE_",
    build: {
        outDir: "public/build",
        manifest: true,
    },
    test: {
        environment: "jsdom", // pour simuler le navigateur
        globals: true, // pour éviter d'importer 'describe', 'it', etc
        setupFiles: "./tests/setupTests.jsx",
    },
});
