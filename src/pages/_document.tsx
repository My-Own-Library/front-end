import { ThemeProvider } from '@/Contexts/theme-context'
import UserContext, { UserProvider } from '@/Contexts/user-context'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}
