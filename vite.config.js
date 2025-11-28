import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: { alias: {
      '@custom-components': '/src/custom-components',
      '@assets': '/src/assets',
    },
  },
})
// understand code created yesterday
// go ahead and create more code today for other menu items if needed


// End of vite.config.js
