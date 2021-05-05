import React from 'react'
import styles from '../styles/reference-edit.module.css'
import { IComment } from '../interfaces'

interface ReferenceCommentEditProps {
  comment: IComment
  handleCommentChange: (id: string, comment: IComment) => void
  handleCommentDelete: (id: string) => void
}

export default function ReferenceCommentEdit(props : ReferenceCommentEditProps) {
  const {
    comment,
    handleCommentChange,
    handleCommentDelete
  } = props

  function handleChange(changes: any) {
    handleCommentChange(comment.id, { ...comment, ...changes})
  }

  return (
    <>
      <input 
        className={styles.input}
        type="text"
        autoComplete="none"
        onChange={(e) => handleChange({ name: e.target.value })}
        value={comment.user}
      />
      <input 
        className={styles.input}
        type="text"
        autoComplete="none"
        onChange={(e) => handleChange({ content: e.target.value })}
        value={comment.content}
      />
      <button
        className="btn btn--danger"
        onClick={() => handleCommentDelete(comment.id)}
      >
        &times;
      </button>
    </>
  )
}
