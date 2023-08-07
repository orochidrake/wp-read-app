import "@/styles/globals.css";
import { AppContextProvider } from "@/context/AppContext";
import type { AppProps } from "next/app";

import { AppLayout } from "@/components/Layout";

export default function App({ Component, pageProps }:AppProps) {
  return (
    <AppContextProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppContextProvider>
  );
}
