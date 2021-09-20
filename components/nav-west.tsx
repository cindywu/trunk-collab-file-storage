import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './nav-west.module.css'
import { supabase } from '../lib/supabaseClient'

export default function NavWest() {
  const [session, setSession] = useState(null)

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    error ? console.log('Error logging out:', error.message) : alert('You have been signed out')
  }
  const LOCAL_STORAGE_KEY = 'supabase.auth.token'

  useEffect(() => {
    const session = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (session != null) (
      setSession(JSON.parse(session).currentSession)
    )
  }, [])

  let email

  if (session !== null) {
    const { user } = session
    email = user.email
  } else {
    email = 'guest'
  }


  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        {email}
      </div>
      <div className={styles.signOutContainer}>
        <Link href="/">
          <button
            onClick={() => signOut()}
            className={`${styles.signOutBtn} btn btn-primary`}
          >
            <a>Leave</a>
          </button>
        </Link>
      </div>
    </div>
  )
}
