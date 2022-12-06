import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header'
import { DietContextProvider } from '../contexts/Diet'
import { MealContextProvider } from '../contexts/Meal'
import { PersonContextProvider } from '../contexts/Person'
import { StepContextProvider } from '../contexts/Step'
import { defaultTheme } from '../styles/themes/default'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StepContextProvider>
        <PersonContextProvider>
          <DietContextProvider>
            <MealContextProvider>
              <div
                style={{
                  display: 'block',
                }}
              >
                <Header />
                <Component {...pageProps} />
              </div>
            </MealContextProvider>
          </DietContextProvider>
        </PersonContextProvider>
      </StepContextProvider>
    </ThemeProvider>
  )
}
