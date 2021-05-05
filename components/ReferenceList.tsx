import React, { useContext } from 'react'
import Reference from './Reference'
import styles from '../styles/reference-list.module.css'
import type { IReference } from '../interfaces'
import { ReferenceContext } from '../pages/workspace'

export default function ReferenceList() {
  const { references } = useContext(ReferenceContext)
  
  return (
    <div className={styles.container}>
      {references.map((reference: IReference) => {
        return (
          <Reference 
            key={reference.id} 
            {...reference}
          />
        )
      })}
    </div>
  )
}
