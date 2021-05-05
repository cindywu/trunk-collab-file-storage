import '../styles/global.css'

interface Props {
  Component: any
  pageProps: any
}

function App({ Component, pageProps } : Props) {
  return <Component {...pageProps} />
}

export default App
