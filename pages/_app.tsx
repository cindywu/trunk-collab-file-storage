import '../styles/global.css'

interface MyAppProps {
  Component: any
  pageProps: any
}

function MyApp({ Component, pageProps } : MyAppProps) {

  return <Component {...pageProps} />
}

export default MyApp
