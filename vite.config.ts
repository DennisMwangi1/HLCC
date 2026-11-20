import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [react(), tailwindcss()],
    // The origin allowed for this site in Andishi: 5180 in the local studio, 5174 on staging
    // (npm run dev:staging, which reads .env.staging.local).
    server: { port: mode === "staging" ? 5174 : 5180, strictPort: true },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
}))
