import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './nav-west.module.css'
import { supabase } from '../lib/supabaseClient'
import { Offline, Online } from 'react-detect-offline'
import { useReferences } from './reference-provider'

export default function NavWest() {
  const { session } = useReferences()
  const [email, setEmail] = useState('')

  useEffect(() => {
    (session !== null) ? setEmail(session.user.email) : setEmail('guest')
  }, [session])

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    error ? console.log('Error logging out:', error.message) : alert('You have been signed out')
  }

  return (
    <div className={styles.container}>
      <div className={styles.userInfoContainer}>
        {email}
      </div>
      <div className={styles.userInfoContainer}>
        <Online>You are online</Online>
        <Offline>You are offline</Offline>
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
