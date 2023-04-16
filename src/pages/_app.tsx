import { ThemeProvider } from '@/Contexts/theme-context'
import { UserProvider } from '@/Contexts/user-context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  )
}
