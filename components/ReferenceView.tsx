import React from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { useReferences } from './ReferenceProvider' 
import styles from '../styles/reference-view.module.css'

export default function ReferenceView() {
  const { selectedReference } = useReferences()
  return (
    <>
      {selectedReference &&
        <div className={styles.container}>
          <div className={styles.name}>{selectedReference.name}</div>
          <div className={styles.description}>{selectedReference.description}</div>
          <div className={styles.buttonContainer}>
            <button className={`${styles.subReferenceButton} btn btn-secondary`}>+ Add sub-references</button>
          </div>
          <CommentList />
          <CommentForm />
        </div>
      }
    </>
  )
}
