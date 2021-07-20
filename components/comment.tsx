import React from 'react'
import styles from './comment.module.css'

type Props = {
  user: string
  content: string
}

export default function Comment({ user, content} : Props) {
  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        <div className={styles.userAvatar}></div>
      </div>
      <div className={styles.comment}>
        <div className={styles.userInfo}>
          <span className={`${styles.user} mr-1`}>{user}</span>
          <span className={styles.date}>5 days ago</span>
        </div>
        <div className={styles.content}>
          {content}
        </div>
      </div>
    </div>
  )
}
