import type { AppProps } from 'next/app'
import { PersonContextProvider } from '../contexts/Person'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PersonContextProvider>
      <Component {...pageProps} />
    </PersonContextProvider>
  )
}
