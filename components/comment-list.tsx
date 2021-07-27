import React from 'react'
import Comment from './comment'
import { IComment } from '../interfaces'
import { useReferences } from './reference-provider'
import styles from './comment-list.module.css'

export default function CommentList({selectedReference}: any) {
  // const { selectedReference } = useReferences()

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
