import React from 'react';
import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '@/types';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { validateEnvironmentVariables } from '@/config/validate-environment-variables';
import { CartProvider } from '@/components/cart/lib/cart.context';
import { ModalProvider } from '@/components/modal-views/context';
import ModalsContainer from '@/components/modal-views/container';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import store from '@/store/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import CustomRouter from './_router';

// base css file
import '@/assets/css/scrollbar.css';
import '@/assets/css/swiper-carousel.css';
import '@/assets/css/globals.css';

let persistor = persistStore(store);

//validateEnvironmentVariables();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <CartProvider>
            <ModalProvider>
              <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
              >
                <>
                  <CustomRouter Component={Component} pageProps={pageProps} />
                  <ModalsContainer />
                  <Toaster containerClassName="!top-16 sm:!top-3.5 !bottom-16 sm:!bottom-3.5" />
                </>
              </AnimatePresence>
            </ModalProvider>
          </CartProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default CustomApp;
