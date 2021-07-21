import React from 'react'
import Reference from './reference'
import styles from './reference-list.module.css'
import type { IReference } from '../interfaces'
import { useReferences } from './reference-provider'

export default function ReferenceList({ rep }: any ) {
  const { references } = useReferences()

  console.log('rep', rep)

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
