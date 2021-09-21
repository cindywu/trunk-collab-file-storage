import React, { useEffect } from 'react'
import Avatar from './avatar'

export default function ProfileCard({ profile }: { profile: any }) {
  useEffect(() => {
    console.log('hi')
  }, [profile])

  return (
    <div className="profileCard">
      <Avatar url={profile.source_url} size={100} />
      <div />
    </div>
  )
}
