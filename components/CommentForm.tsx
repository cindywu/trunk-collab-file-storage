import React , { useRef } from 'react'
import styles from '../styles/comment-form.module.css'

export default function CommentForm() {
  const contentRef = useRef<HTMLTextAreaElement>(null)

  function handleCommentAdd() {
    console.log('hello')
  }

  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        <div className={styles.userAvatar}></div>
      </div>
      <div className={styles.comment}>
        <form 
          className={styles.form} 
        >
          <textarea
            className={styles.textArea}
            placeholder="What's on your mind..."
            ref={contentRef}
            required
          />
        </form>
        <div className={styles.submitButtonContainer}>
          <button 
            className={` ${styles.submitButton} btn btn--primary`}
            onClick={handleCommentAdd}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  )
}
