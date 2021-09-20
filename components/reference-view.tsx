import React, { useState, ChangeEvent, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import CommentList from './comment-list'
import CommentForm from './comment-form'
import UploadButton from './upload-button'
import styles from './reference-view.module.css'
import { v4 as uuidv4 } from 'uuid'
import { useReferences } from './reference-provider'
import ProfileCard from './profile-card'


export default function ReferenceView({ references, selectedReference, setSelectedReference }: any) {
  const [uploading, setUploading] = useState<boolean>(false)
  const [sourceFile, setSourceFile] = useState<string | null> (null)
  const [session, setSession] = useState(null)
  const LOCAL_STORAGE_KEY = 'supabase.auth.token'

  const {
    handleReferenceChange,
  } = useReferences()

  function handleChange(changes: object){
    const payload = {...selectedReference, ...changes}
    selectedReference && handleReferenceChange(payload)
    setSelectedReference(payload)
  }

  useEffect(() => {
    const session = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (session != null) (
      setSession(JSON.parse(session).currentSession)
    )
  }, [])

  const DEFAULT_SOURCE_FILES_BUCKET = 'avatars'

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      const user = supabase.auth.user()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName=`${session?.user.id}/${uuidv4()}.${fileExt}`
      const filePath = `${fileName}`

      let payload = {source_url: filePath}
      handleChange(payload) // TODO: move into useEffect hook

      let { error: uploadError } = await supabase.storage
        .from(DEFAULT_SOURCE_FILES_BUCKET)
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      let { error: updateError } = await supabase.from('profiles').upsert({
        id: user!.id,
        avatar_url: filePath,
      })

      if (updateError) {
        throw updateError
      }

      setSourceFile(null)
      setSourceFile(filePath)

    } catch (error) {
      alert(error.message)

    } finally {
      setUploading(false)

    }
  }

  return (
    <>
      {selectedReference && references.map(([k, v] : [any, any]) => {
        const id = k.substring(4)
        return (
          id === selectedReference.id &&
            <div className={styles.container} key={id}>
              <div className={styles.name}>{v.name}</div>
              <div className={styles.description}>{v.description}</div>
              {/* <div className={styles.buttonContainer}>
                <button className={`${styles.subReferenceButton} btn btn-secondary`}>+ Add sub-references</button>
              </div> */}
              <div className={styles.buttonContainer}>
                <button className={`${styles.subReferenceButton} btn btn-secondary`}>
                  <UploadButton
                    onUpload={uploadAvatar}
                    loading={uploading}
                  />
                </button>
              </div>
              <ProfileCard profile={selectedReference}/>
              <CommentList selectedReference={v}/>
              <CommentForm selectedReference={v}/>
            </div>
        )
      })}
    </>
  )
}
