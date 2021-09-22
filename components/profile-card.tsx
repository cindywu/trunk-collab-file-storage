import React, { useEffect } from 'react'
import Avatar from './avatar'
import styles from './profile-card.module.css'

export default function ProfileCard({ profile }: { profile: any }) {
  useEffect(() => {
    console.log('hi')
  }, [profile])

  console.log('')

  return (
    <div className="profileCard">
      {/* <div className={styles.src}>
        {profile.src}
      </div> */}

      <Avatar url={profile.source_url} src={profile.src} size={100} />
      <div />
    </div>
  )
}
