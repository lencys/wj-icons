import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        minify: "terser", // Use 'terser' for minification
        chunkSizeWarningLimit: 500, // Warn if chunk size exceeds 500KB
        lib: {
            entry: "src/main.ts",
            name: "Icon",
            fileName: "icon",
        }
    },
    publicDir: "public",
    optimizeDeps: {
        exclude: ['wj-elements']
    }
});
