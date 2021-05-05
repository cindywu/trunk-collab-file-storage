import React from 'react'
import styles from '../styles/navigation-topbar.module.css'
import { useReferences } from './ReferenceProvider'

export default function NavigationTopbar() {
  const { handleReferenceAdd } = useReferences()

  return (
    <div className={styles.container}>
      {/* <button 
        className='btn btn--secondary reference-list__go-back'
      >
        Go back
      </button> */}
      <button 
        className="btn btn--add-reference" 
        onClick={handleReferenceAdd}
      >+</button>
    </div>
  )
}
