import type { AppProps } from 'next/app'
import { DietContextProvider } from '../contexts/Diet'
import { PersonContextProvider } from '../contexts/Person'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PersonContextProvider>
      <DietContextProvider>
        <Component {...pageProps} />
      </DietContextProvider>
    </PersonContextProvider>
  )
}
