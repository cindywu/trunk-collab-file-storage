import React from 'react'
import Reference from './reference'
import styles from './reference-list.module.css'

export default function ReferenceList({ references, selectedReference }: any) {
  return (
    <div className={styles.container}>
      {references.map(([k, v] : any) => {
        return (
          <Reference
            key={k}
            value={v}
            id={k}
            selectedReference={selectedReference}
          />
        )
      })}
    </div>
  )
}
