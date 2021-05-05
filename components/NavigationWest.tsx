import React from 'react'
import Link from 'next/link'
import styles from '../styles/navigation-west.module.css'

export default function NavigationWest() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Leave</a>
      </Link>
    </div>
  )
}
