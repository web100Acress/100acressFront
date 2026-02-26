import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CountryProvider, ThemeProvider } from '../src/country/providers';
import '../src/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a202c" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      
      <ThemeProvider>
        <CountryProvider>
          <Component {...pageProps} />
        </CountryProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
