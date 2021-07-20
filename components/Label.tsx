import React from 'react'
import styles from './label.module.css'
import type { ILabel } from '../interfaces'

export default function Label(props : ILabel) {
  const {
    name,
    color
  } = props

  const labelColor = {
    color: color
  }

  return (
    <span className={`${styles.container} mr-1`}>
      <span className={`${styles.color} mr-1`} style={labelColor}>●</span>
      <span className={styles.name}>{name}</span>
    </span>
  )
}
