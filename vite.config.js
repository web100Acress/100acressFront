import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';


export default defineConfig(() => {
  return {
    server:{
      port:3000,
      proxy:{
        '/api': {
          target: 'http://localhost:3500',
          changeOrigin: true,
          secure: false,
          // If you want to remove '/api' when forwarding the request, add:
          rewrite: (path) => path.replace(/^\/api/, ''),
          ws: true,
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        }
      }

    },
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