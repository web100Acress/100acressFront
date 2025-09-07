import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { resolve } from 'path';

// Custom plugin to disable all preloading
const disablePreloadPlugin = () => {
  return {
    name: 'disable-preload',
    generateBundle(options, bundle) {
      // Remove preload links from generated HTML
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        if (chunk.type === 'chunk' && chunk.isEntry) {
          // Disable module preload for entry chunks
          chunk.modulePreload = false;
        }
      }
    },
    transformIndexHtml(html) {
      // Remove any preload links that might be added by other plugins
      return html.replace(/<link[^>]*rel=["'](?:preload|modulepreload)["'][^>]*>/gi, '');
    }
  };
};

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      allowedHosts: ['30eb0c089ea5.ngrok-free.app', '.ngrok-free.app'],
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
          manualChunks: (id) => {
            // Vendor chunks for better caching
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@chakra-ui') || id.includes('@emotion') || id.includes('antd')) {
              return 'ui-vendor';
            }
            if (id.includes('axios') || id.includes('styled-components') || id.includes('framer-motion')) {
              return 'utils-vendor';
            }
            if (id.includes('react-icons') || id.includes('lucide-react') || id.includes('@ant-design/icons')) {
              return 'icons-vendor';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs')) {
              return 'chart-vendor';
            }
            if (id.includes('jodit-react') || id.includes('react-quill')) {
              return 'editor-vendor';
            }
            
            // Split large components into separate chunks with more granular splitting
            if (id.includes('NewSellProperty')) {
              // Split NewSellProperty into smaller chunks based on functionality
              if (id.includes('Step') || id.includes('Form')) {
                return 'sell-property-forms';
              }
              return 'sell-property-core';
            }
            if (id.includes('ModernRecommendedSection')) {
              return 'recommendations';
            }
            if (id.includes('ProjectOrderManager')) {
              return 'project-manager';
            }
            if (id.includes('ShowPropertyDetails')) {
              return 'property-details';
            }
            if (id.includes('BlogWriteModal')) {
              return 'blog-editor';
            }
            
            // Split other large components
            if (id.includes('Home.jsx') || id.includes('Home/')) {
              return 'home-page';
            }
            if (id.includes('NewBanner')) {
              return 'banner-component';
            }
            
            // Group related pages
            if (id.includes('/Pages/') && (id.includes('Buy') || id.includes('Rent'))) {
              return 'property-pages';
            }
            if (id.includes('/AdminPage/')) {
              return 'admin-pages';
            }
            if (id.includes('/Components/Blog')) {
              return 'blog-components';
            }
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
      chunkSizeWarningLimit: 200, 
      sourcemap: false, 
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, 
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
          passes: 3,
          unsafe: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_methods: true,
          reduce_vars: true,
          reduce_funcs: true,
          collapse_vars: true,
          dead_code: true,
          unused: true,
        },
        mangle: {
          safari10: true,
          toplevel: true,
        },
        format: {
          comments: false,
        },
      },
      target: 'es2020',
      cssCodeSplit: true,
      assetsInlineLimit: 2048, 
      reportCompressedSize: false, 
      modulePreload: false
    },
    plugins: [
      react(),
      disablePreloadPlugin(),
      // Re-enable compression for better performance
      viteCompression({
        algorithm: 'brotliCompress',
        threshold: 1024,
        ext: '.br',
        deleteOriginFile: false,
        filter: /\.(js|mjs|json|css|html)$/i
      }),
      viteCompression({
        algorithm: 'gzip',
        threshold: 1024,
        ext: '.gz',
        deleteOriginFile: false,
        filter: /\.(js|mjs|json|css|html)$/i
      }),
    ],
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'styled-components',
        'axios',
        'aos' // Include AOS to fix ES module issues
      ],
      exclude: [
        // Exclude large dependencies that should be lazy loaded
        'jodit-react',
        'chart.js',
        'react-chartjs-2',
        'animate.css'
      ]
    },
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
    define: {
      __DEV__: process.env.NODE_ENV === 'development',
    },
  };
});