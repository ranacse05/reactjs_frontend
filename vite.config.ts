import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Add these configurations for Parse SDK compatibility
  optimizeDeps: {
    include: [
      'parse',
      'parse/lib/browser/Parse.js',
      'parse/lib/browser/ParseObject.js',
      'parse/lib/browser/ParseQuery.js'
    ],
    exclude: [
      'parse/lib/browser/LiveQueryClient.js', // Prevent circular dependencies
      'parse/lib/browser/LiveQuerySubscription.js'
    ]
  },
  
  build: {
    commonjsOptions: {
      include: [/parse/, /node_modules/],
      transformMixedEsModules: true, // Crucial for Parse SDK
      esmExternals: true // Handle ESM and CJS混合
    },
    rollupOptions: {
      external: [], // Ensure Parse is bundled properly
      output: {
        manualChunks: {
          parse: ['parse'] // Keep Parse in separate chunk
        }
      }
    }
  },
  
  ssr: {
    noExternal: ['parse'] // Important for SSR compatibility
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      // Force browser version of Parse
      'parse/node': 'parse/lib/browser',
      'parse/lib/node': 'parse/lib/browser'
    }
  }
})