import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={muiCache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

