import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    // Port 5180 is the origin allowed for this site in the local Andishi studio.
    server: { port: 5180, strictPort: true },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})