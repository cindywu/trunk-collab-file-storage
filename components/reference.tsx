import React, { useContext } from 'react'
import styles from './reference.module.css'
import LabelList from './label-list'
import type { IReference } from '../interfaces'
import { useReferences } from './reference-provider'


interface ReferenceProps {
  value:  IReference
  id: string
}

export default function Reference(props : ReferenceProps ){
  const { handleSetSelectedReference } = useReferences()
  const reference : IReference = props.value

  const {
    handleReferenceSelect,
    handleReferenceExpandChange,
    selectedReference
  } = useReferences()

  function handleReferenceClick() {
    const payload = {
      id: props.id.substring(4),
      name: reference.name,
      parent: reference.parent,
      date: reference.date,
      description: reference.description,
      labels: reference.labels,
      comments: reference.comments
    }
    selectedReference && selectedReference.id === props.id.substring(4)
    ? handleReferenceExpandChange()
    // : handleReferenceSelect(reference.id)
    :
    handleSetSelectedReference(payload)
  }

  const emphasisStyle = {
    backgroundColor: 'hsl(210, 8%, 93%)'
  } as React.CSSProperties

  return (
    <div
      className={styles.container}
      onClick={() => handleReferenceClick()}
      style={(selectedReference && selectedReference.id === props.id.substring(4)) ? emphasisStyle : undefined }
    >
      <div>
        <span className={styles.identifier}>{reference.name}</span>
        <span className={styles.parent}>{` › `}</span>
        <span className={`${styles.parent} mr-1`}>{reference.parent}</span>
        <span className={styles.title}>{reference.description}</span>
      </div>
      <div>
        <span className={`${styles.labels} mr-1`}>
          <LabelList labels={reference.labels} />
        </span>
        <span className={`${styles.createdAt} mr-1`}>{reference.date}</span>
        <span className={styles.assignee}></span>
      </div>
    </div>
  )
}
