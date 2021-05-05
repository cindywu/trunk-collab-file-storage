import React from 'react'
import styles from '../styles/layout.module.css'

interface LayoutProps {
  children: any
}

export default function Layout({ children } : LayoutProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
