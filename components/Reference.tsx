import React, { useContext } from 'react'
import styles from '../styles/reference.module.css'
import LabelList from './LabelList'
import type { IReference } from '../interfaces'
import { useReferences } from './ReferenceProvider'

export default function Reference(props : IReference) {
  const {
    id,
    name,
    parent,
    description,
    date,
    labels,
  } = props

  const { handleReferenceArchive } = useReferences()

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.identifier}>{name}</span>
        <span className={styles.parent}>{` › `}</span>
        <span className={`${styles.parent} mr-1`}>{parent}</span>
        <span className={styles.title}>{description}</span>
      </div>
      <div>
        <span className={`${styles.labels} mr-1`}>
          <LabelList labels={labels} />
        </span>
        <span className={`${styles.createdAt} mr-1`}>{date}</span>
        <span className={styles.assignee}></span>
        <span onClick={() => handleReferenceArchive(id)}>Delete</span>
      </div>
    </div>
  )
}
