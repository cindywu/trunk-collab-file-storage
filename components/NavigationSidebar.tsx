import React from 'react'
import Link from 'next/link'
import styles from '../styles/navigation-sidebar.module.css'

export default function NavigationSidebar() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Leave</a>
      </Link>
    </div>
  )
}
