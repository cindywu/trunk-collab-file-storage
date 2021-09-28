import React, { useRef, useState, ChangeEvent } from 'react'
import styles from './reference-add.module.css'
import { useReferences } from './reference-provider'
import { v4 as uuidv4 } from 'uuid'
import UploadButton from './upload-button'

export default function ReferenceAdd({ rep }: any) {
  const {
    showReferenceAdd,
    handleReferenceAdd,
    handleShowReferenceAdd,
    session
  } = useReferences()

  const [uploading, setUploading] = useState(false)
  const [sourceUrl, setSourceUrl] = useState('')

  const nameRef = useRef<HTMLInputElement>(null)
  const parentRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLTextAreaElement>(null)
  const newRefId = uuidv4()

  function handleSaveReference(){
    const date = new Date()
    const myDate = (date.toLocaleString('default', { month: 'short'})) + " " + date.getUTCDate()

    const newReference = {
      id: newRefId,
      source_url: sourceUrl,
      name: nameRef.current ? nameRef.current.value : '',
      parent: parentRef.current ? parentRef.current.value : '',
      date: myDate,
      description: titleRef.current ? titleRef.current.value : '',
      labels: [
        {
          id: uuidv4(),
          name: 'label',
          color: '#DB615D'
        }
      ],
      comments: [
        {
          id: uuidv4(),
          user: 'cindy',
          content: 'why are we reading this?'
        }
      ],
    }
    handleReferenceAdd(newReference)
    // uploadAvatar(stuff, newFileID) // upload file to supabase
  }

  function idbOK() {
    return "indexedDB" in window
  }

  function handleUpload(event:ChangeEvent<HTMLInputElement>) {
    const stuff = event
    setUploading(true)

    if (!event.target.files || event.target.files.length == 0) {
      throw 'You must select an image to upload.'
    }

    let file = event.target.files[0]

    if (!idbOK()) return

    let openRequest = indexedDB.open('trunk_idb1', 1)

    openRequest.onupgradeneeded = function(event: any) {
      let thisDB = event.target.result

      if (!thisDB.objectStoreNames.contains('sources')) {
        thisDB.createObjectStore('sources', { keyPath: 'id' })
      }
    }

    openRequest.onsuccess = function(event: any) {
      let db = event.target.result
      let tx = db.transaction(['sources'], 'readwrite')
      let store = tx.objectStore('sources')

      let fileID = uuidv4()
      let refID = newRefId
      let newFileID = `${refID}/${fileID}`

      setSourceUrl(newFileID)

      let newFile = {
        id: newFileID,
        file: file,
      }

      let request = store.add(newFile)

      request.onerror = function(event: any) {
        console.log('error', event.target.error.name)
      }

      request.onsuccess = function(event: any) {

        setUploading(false)
      }
    }

    openRequest.onerror = function(event:any) {
      console.dir(event)
    }
  }

  return (
    <>
      {showReferenceAdd &&
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
          <div className={styles.title}>
            {/* New reference */}
          </div>
          <div className={styles.buttonContainer}>
            <button className="btn btn--secondary">Expand</button>
            <button
              className="btn btn--secondary"
              onClick={handleShowReferenceAdd}
            >&times;</button>
          </div>
        </div>
        <div className={styles.detailsGrid}>
          <input
            type="text"
            autoComplete="off"
            name="name"
            id={styles.name}
            className={styles.input}
            placeholder="name"
            ref={nameRef}
          />
          <input
            type="text"
            autoComplete="off"
            name="parent"
            id="parent"
            className={styles.input}
            placeholder="parent"
            ref={parentRef}
          />
          <textarea
            name="description"
            id="description"
            className={styles.input}
            placeholder="title"
            ref={titleRef}
          />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.left}>
            <button className="btn btn--secondary">
              <div className={styles.sourceFileContainer}>
                {sourceUrl &&
                  <div>
                    🗂 Source
                  </div>
                }
                <UploadButton
                  onUpload={handleUpload}
                  loading={uploading}
                  sourceUrl={sourceUrl}
                />
              </div>
            </button>
          </div>
          <div className={styles.right}>
            <button
              className="btn btn--primary"
              onClick={handleSaveReference}
            >
              Save Reference
            </button>
          </div>
        </div>
        </div>
      }
    </>
  )
}
