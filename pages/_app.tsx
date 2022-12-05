import type { AppProps } from 'next/app'
import { BottomMultiStep } from '../components/BottomMultiStep'
import { Header } from '../components/Header'
import { DietContextProvider } from '../contexts/Diet'
import { MealContextProvider } from '../contexts/Meal'
import { PersonContextProvider } from '../contexts/Person'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PersonContextProvider>
      <DietContextProvider>
        <MealContextProvider>
          <div
            style={{
              display: 'block',
              // alignItems: 'flex-start',
              // justifyContent: 'center',
            }}
          >
            <Header />
            <Component {...pageProps} />
            <BottomMultiStep step={5} />
          </div>
        </MealContextProvider>
      </DietContextProvider>
    </PersonContextProvider>
  )
}
