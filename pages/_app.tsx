import '../styles/globals.css';
import type {AppProps} from 'next/app';
import {createTheme, NextUIProvider} from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {Nav} from '../components/navbar/navbar';

const lightTheme = createTheme({
   type: 'light',
   theme: {
      colors: {
         h1: "#000000",
      },
   },
});

const darkTheme = createTheme({
   type: 'dark',
   theme: {
      colors: {},
   },
});

function MyApp({Component, pageProps}: AppProps) {
   return (
      <NextThemesProvider
         defaultTheme="dark"
         attribute="class"
         value={{
            light: lightTheme.className,
            dark: darkTheme.className,
         }}
      >
         <NextUIProvider>
            <Nav />
            <Component {...pageProps} />
         </NextUIProvider>
      </NextThemesProvider>
   );
}

export default MyApp;
