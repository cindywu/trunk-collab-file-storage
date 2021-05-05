import React from 'react'
import styles from '../styles/reference-edit.module.css'
import type { ILabel } from '../interfaces'

type Props = {
  label: ILabel
  handleLabelChange: (id: string, label: ILabel) => void
  handleLabelDelete: (id: string) => void
}

export default function ReferenceLabelEdit(props : Props) {
  const {
    label,
    handleLabelChange,
    handleLabelDelete
  } = props

  function handleChange(changes: any) {
    handleLabelChange(label.id, { ...label, ...changes})
  }

  return (
    <>
      <input 
        className={styles.input}
        type="text"
        autoComplete="none"
        onChange={(e) => handleChange({ name: e.target.value })}
        value={label.name}
      />
      <input 
        className={styles.input}
        type="text"
        autoComplete="none"
        onChange={(e) => handleChange({ color: e.target.value })}
        value={label.color}
      />
      <button
        className="btn btn--danger btn--wide"
        onClick={() => handleLabelDelete(label.id)}
      >
        &times;
      </button>
    </>
  )
}
