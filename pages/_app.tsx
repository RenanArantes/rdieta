import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header/index'
import { Layout } from '../components/layouts/defaultLayout'
import { DietContextProvider } from '../contexts/Diet'
import { MealContextProvider } from '../contexts/Meal'
import { PersonContextProvider } from '../contexts/Person'
import { StepContextProvider } from '../contexts/Step'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StepContextProvider>
        <PersonContextProvider>
          <DietContextProvider>
            <MealContextProvider>
              <Layout>
                <Header />
                <Component {...pageProps} />
              </Layout>
              <GlobalStyle />
            </MealContextProvider>
          </DietContextProvider>
        </PersonContextProvider>
      </StepContextProvider>
    </ThemeProvider>
  )
}
