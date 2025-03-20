import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';


export default defineConfig(() => {
  return {
    server:{port:3000},
    preview:{port:4000},
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            antd: ['antd'],
            axios: ['axios'],
            chakraui: ['@chakra-ui/react', '@chakra-ui/icons'],
            emotion: ['@emotion/react', '@emotion/styled'],
            jodit: ['jodit-react'],
            lucidereact:['lucide-react'],
            mdbReactUiKit:['mdb-react-ui-kit'],
            countrycitystate:['country-state-city']
          }
        }
      }
    },
    plugins: [
      react(),
      viteCompression({
        algorithm: 'brotliCompress',
        threshold: 10240, // >10KB files
      }),
    ],
  };
});