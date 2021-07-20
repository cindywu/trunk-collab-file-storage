import React from 'react'
import Link from 'next/link'
import styles from './nav-west.module.css'

export default function NavWest() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Leave</a>
      </Link>
    </div>
  )
}
