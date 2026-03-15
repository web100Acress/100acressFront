import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// Critical CSS plugin (simplified version)
function criticalCSSPlugin() {
  return {
    name: 'critical-css',
    generateBundle(options, bundle) {
      // Find CSS files
      const cssFiles = Object.entries(bundle).filter(([_, chunk]) => 
        chunk.type === 'asset' && chunk.fileName.endsWith('.css')
      );

      cssFiles.forEach(([fileName, chunk]) => {
        // Add a comment to separate critical and non-critical CSS
        // In production, use a proper CSS parser to extract critical CSS
        chunk.source = `/* Critical CSS - Above the fold */\n${chunk.source}`;
      });
    }
  };
}

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      allowedHosts: ['30eb0c089ea5.ngrok-free.app', '.ngrok-free.app'],
      fs: {
        // Restrict to project directory only - prevent OneDrive sync issues
        allow: ['.'],
        strict: true
      },
      proxy: {
        // In dev, route all '/api' requests to the backend
        '/api': {
          target: 'http://localhost:3500',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            // Only rewrite if it's not already the full URL
            if (!path.startsWith('http://')) {
              return path.replace(/^\/api/, '');
            }
            return path;
          }
        }
      }
    },
    preview:{port:4000},
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          // Manual chunks for better code splitting
          manualChunks: {
            // Vendor chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['antd', '@chakra-ui/react', '@emotion/react', '@emotion/styled', 'styled-components'],
            'icons': ['lucide-react', 'react-icons/fa', 'react-icons/fi', 'react-icons/md'],
            'utils': ['axios', '@tanstack/react-query', 'react-lazyload', 'dompurify'],
            'animations': ['framer-motion', 'animate.css'],
            'mdb': ['mdb-react-ui-kit'],
            'location': ['country-state-city'],
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
              // Split CSS into critical and non-critical
              if (assetInfo.name.includes('critical')) {
                return `css/critical-[name]-[hash].${ext}`;
              }
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
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        },
        mangle: {
          safari10: true,
        },
      },
      cssCodeSplit: true, // Enable CSS code splitting
      cssTarget: 'chrome80', // Target modern browsers for better CSS optimization
    },
    plugins: [
      react({
        include: /\.(mdx|js|jsx|ts|tsx)$/,
      }),
      criticalCSSPlugin(),
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
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
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
        'dompurify'
      ],
      exclude: [
        // Exclude large dependencies that should be lazy loaded
        'jodit-react',
        'framer-motion' // Exclude framer-motion to enable lazy loading
      ]
    },
    // Ensure proper handling of dynamic imports
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    }
  };
});