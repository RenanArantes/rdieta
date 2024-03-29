import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header/index'
import { Layout } from '../components/layouts/defaultLayout'
import { DietContextProvider } from '../contexts/Diet'
import { MealContextProvider } from '../contexts/Meal'
import { PersonContextProvider } from '../contexts/Person'
import { StepContextProvider } from '../contexts/Step'
import { BasePage, GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'
import { Footer } from '../components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StepContextProvider>
        <PersonContextProvider>
          <DietContextProvider>
            <MealContextProvider>
              <Layout>
                <Header />
                <BasePage>
                  <Component {...pageProps} />
                </BasePage>
                <Footer />
              </Layout>
              <GlobalStyle />
            </MealContextProvider>
          </DietContextProvider>
        </PersonContextProvider>
      </StepContextProvider>
    </ThemeProvider>
  )
}
