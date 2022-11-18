import type { AppProps } from 'next/app'
import { DietContextProvider } from '../contexts/Diet'
import { MealContextProvider } from '../contexts/Meal'
import { PersonContextProvider } from '../contexts/Person'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PersonContextProvider>
      <DietContextProvider>
        <MealContextProvider>
          <Component {...pageProps} />
        </MealContextProvider>
      </DietContextProvider>
    </PersonContextProvider>
  )
}
