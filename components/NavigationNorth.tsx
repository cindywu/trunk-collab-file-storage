import React from 'react'
import styles from '../styles/navigation-north.module.css'
import { useReferences } from './ReferenceProvider'

export default function NavigationNorth() {
  const {
    handleShowReferenceAdd,
    expandSelectedReference,
    handleReferenceExpandChange
  } = useReferences()

  function handleGoBack() {
    handleReferenceExpandChange()
  }

  return (
    <div className={styles.container}>
      {expandSelectedReference &&
        <button
          className='btn btn--secondary reference-list__go-back'
          onClick={handleGoBack}
        >
          Go back
        </button>
      }

      <button
        className="btn btn--add-reference"
        onClick={handleShowReferenceAdd}
      >+</button>
    </div>
  )
}
