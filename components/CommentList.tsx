import React from 'react'
import Comment from './Comment'
import { IComment } from '../interfaces'
import { useReferences } from './ReferenceProvider'
import styles from '../styles/comment-list.module.css'

export default function CommentList() {
  const { selectedReference } = useReferences()

  const { comments } = Object(selectedReference) 

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Discussion</div>
      {comments.map((comment: IComment) => {
        return (
          <Comment 
            key={comment.id}
            {...comment}
          />
        )
      })}
    </div>
  )
}
