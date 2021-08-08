import React from 'react'
import styles from './reference-edit.module.css'
import type { ILabel } from '../interfaces'

type Props = {
  label: string
  handleLabelChange: (id: string, label: ILabel) => void
  handleLabelDelete: (id: string) => void
}

export default function ReferenceLabelEdit(props : Props) {
  const {
    label,
    handleLabelChange,
    handleLabelDelete
  } = props

  const obj = JSON.parse(label)

  function handleChange(changes: object) {
    handleLabelChange(obj.id, { ...obj, ...changes})
  }

  return (
    <>
      <input
        className={styles.input}
        type="text"
        autoComplete="none"
        onChange={(e) => handleChange({ name: e.target.value })}
        value={obj.name}
      />
      <input
        className={styles.input}
        type="text"
        autoComplete="none"
        onChange={(e) => handleChange({ color: e.target.value })}
        value={obj.color}
      />
      <button
        className="btn btn--danger btn--wide"
        onClick={() => handleLabelDelete(obj.id)}
      >
        &times;
      </button>
    </>
  )
}
