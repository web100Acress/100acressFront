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
          // manualChunks removed to let Vite handle chunking automatically
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
            return `js/[name]-[hash].js`;
          },
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/\.(css)$/.test(assetInfo.name)) {
              return `css/[name]-[hash].${ext}`;
            }
            if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
              return `images/[name]-[hash].${ext}`;
            }
            return `assets/[name]-[hash].${ext}`;
          }
        }
      },
      chunkSizeWarningLimit: 1000, // 1MB warning limit
      sourcemap: false, // Disable sourcemaps for production
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.log in production
          drop_debugger: true,
        },
      },
    },
    plugins: [
      react(),
      viteCompression({
        algorithm: 'brotliCompress',
        threshold: 10240, // >10KB files
        ext: '.br',
      }),
      viteCompression({
        algorithm: 'gzip',
        threshold: 10240, // >10KB files
        ext: '.gz',
      }),
    ],
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'styled-components',
        'axios',
        'antd',
        '@chakra-ui/react',
        '@emotion/react',
        '@emotion/styled',
        'lucide-react',
        'mdb-react-ui-kit',
        'country-state-city',
        '@tanstack/react-query',
        'react-lazyload',
        'animate.css'
      ],
      exclude: [
        // Exclude large dependencies that should be lazy loaded
        'jodit-react'
      ]
    },
  };
});