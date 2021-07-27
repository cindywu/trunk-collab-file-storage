import React, { useEffect, useState } from 'react'
import CommentList from './comment-list'
import CommentForm from './comment-form'
import { useReferences } from './reference-provider'
import styles from './reference-view.module.css'
import { useSubscribe } from 'replicache-react'

export default function ReferenceView({selectedReference, setSelectedReference}: any) {

  return (
    <>
      {selectedReference &&
        <div className={styles.container}>
          <div className={styles.name}>{selectedReference.name}</div>
          <div className={styles.description}>{selectedReference.description}</div>
          <div className={styles.buttonContainer}>
            <button className={`${styles.subReferenceButton} btn btn-secondary`}>+ Add sub-references</button>
          </div>
          {/* <CommentList selectedReference={selectedReference}/>
          <CommentForm selectedReference={selectedReference}/> */}
        </div>
      }
    </>
  )
}
