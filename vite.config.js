import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://api.100acress.com',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    preview:{port:4000},
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          // Intelligent chunk splitting
          manualChunks: {
            // Vendor chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['antd', '@chakra-ui/react', '@emotion/react', '@emotion/styled'],
            'utils-vendor': ['axios', 'date-fns', 'country-state-city'],
            'editor-vendor': ['jodit-react'],
            'icons-vendor': ['lucide-react', 'react-icons', 'mdb-react-ui-kit'],
            'styled-vendor': ['styled-components'],
            'state-vendor': ['@reduxjs/toolkit', 'react-redux', '@tanstack/react-query'],
            'carousel-vendor': ['react-slick', 'slick-carousel', 'react-multi-carousel', '@trendyol-js/react-carousel'],
            'animation-vendor': ['aos', 'animate.css'],
            'form-vendor': ['react-dropzone', 'react-quill'],
            'chart-vendor': ['chart.js', 'react-chartjs-2'],
            
            // Route-based chunks
            'admin-pages': [
              './src/AdminPage/Addnew.jsx',
              './src/AdminPage/Dashboard.jsx',
              './src/AdminPage/Blog.jsx',
              './src/AdminPage/Projects.jsx'
            ],
            'city-pages': [
              './src/Pages/ProjectCities/DelhiProject.jsx',
              './src/Pages/ProjectCities/NoidaProject.jsx',
              './src/Pages/ProjectCities/Mumbai.jsx',
              './src/Pages/ProjectCities/Dubai.jsx'
            ],
            'builder-pages': [
              './src/Pages/BuilderPages/BuilderPage.jsx',
              './src/Pages/BuilderPages/LuxuryProjects.jsx'
            ]
          },
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
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
        },
        mangle: {
          safari10: true,
        },
      },
      // Enable tree shaking
      target: 'esnext',
      // Optimize dependencies
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    plugins: [
      react({
        // Optimize React refresh
        fastRefresh: true,
        // Enable JSX optimization
        jsxImportSource: '@emotion/react',
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        threshold: 10240, // >10KB files
        ext: '.br',
        deleteOriginFile: false,
      }),
      viteCompression({
        algorithm: 'gzip',
        threshold: 10240, // >10KB files
        ext: '.gz',
        deleteOriginFile: false,
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
        'animate.css',
        'aos',
        'date-fns'
      ],
      exclude: [
        // Exclude large dependencies that should be lazy loaded
        'jodit-react',
        'chart.js',
        'react-chartjs-2',
        'react-slick',
        'slick-carousel',
        'react-multi-carousel',
        '@trendyol-js/react-carousel'
      ],
      // Force pre-bundling of common dependencies
      force: true
    },
    // Enable CSS code splitting
    css: {
      devSourcemap: false,
    },
    // Optimize asset handling
    assetsInclude: ['**/*.webp', '**/*.avif'],
    // Enable HTTP/2 push hints
    server: {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    },
  };
});