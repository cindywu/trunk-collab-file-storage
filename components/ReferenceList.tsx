import React, { useContext } from 'react'
import Reference from './Reference'
import styles from '../styles/reference-list.module.css'
import type { IReference } from '../interfaces'
import { useReferences } from './ReferenceProvider'

export default function ReferenceList() {
  const { references } = useReferences()

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
