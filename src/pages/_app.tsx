import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [logged, setIsLogged] = useState(false)

  useEffect(()=> {
    const log = localStorage.getItem('logged')
    if(log){
      console.log('aqui ->', log)
      setIsLogged(true)
    }
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      <Header isLogged={logged}/>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
