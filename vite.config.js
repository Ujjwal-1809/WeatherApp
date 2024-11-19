import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/WeatherApp/",
  server: {
    host: '0.0.0.0', // To listen on all IPs
    port: 3000
  },

  plugins: [react()],
})
