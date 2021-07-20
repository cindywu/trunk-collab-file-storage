import React from 'react'
import { ReferenceProvider } from '../components/reference-provider'
import '../styles/global.css'

interface Props {
  Component: React.ComponentClass
}

export default function App({ Component } : Props) {
  return (
    <ReferenceProvider>
      <Component />
    </ReferenceProvider>
  )
}